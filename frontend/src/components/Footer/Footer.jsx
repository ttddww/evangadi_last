import { PiFacebookLogoBold } from "react-icons/pi";
import { PiInstagramLogo } from "react-icons/pi";
import { RiYoutubeLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import fot from "../../assets/images/10001.png";
import classes from "./footer.module.css";

function Footer() {
  return (
    <section className={classes.container}>
      <div className={classes.footer}>
        <Link to="/">
          <img src={fot} alt="logo" />
        </Link>
        <div>
          <Link to="https://www.facebook.com/evangaditech/">
            <PiFacebookLogoBold style={{ fontSize: "30px" }} />
          </Link>
          <Link to="https://www.instagram.com/evangaditech/?hl=en">
            <PiInstagramLogo style={{ fontSize: "30px" }} />
          </Link>
          <Link to="https://www.youtube.com/@EvangadiTech">
            <RiYoutubeLine style={{ fontSize: "30px" }} />
          </Link>
        </div>
      </div>
      <div>
        <h3>Useful Link</h3>
        <Link to="">How it works</Link>
        <Link to="">Terms of Service</Link>
        <Link to="">Privacy Policy</Link>
      </div>
      <div>
        <h3>Contact Info</h3>
        <Link to="">Evangadi Networks</Link>
        <Link to="">support@evangadi.com</Link>
        <Link to="">+1-202-386-2702</Link>
      </div>
    </section>
  );
}

export default Footer;
