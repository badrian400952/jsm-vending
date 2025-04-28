import { IPorduct } from "@/interface/product";
import { api } from "@/network/api";
import { useEffect, useState } from "react";

const Hooks = () => {
    const [dataHostory, setDataHistory] = useState<IPorduct[]>([]);

    const handleFetch = async () => {
        try {
            const response = await api.get(`/cart`);
            const jsonData = response.data;
            const mergedData: IPorduct[] = jsonData.flatMap((item: any) => {
                return Object.keys(item)
                    .filter(key => key !== 'id')
                    .map(key => item[key]);
            });

            setDataHistory(mergedData);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        handleFetch();
    }, [])
    return {
        data: { dataHostory },
        method: {}
    }
}

export default Hooks
