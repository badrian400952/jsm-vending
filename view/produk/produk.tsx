import React from "react";

import Button from "@/component/Button";
import { IPorduct } from "@/interface/product";
import { parseNumbertoRupiah } from "@/utils/formatRupiah";
import { notifWarning } from "@/component/Alert";

interface Props {
  item: IPorduct;
  harga: number;
  setHarga: React.Dispatch<React.SetStateAction<number>>;
  setProductPrice: React.Dispatch<React.SetStateAction<IPorduct[]>>;
  productPrice: IPorduct[];
}

const ProdukView: React.FC<Props> = ({
  item,
  harga,
  setHarga,
  setProductPrice,
  productPrice,
}) => {
  const getSelectedCount = (productId: number) => {
    return productPrice.filter((product) => product.id === productId).length;
  };

  const tambahCart = (item: IPorduct) => {
    const selectedCount = getSelectedCount(Number(item.id));

    if (selectedCount >= item.stock) {
      notifWarning("Stok produk ini sudah habis, tidak bisa menambah lagi!");
      return;
    }

    if (harga === 0) {
      notifWarning("Harga item ini adalah 0, tambahkan saldo terlebih dahulu!");
      return;
    }
    if (harga < item.price) {
      notifWarning("Total harga tidak mencukupi untuk membeli item ini!");
      return;
    }

    setHarga((prevHarga) => prevHarga - item.price);
    setProductPrice((prev) => [...prev, item]);
  };

  const selectedCount = getSelectedCount(Number(item.id));

  return (
    <div
      key={item.id}
      className="  w-[270px] h-[500px] bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700"
    >
      <img
        className="p-8 rounded-t-lg w-full h-[350px] object-cover"
        src={item.image}
        alt="product image"
      />
      <div className="px-5 pb-5">
        <div>
          <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
            {item.name}
          </h5>
          <p className="text-lg font-semibold tracking-tight text-gray-900 dark:text-white">
            stok {item.stock}
          </p>
        </div>
        <div className="flex items-end justify-between mt-2">
          <span className="text-2xl font-bold text-gray-900 dark:text-white">
            {parseNumbertoRupiah(item.price)}
          </span>
          <Button
            disabled={item.stock === 0 || selectedCount >= item.stock}
            onClick={() => tambahCart(item)}
            type="submit"
            classname={`text-white ${
              item.stock === 0 || selectedCount >= item.stock
                ? "bg-gray-500"
                : "bg-blue-700"
            } hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300`}
          >
            {item.stock === 0 || selectedCount >= item.stock
              ? "habis"
              : "Add to cart"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProdukView;
