import Button from "@/component/Button";
import Input from "@/component/input";
import { IPorduct } from "@/interface/product";
import React from "react";
import { useForm } from "react-hook-form";

interface Props {
  handleTambahProduk: (data: IPorduct) => void;
  setOpenModal: (data: boolean) => void;
}

const FormTambah: React.FC<Props> = ({ handleTambahProduk, setOpenModal }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IPorduct>({
    defaultValues: {
      name: "",
      price: 0,
      stock: 0,
      image: "",
    },
  });

  const onSubmit = async (data: IPorduct) => {
    await handleTambahProduk(data);
    reset();
    setOpenModal(false);
  };

  return (
    <div>
      <section className="bg-white dark:bg-gray-900">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="py-8 px-4 mx-auto max-w-2xl lg:py-16"
        >
          <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
            Tambah Produk
          </h2>

          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
            <div className="sm:col-span-2">
              <Input
                label="Nama Produk"
                type="text"
                {...register("name", { required: "Nama produk wajib diisi" })}
                error={errors.name?.message}
                placeholder="Nama Produk"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div className="sm:col-span-2 md:col-span-1">
              <Input
                label="Price"
                type="number"
                placeholder="Price"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                error={errors.price?.message}
                {...register("price", {
                  required: "Harga wajib diisi",
                  min: { value: 1, message: "Harga minimal 1" },
                })}
              />
              {errors.price && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.price.message}
                </p>
              )}
            </div>

            <div className="flex sm:col-span-2 justify-between gap-4">
              <div className="w-full sm:w-1/2">
                <Input
                  label="Stock"
                  type="number"
                  {...register("stock", {
                    required: "Stock wajib diisi",
                    min: { value: 0, message: "Stock tidak boleh minus" },
                  })}
                  error={errors.stock?.message}
                  placeholder="Stock"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                />
                {errors.stock && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.stock.message}
                  </p>
                )}
              </div>

              <div className="w-full sm:w-1/2">
                <Input
                  label="Link Image"
                  type="text"
                  placeholder="Link Image"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  error={errors.image?.message}
                  {...register("image", {
                    required: "Link gambar wajib diisi",
                    pattern: {
                      value: /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i,
                      message:
                        "Masukkan link URL yang valid Contoh: https://xxx.jpg",
                    },
                  })}
                />
                {errors.image && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.image.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-5 m-auto">
            <Button
              type="button"
              classname="px-5 bg-red-500 text-white my-6"
              onClick={() => {
                setOpenModal(false);
              }}
            >
              Batal
            </Button>
            <Button type="submit" classname="bg-blue-500 text-white my-6">
              Add product
            </Button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default FormTambah;
