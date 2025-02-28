import { Outlet, useNavigate } from "react-router";
import Navbar from "../components/Navbar";
import { useEffect } from "react";


export default function BaseLayout() {
    return (
        <>
        <Navbar />
        <Outlet />     
        </>
    )
}