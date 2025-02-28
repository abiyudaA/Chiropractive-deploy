import axios from "axios";
import { useEffect, useState } from "react";
import baseUrl from "../api/baseUrl";
import Card from "../components/Card";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { fetchCredential } from "../features/credential/credential-slicer";


export default function HomePage() {
    const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
    const [services, setServices] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { credential, error, loading } = useSelector((state) => state.credential);
    const [form, setForm] = useState({
        ServiceId: 0,
        complaint: "",
        time: "",
    });


    async function fetchServices() {
        try {
            const { data } = await axios.get(`${baseUrl}/services`);
            // console.log(data);
            setServices(data.services);
        } catch (err) {
            console.log(err);
        }
    }

    const fetchPatient = () => {
        dispatch(fetchCredential());
    }

    useEffect(() => {
        fetchServices();
        fetchPatient()
    }, []);

    useEffect(() => {
        if (error) {
            console.log(error)
        }
    }, [error])

    // useEffect(() => {
    //     console.log(credential)
    //     console.log(baseUrl)
    // })

    const handleReservationClick = () => {

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
        setIsModalOpen(true); // Open the modal
    };

    const handleCloseModal = () => {
        setIsModalOpen(false); // Close the modal
    };

    // useEffect(() => {
    //     console.log(form);

    // })

    async function handleSubmitReservation(e, form) {
        e.preventDefault();
        try {

            const images = e.target[2].files[0]
            // console.log(form)
            const formData = new FormData()
            formData.append('image', images);
            formData.append('complaint', form.complaint);
            formData.append('ServiceId', form.ServiceId);
            formData.append('time', form.time);

            const { data } = await axios.post(`${baseUrl}/reservations`, formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.access_token}`,
                    'Content-Type': 'multipart/form-data'
                }
            })

            Toastify({
                text: data.message,
                duration: 3000,
                destination: "https://github.com/apvarun/toastify-js",
                newWindow: true,
                close: true,
                gravity: "bottom", // `top` or `bottom`
                position: "left", // `left`, `center` or `right`
                stopOnFocus: true, // Prevents dismissing of toast on hover
                style: {
                    background: "linear-gradient(to right,rgb(99, 100, 100),rgb(0, 0, 0))",
                },
                onClick: function () { } // Callback after click
            }).showToast();

        } catch (err) {
            console.log(err)
        } finally {
            setIsModalOpen(false); // Close the modal after submission

        }
        // Handle form submission here
        // console.log("Reservation submitted!");
    };

    return (
        <div>
          <div className="bg-gray-100 min-h-screen p-8">
            <div className="container mx-auto text-center">
      
              {!error && credential ? <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Welcome to <span className="text-blue-500">Chiropractive</span> , {credential.patientName} !
              </h2> : <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Welcome to <span className="text-blue-500">Chiropractive</span>
              </h2>}
      
              <p className="text-lg text-gray-700 mb-8">
                Revolutionizing bone health with cutting-edge technology and expert care.
              </p>
              <div className="flex flex-wrap justify-center gap-4"> {/* Tambahkan justify-center */}
      
                {services.map(service => {
                  return (
                    <Card key={service.id} service={service} />
                  )
                })}
      
              </div>
      
              <button
                onClick={handleReservationClick}
                className="bg-blue-500 text-white px-6 py-3 rounded-lg mt-8 hover:bg-blue-600"
              >
                Make Reservation
              </button>
      
              {/* Reservation Modal */}
              {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                  <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">Make Reservation</h3>
      
                    <form encType="multipart/form-data" onSubmit={(e) => handleSubmitReservation(e, form)}>
                      <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="ServiceId">
                          Service
                        </label>
                        <select
                          id="ServiceId"
                          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          value={form.ServiceId}
                          onChange={(e) => setForm({ ...form, ServiceId: e.target.value })}
                          required
                        >
                          <option value="">Select a service</option>
                          {services.map(service => {
                            return (
                              <option key={service.id} value={service.id}>{service.serviceName}</option>
                            )
                          }
                          )}
                        </select>
                      </div>
                      <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="complaint">
                          complaint
                        </label>
                        <textarea
                          id="complaint"
                          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Describe your complaint"
                          value={form.complaint}
                          onChange={(e) => setForm({ ...form, complaint: e.target.value })}
                          required
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="image">
                          Upload Image (Optional)
                        </label>
                        <input
                          type="file"
                          id="image"
                          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          accept="image/*"
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="time">
                          Date and Time
                        </label>
                        <input
                          type="datetime-local"
                          id="time"
                          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          onChange={(e) => setForm({ ...form, time: e.target.value })}
                          required
                        />
                      </div>
                      <div className="flex justify-end space-x-4">
                        <button
                          type="button"
                          onClick={handleCloseModal}
                          className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                        >
                          Submit
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      );
};