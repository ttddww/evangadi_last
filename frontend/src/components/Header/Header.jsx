import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import eva from "../../assets/images/10002.png";
import classes from "./header.module.css";
import { AppState } from "../../App";

function Header() {
  const { user, setUser } = useContext(AppState); // 👈 useContext to access user state
  console.log(user);
  
  const navigate = useNavigate();

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("token"); // remove token
    setUser(null); // reset user in context
    navigate("/login"); // redirect to login page
  };

  return (
    <div className={classes.container}>
      <Link to="/">
        <img src={eva} alt="Eva" />
      </Link>
      <div className={classes.nav}>
        <h3>
          <Link to="/">Home</Link>
        </h3>
        <h3>
          <Link to="/how-it-works">How it works</Link>
        </h3>

        {user ? (
          <button onClick={handleLogout}>SIGN OUT</button>
        ) : (
          <button onClick={() => navigate("/login")}>SIGN IN</button>
        )}
      </div>
    </div>
  );
}

export default Header;

// import React, { useContext } from 'react';
// import { Link } from "react-router-dom";
// import eva from "../../assets/images/10002.png"
// import classes from "./header.module.css"
// import { AppState } from '../../App';

// function Header() {
//   const {suer} = useContext(AppState);
//   return (
//     <div className={classes.container}>
//       <Link to="/">
//         <img src={eva} alt="Eva" />
//       </Link>
//       <div>
//         <h3>Home</h3>
//         <h3>How it works</h3>
//         <button>SIGN IN</button>
//       </div>
//     </div>
//   );
// }

// export default Header
