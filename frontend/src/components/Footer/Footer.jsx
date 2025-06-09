import { assets } from "../../assets/assets";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-content-left">
          <img src={assets.logo} alt="Tomato Logo" />
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci
            distinctio ad magnam repellendus quam, laborum optio quisquam
            suscipit ut accusamus est quia impedit!
          </p>
          <div className="footer-social-icons">
            <img src={assets.facebook_icon} alt="Facebook icon" />
            <img src={assets.twitter_icon} alt="Twitter icon" />
            <img src={assets.linkedin_icon} alt="Linkedin icon" />
          </div>
        </div>
        <div className="footer-content-center">
          <h2>Company</h2>
          <ul>
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
          </ul>
        </div>
        <div className="footer-content-right">
          <h2>Get in touch</h2>
          <ul>
            <li>+254-723-456-789</li>
            <li>contact@tomato.com</li>
          </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">
        Copyright 2025 Tomato.com - All Right Reserved
      </p>
    </div>
  );
};

export default Footer;
