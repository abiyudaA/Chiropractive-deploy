import { useEffect, useState } from "react";
import axios from "axios";
import baseUrl from "../api/baseUrl";
import ReservationTable from "../components/ReservationTable";
import { useNavigate } from "react-router";


export default function MyReservationPage() {
    const [reservations, setReservations] = useState([]);
    const navigate = useNavigate();


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

    async function fetchReservations() {
        try {
            const { data } = await axios.get(`${baseUrl}/myReservations`, {
                headers: {
                    Authorization: `Bearer ${localStorage.access_token}`
                }
            });
            // console.log(data);
            setReservations(data.myReservations);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        fetchReservations();
    }, []);

    return (
        <div className="bg-gray-100 min-h-screen p-8">
            <div className="container mx-auto">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">My Reservations</h2>
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <table className="min-w-full">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Treatment
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Complaint
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Injury
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Time
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Payment Status
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Action
                                </th>
                            </tr>
                        </thead>

                        {reservations.length < 1 && (

                            <div className="text-start p-4">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">No reservation found</h2>
                            </div>
                        )}

                        <tbody className="bg-white divide-y divide-gray-200">
                            {reservations.map(reservation => {
                                return (
                                    <ReservationTable key={reservation.id} reservation={reservation} refresh={fetchReservations} />
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}