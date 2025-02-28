import { useEffect, useState } from "react";


export default function MedRecordTable({ record }) {

    const [time, setTime] = useState("");
    // const [refresh, setRefresh] = useState(false);


    function formatedTime(timestamp) {
        const date = new Date(timestamp);

        // Extract day, month, year, hours, and minutes
        const day = String(date.getUTCDate()).padStart(2, "0"); // Ensure 2 digits
        const month = String(date.getUTCMonth() + 1).padStart(2, "0"); // Months are 0-indexed
        const year = date.getUTCFullYear();
        const hours = String(date.getUTCHours()).padStart(2, "0");
        const minutes = String(date.getUTCMinutes()).padStart(2, "0");

        // Format as "DD-MM-YYYY, HH:MM"
        setTime(`${day}-${month}-${year}, ${hours}:${minutes}`);
    }

    useEffect(() => {
        formatedTime(record.Reservation.time)
    }, [])


    return (
        <tr key={record.id}>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {time}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {record.Reservation.Service.serviceName}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {record.diagnosis}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {record.notes}
            </td>
        </tr>
    );
}