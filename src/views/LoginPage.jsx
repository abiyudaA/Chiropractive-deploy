import { Link, useNavigate } from "react-router"
import Navbar from "../components/Navbar"
import { useEffect, useState } from "react"
import axios from "axios"
import baseUrl from "../api/baseUrl"
import { GoogleLogin } from "@react-oauth/google"


export default function LoginPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()


    async function handleSubmit(event) {
        event.preventDefault()
        try {
            const { data } = await axios.post(`${baseUrl}/login`, { email, password })
            // console.log(data, '<<< data');
            localStorage.setItem('access_token', data.access_token)
            Toastify({
                text: 'Succeed Login!',
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
            navigate('/')
        } catch (err) {
            console.log(err)
            Toastify({
                text: err.response.data.message,
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
    }

    // useEffect(() => {
    //     console.log(email, password)
    // })


    async function googleLogin(codeResponse) {
        try {
            // console.log(codeResponse);
            const { data } = await axios.post(
                `${baseUrl}/google-login`, null, {
                headers: {
                    token: codeResponse.credential
                }
            });
            
            localStorage.setItem("access_token", data.access_token)
            Toastify({
                text: "Succeed login",
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
            navigate('/')
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <Navbar />
            <div className="bg-gray-100 min-h-screen p-8">
                <div className="container mx-auto max-w-md">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">Login</h2>
                    <form className="bg-white p-6 rounded-lg shadow-md" onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2" htmlFor="email">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter your email"
                                onChange={(event) => setEmail(event.target.value)}
                                value={email}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2" htmlFor="password">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter your password"
                                onChange={(event) => setPassword(event.target.value)}
                                value={password}
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 mb-4"
                        >
                            Login
                        </button>
                        <div className="divider flex justify-center items-center px-10">OR</div>
                        <div className="mt-6 flex justify-center items-center">
                            <GoogleLogin onSuccess={googleLogin}/>
                        </div>
                    </form>
                    </div>
                    <div>
                </div>
            </div>
        </div>
    )
}