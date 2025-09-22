import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import classes from "./login.module.css";
import About from "../../components/About/About";
import axiosBase from "../../assets/axiosConfig";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission
    const { email, password } = formData;
    console.log("Form Data:", formData);
    // You can also send formData to a server here
    if (!email || !password) {
      alert("Please fill in all fields");
      return;
    }

    try {
      const { data } = await axiosBase.post("/users/Login", formData);
      alert("Login successful");
      localStorage.setItem("token", data.token);
      navigate("/");
    } catch (error) {
      alert(error?.response?.data?.msg);
      console.log(error.message);
    }
  }; 

  return (
    <div className={classes.container}>
      <div className={classes.formWrapper}>
        <form className={classes.form} onSubmit={handleSubmit}>
          <h2>Login to your account</h2>
          <p>
            Don’t have an account?{" "}
            <Link to="/register">Create a new account</Link>
          </p>

          {error && <p className={classes.error}>{error}</p>}

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Your Password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <button type="submit" className={classes.btn}>
            Submit
          </button>

          <p className={classes.footerText}>
            <Link to="/register">Create an account?</Link>
          </p>
        </form>
      </div>
      <About />
    </div>
  );
}

export default Login;
