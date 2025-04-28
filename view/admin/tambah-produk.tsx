import React, { useState } from "react";
import DataTable from "./DataTable";
import Hooks from "./hooks";
import Modal from "@/component/Modal";
import FormTambah from "./form";

const TambahProdukView = () => {
  const { data, method } = Hooks();
  const [openModal, setOpenModal] = useState(false);
  return (
    <div className="w-[80%] m-auto mt-10">
      <DataTable
        dataT={data.data}
        setOpenModal={setOpenModal}
        handleDelete={method.handleDelete}
      />

      <Modal open={openModal}>
        <FormTambah
          setOpenModal={setOpenModal}
          handleTambahProduk={method.handleTambahProduk}
        />
      </Modal>
    </div>
  );
};

export default TambahProdukView;
