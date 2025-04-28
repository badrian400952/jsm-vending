import Modal from "@/component/Modal";
import { IPorduct } from "@/interface/product";
import { useState } from "react";
import { IoCart } from "react-icons/io5";
import HargaView from "./harga";
import Hooks from "./hooks";
import ModalPrice from "./modalPrice";
import ProdukView from "./produk";

const Produk = () => {
  const { data, method } = Hooks();
  const [harga, setHarga] = useState<number>(0);
  const [productPrice, setProductPrice] = useState<IPorduct[]>([]);
  const [icart, setIcart] = useState<boolean>(false);

  return (
    <>
      <div className="w-[90%] mx-auto  flex flex-wrap justify-center gap-4">
        {data.data.map((item: IPorduct) => {
          return (
            <ProdukView
              key={item.id}
              item={item}
              harga={harga}
              setHarga={setHarga}
              productPrice={productPrice}
              setProductPrice={setProductPrice}
            />
          );
        })}
      </div>
      <div className="m-10 flex justify-end px-5  ">
        <p className="text-red-500 -mr-12 z-10 mt-8">{productPrice.length}</p>
        <IoCart
          size={50}
          className="bg-gray-100 p-2 rounded-3xl"
          onClick={() => setIcart(true)}
        />
      </div>
      <hr className="m-10 text-gray-200" />

      <HargaView setHarga={setHarga} Totalharga={harga} />

      <Modal open={icart}>
        <ModalPrice
          setHarga={setHarga}
          setIcart={setIcart}
          productPrice={productPrice}
          setProductPrice={setProductPrice}
          handleSimpanHarga={method.handleSimpanHarga}
        />
      </Modal>
    </>
  );
};

export default Produk;
