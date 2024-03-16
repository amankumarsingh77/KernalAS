import Login from "./components/auth/Login"
import Signup from "./components/auth/Signup"
import ForgetPassword from "./components/auth/ForgetPassword"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { auth } from "./firebase/firebase";
import DashMain from "./components/dashboard/DashMain";
import ChatPage from "./pages/ChatPage";
import NavBar from "./components/NavBar";
import PriceCard from "./components/pricing/PriceCard";
import PriceMain from "./components/pricing/PriceMain";
import Success from "./components/pricing/Success";
import Contacus from "./containers/Contacus";

export default function App() {


  return (
    <>

      <Router>
        <div className="h-screen bg-gray-900">
          <NavBar />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgotpassword" element={<ForgetPassword />} />
            <Route path="/dash" element={<DashMain />} />
            <Route path="/chat/:bot_slug" element={<ChatPage />} />
            <Route path="/pricing" element={<PriceMain />} />
            <Route path="/payment/success" element={<Success />} />
            <Route path="/contactus" element={<Contacus />} />
          </Routes>
        </div>
      </Router>

    </>
  )
}