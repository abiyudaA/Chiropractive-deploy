import axios from "axios";
import baseUrl from "../api/baseUrl";
import { useEffect, useState } from "react";
import MedRecordTable from "../components/MedRecordTable";
import gifLoading from "../components/assets/Double Ring@1x-1.0s-200px-200px.svg"
import { useNavigate } from "react-router";

export default function MyMedRecordPage() {

    const [medRecords, setMedRecords] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()

     useEffect(() => {
        if (!localStorage.access_token) {
            Toastify({
                text: "Please login first",
                duration: 3000,
                destination: "https://github.com/apvarun/toastify-js",
                newWindow: true,
                close: true,
                gravity: "bottom", // `top` or `bottom`
                position: "left", // `left`, `center` or `right`
                stopOnFocus: true, // Prevents dismissing of toast on hover
                style: {
                    background: "red",
                },
                onClick: function () { } // Callback after click
            }).showToast();
            navigate('/login');
        }
    }, [navigate]);

    async function fetchMedRecords() {
        try {
            setLoading(true);
            const { data } = await axios.get(`${baseUrl}/myMedicalRecords`, {
                headers: {
                    Authorization: `Bearer ${localStorage.access_token}`
                }
            });
            // console.log(data);
            setMedRecords(data.myMedicalRecords);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchMedRecords();
    }, []);

    useEffect(() => {
        console.log(medRecords)
    });

    return (<>
        {loading ? (
            <>
                <div className="flex justify-center mt-28">
                    <img src={gifLoading} className="w-1/5" />
                </div>
            </>
        ) :
            (
                <>
                    <div className="bg-gray-100 min-h-screen p-8">
                        <div className="container mx-auto">
                            <h2 className="text-3xl font-bold text-gray-900 mb-6">My Treatment Records</h2>
                            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                                <table className="min-w-full">
                                    <thead className="bg-gray-200">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Reservation Date
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Treatment
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Diagnosis
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Notes
                                            </th>
                                        </tr>
                                    </thead>

                                    {medRecords.length < 1 && (

                                        <div className="text-start p-4">
                                            <h2 className="text-2xl font-bold text-gray-900 mb-6">No records found</h2>
                                        </div>
                                    )}

                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {medRecords.map(record => {
                                            return (
                                                <MedRecordTable key={record.id} record={record} />
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </>
            )}
    </>


    )
}
