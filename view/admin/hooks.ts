import { notifSucces, notifWarning } from '@/component/Alert';
import { IPorduct } from '@/interface/product';
import { api } from '@/network/api';
import { generateRandomId } from '@/utils/idRandom';
import { useEffect, useState } from 'react';

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
    useEffect(() => {
        handleFetch()
    }, [])


    const handleTambahProduk = async (data: IPorduct) => {
        const payload = {
            id: generateRandomId(),
            name: data.name,
            price: data.price,
            stock: data.stock,
            image: data.image,
        }
        try {
            await api.post(`/foods`, payload)
            notifSucces("Berhasil Tambah Data")
            handleFetch()
        } catch (error) {
            notifWarning(error as string)
        }
    }

    const handleDelete = async (id: string | number) => {
        try {
            await api.delete(`/foods/${id}`)
            notifSucces("berhasil Menghapus Data")
            handleFetch()
        } catch (error) {
            notifWarning(error as string)
        }
    }

    return {
        data: { data },
        method: {
            handleTambahProduk,
            handleDelete
        }
    }
}

export default Hooks