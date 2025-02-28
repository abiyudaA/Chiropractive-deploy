import axios from "axios";
import { useEffect, useState } from "react";
import baseUrl from "../api/baseUrl";


export default function ReservationTable({ reservation, refresh }) {

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
        formatedTime(reservation.time)
    }, [])



    async function handlePayButtonClick() {
        try {
            const snapToken = await axios.post(`${baseUrl}/payments`, { ReservationId: reservation.id }, {
                headers: {
                    Authorization: `Bearer ${localStorage.access_token}`
                }
            });
            // console.log(snapToken, 'snap')
            const token = snapToken.data.transactionToken;
            
            const orderId = snapToken.data.orderId;
            window.snap.pay(token, {
                onSuccess: async function () {
                    try {
                        
                        const response = await axios.patch(`${baseUrl}/midtrans-notifications`, { orderId }, {
                            headers: {
                                Authorization: `Bearer ${localStorage.access_token}`
                            }
                        })
    
                        Toastify({
                            text: response.data.message,
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

                        refresh()
                        
                    } catch (err) {
                        console.log(err)
                    }
                    
                },
                onPending: function () {
                    Toastify({
                        text: "Waiting payment!",
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
                },
                onError: function () {
                    Toastify({
                        text: "payment failed!",
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
                },
                onClose: function () {
                    Toastify({
                        text: "cancelpayment?",
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
                }
            })
        } catch (err) {
            console.log(err)
        }
    }

    // = () => {
    //     if (window.snap) {
    //       window.snap.embed(reservation.snapToken, { // Assuming reservation has snapToken
    //         embedId: "snap-container",
    //       });
    //     } else {
    //       console.error("Midtrans Snap script not loaded.");
    //     }
    //   };

    return (
        <tr key={reservation.id}>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {reservation.Service.serviceName}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {reservation.complaint}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                <img src={reservation.imgUrl} alt="" />
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {time}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {reservation.paymentStatus}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                <button
                    className={`px-4 py-2 rounded ${reservation.paymentStatus === "Paid"
                        ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                        : "bg-blue-500 text-white hover:bg-blue-600"
                        }`}
                    disabled={reservation.paymentStatus === "Paid"}
                    onClick={handlePayButtonClick} // Added onClick event
                >
                    {reservation.paymentStatus === "Paid" ? "Paid" : "Pay"}
                </button>
            </td>
        </tr>
    );
}