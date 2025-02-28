import { BrowserRouter, Route, Routes } from "react-router"
import HomePage from "./views/HomePage"
import BaseLayout from "./views/BaseLayout"
import LoginPage from "./views/LoginPage"
import MyReservationPage from "./views/MyReservationPage"
import NewsPage from "./views/NewsPage"
import MyMedRecordPage from "./views/MyMedRecordPage"


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route element={<BaseLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/my-reservation" element={<MyReservationPage/>} />
          <Route path="/news" element={<NewsPage/>} />
          <Route path="/my-treatment-record" element={<MyMedRecordPage/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
