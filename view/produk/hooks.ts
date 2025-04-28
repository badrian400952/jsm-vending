import { notifSucces } from "@/component/Alert";
import { IPorduct } from "@/interface/product";
import { api } from "@/network/api";
import { useEffect, useState } from "react";

const Hooks = () => {
    const [data, setData] = useState<IPorduct[]>([]);

    const handleFetch = async () => {
        try {
            const response = await api.get(`/foods`);
            const jsonData = await response.data;
            setData(jsonData);
        } catch (error) {
            console.log(error);
        }
    };

    const handleSimpanHarga = async (productPrice: IPorduct[]) => {
        console.log(productPrice, "productPrice");
        try {
            const countMap: { [key: string]: number } = {};

            for (const product of productPrice) {
                if (countMap[product.id]) {
                    countMap[product.id] += 1;
                } else {
                    countMap[product.id] = 1;
                }
            }

            for (const product of productPrice) {
                const originalProduct = data.find(item => item.id === product.id);
                if (!originalProduct) continue;

                const qtyToReduce = countMap[product.id] > 1 ? countMap[product.id] : 1;

                if (countMap[product.id] !== 0) {
                    const newStock = originalProduct.stock - qtyToReduce;

                    await api.patch(`/foods/${product.id}`, {
                        stock: newStock
                    });

                    countMap[product.id] = 0;
                }
            }

            await api.post(`/cart`, productPrice);
            handleFetch();
            notifSucces("Simpan Harga dan Update Stok Berhasil");
        } catch (error) {
            console.log(error);
        }
    };



    useEffect(() => {
        handleFetch();
    }, [])
    return {
        data: { data },
        method: { handleSimpanHarga }
    }
}

export default Hooks
