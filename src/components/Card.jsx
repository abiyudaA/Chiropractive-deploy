import { useEffect, useState } from "react";


export default function Card({ service }) {
    const [rupiah, setRupiah] = useState("");

    function convertToRupiah() {
        
        const formated = service.price.toLocaleString("id-ID", { style: "currency", currency: "IDR" });
        setRupiah(formated)
        
    }

    useEffect(() => {
        convertToRupiah()
    }, [])


    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden max-w-lg mx-2">
        <img
            src={service.imgUrl}
            alt={service.serviceName}
            className="w-full h-56 object-cover"
        />
        <div className="p-6">
            <h3 className="text-2xl font-semibold mb-3">{service.serviceName}</h3>
            <p className="text-gray-700 text-lg">{rupiah}</p>
        </div>
    </div>
    );
}