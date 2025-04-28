import Button from "@/component/Button";
import { IHarga } from "@/interface/product";
import { parseNumbertoRupiah } from "@/utils/formatRupiah";
import React from "react";

const harga: IHarga[] = [
  { harga: 2000 },
  { harga: 5000 },
  { harga: 10000 },
  { harga: 20000 },
  { harga: 50000 },
];

interface Props {
  setHarga: React.Dispatch<React.SetStateAction<number>>;
  Totalharga: number;
}
const HargaView: React.FC<Props> = ({ ...props }) => {
  const handleAddHarga = (item: number) => {
    props.setHarga((prevHarga) => prevHarga + item);
  };
  return (
    <div className="px-4 md:px-8 flex flex-col md:flex-row justify-between gap-10">
      <div className="flex-1">
        <p className="font-semibold">Harga</p>
        <div className="flex flex-wrap justify-start gap-4 mt-5 mb-5">
          {harga.map((item: IHarga, index: number) => {
            return (
              <div key={index} className="w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5">
                <Button
                  onClick={() => handleAddHarga(item.harga)}
                  classname="bg-gray-500 w-full px-8 py-3 hover:bg-gray-400"
                  type="submit"
                >
                  {parseNumbertoRupiah(item.harga)}
                </Button>
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex-1 mt-8 md:mt-0">
        <p className="font-semibold">Sisa Uang Anda</p>
        <p className="mt-10">{parseNumbertoRupiah(props.Totalharga)}</p>
      </div>
    </div>
  );
};

export default HargaView;
