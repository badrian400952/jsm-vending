import Button from "@/component/Button";
import { IPorduct } from "@/interface/product";
import { parseNumbertoRupiah } from "@/utils/formatRupiah";
import React, { useState } from "react";
import { FaTrash } from "react-icons/fa";
import { TbDatabaseOff } from "react-icons/tb";

interface Props {
  productPrice: IPorduct[];
  setIcart: React.Dispatch<React.SetStateAction<boolean>>;
  setProductPrice: React.Dispatch<React.SetStateAction<IPorduct[]>>;
  handleSimpanHarga: (productPrice: IPorduct[]) => Promise<void>;
  setHarga: React.Dispatch<React.SetStateAction<number>>;
}

const ModalPrice: React.FC<Props> = ({
  productPrice,
  setIcart,
  setProductPrice,
  setHarga,
  handleSimpanHarga,
}) => {
  const [batal, setBatal] = useState(0);

  const handleSimpanan = () => {
    setHarga((prev) => prev + batal);
    handleSimpanHarga(productPrice);
    setProductPrice([]);
  };

  return (
    <>
      {productPrice.length > 0 ? (
        <div className="m-10 flex flex-wrap justify-center gap-6">
          {productPrice
            .filter(
              (it, index, arr) => index === arr.findIndex((t) => t.id === it.id)
            )
            .map((item) => {
              const qty = productPrice.filter(
                (prod) => prod.id === item.id
              ).length;
              return (
                <div
                  key={item.id}
                  className="w-full sm:w-[150px] md:w-[220px] lg:w-[240px] h-[300px] sm:h-[340px] md:h-[360px] bg-white border border-gray-200 shadow-sm rounded-lg flex flex-col overflow-hidden"
                >
                  <div className="flex-1 flex items-center justify-center p-4 bg-gray-50">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="max-h-32 sm:max-h-36 object-contain"
                    />
                  </div>

                  <div className="flex flex-col justify-between p-4 h-[160px]">
                    <h5 className="text-sm font-semibold tracking-tight text-gray-900 mb-2 text-center line-clamp-2">
                      {item.name}
                    </h5>

                    <div className="flex items-center justify-between mt-auto">
                      <div>
                        <span className="text-sm font-bold text-gray-900">
                          {parseNumbertoRupiah(item.price)}
                        </span>
                        <p className="text-sm text-gray-500 text-start">
                          Total: <span className="text-red-500">{qty}</span>
                        </p>
                      </div>
                      <Button
                        onClick={() => {
                          setBatal((prev) => prev + item.price);
                          setProductPrice((prev) => {
                            const qty = prev.filter(
                              (p) => p.id === item.id
                            ).length;
                            if (qty > 1) {
                              let deleted = false;
                              return prev.filter((p) => {
                                if (p.id === item.id && !deleted) {
                                  deleted = true;
                                  return false;
                                }
                                return true;
                              });
                            } else {
                              return prev.filter((p) => p.id !== item.id);
                            }
                          });
                        }}
                        type="button"
                        classname="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-xs px-3 py-1"
                      >
                        <FaTrash className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      ) : (
        <div className="flex justify-center m-auto">
          <h1 className="text-2xl my-10 flex flex-col justify-center font-bold text-gray-900 mt-10">
            <TbDatabaseOff size={40} className="text-gray-400 m-auto" />
            <p className="mt-5">Tidak ada Data</p>
          </h1>
        </div>
      )}
      <div className="flex justify-center m-auto gap-5">
        <Button
          onClick={() => setIcart(false)}
          type="button"
          classname="bg-red-500 text-white hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-xs px-3 py-1"
        >
          Close
        </Button>
        <Button
          onClick={() => {
            setIcart(false);
            handleSimpanan();
          }}
          type="button"
          classname="bg-emerald-500 text-white hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-xs px-3 py-1"
        >
          Simpan
        </Button>
      </div>
    </>
  );
};

export default ModalPrice;
