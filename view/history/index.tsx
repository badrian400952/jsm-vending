import { IPorduct } from "@/interface/product";
import { parseNumbertoRupiah } from "@/utils/formatRupiah";
import Hooks from "./hooks";

const History = () => {
  const { data } = Hooks();

  return (
    <>
      <div className="m-10 flex flex-wrap justify-start gap-4">
        {data.dataHostory.map((item: IPorduct) => {
          return (
            <div
              key={item.id}
              className="w-[300px] bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700"
            >
              <img
                className="p-8 rounded-t-lg w-full h-[350px] object-cover"
                src={item.image}
                alt="product image"
              />
              <div className="px-5 pb-5">
                <a href="#">
                  <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                    {item.name}
                  </h5>
                </a>
                <div className="flex items-end justify-between mt-2">
                  <span className="text-2xl font-bold text-gray-900 dark:text-white">
                    {parseNumbertoRupiah(item.price)}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default History;
