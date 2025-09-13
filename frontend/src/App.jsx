import { Routes, Route, useNavigate } from "react-router-dom";
import { createContext, useEffect, useState } from "react";
import axios from "axios";

import Home from "./pages/Home/Home";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import QueDetAndAnswers from "./pages/QueDetAndAnswers/QueDetAndAnswers";
import AskQuestion from "./pages/AskQuestion/AskQuestion";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";

export const AppState = createContext();

function App() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  // const token = localStorage.getItem("token");

  useEffect(() => {
    const checkUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) return; // 👈 don't call backend if no token

      try {
        const res = await axios.get("http://localhost:5600/api/users/check", {
          headers: { Authorization: `Bearer `+ token },
        });
        console.log(res.data);
        setUser(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    checkUser();
  }, [navigate]);

  return (
    <AppState.Provider value={{ user, setUser }}>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ask" element={<AskQuestion />} />
        <Route path="/question/:qId" element={<QueDetAndAnswers />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer />
    </AppState.Provider>
  );
}

export default App;
