import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import classes from "./register.module.css";
import About from "../../components/About/About";
import axiosBase from "../../assets/axiosConfig";

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    userName: "",
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
    try {
      const res = await axiosBase.post("/users/register", formData);
      console.log(res.data);
      navigate("/login"); // redirect to login page
    } catch (err) {
      setError(
        err.response?.data?.message || "Registration failed. Try again."
      );
    }
  };

  return (
    <section className={classes.container}>
      <div className={classes.formWrapper}>
        <form className={classes.form} onSubmit={handleSubmit}>
          <h2>Join the network</h2>
          <p>
            Already have an account? <Link to="/login">Sign in</Link>
          </p>

          {error && <p className={classes.error}>{error}</p>}

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <div className={classes.nameRow}>
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
          <input
            type="text"
            name="userName"
            placeholder="User Name"
            value={formData.userName}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <button type="submit" className={classes.btn}>
            Agree and Join
          </button>

          <p className={classes.terms}>
            I agree to the <Link to="/privacy">privacy policy</Link> and{" "}
            <Link to="/terms">terms of service</Link>.
          </p>

          <p>
            Already have an account? <Link to="/login">Sign in</Link>
          </p>
        </form>
      </div>
      <About />
    </section>
  );
}

export default Register;
