import Button from "@/component/Button";
import { IPorduct } from "@/interface/product";
import { parseNumbertoRupiah } from "@/utils/formatRupiah";
import React from "react";
import { FaTrash } from "react-icons/fa";

interface Props {
  dataT: IPorduct[];
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  handleDelete: (data: number | string) => void;
}

const DataTable: React.FC<Props> = ({ ...props }) => {
  return (
    <div className="relative overflow-x-auto">
      <Button
        classname="bg-blue-500 text-white my-6"
        onClick={() => props.setOpenModal(true)}
      >
        Tambah Produk
      </Button>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {["name", "price", "stock", "aksi"].map((items, i) => (
              <th key={i} scope="col" className="px-6 py-3">
                {items}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {props.dataT.map((items) => (
            <tr
              key={items.id}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200"
            >
              <td className="px-6 py-4">{items.name}</td>
              <td className="px-6 py-4">{parseNumbertoRupiah(items.price)}</td>
              <td className="px-6 py-4">{items.stock}</td>
              <td className="px-6 py-4">
                <FaTrash
                  className="text-red-500 hover:cursor-pointer"
                  size={20}
                  onClick={() => props.handleDelete(items.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
