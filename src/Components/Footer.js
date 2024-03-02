import { Link } from "react-router-dom";
import logo from "../assets/images/logo.png";

const Footer = () => {
  return (
    <footer className="border-t bg-gray-900 text-white">
      <div className="container flex flex-col gap-4 p-5 text-center sm:flex-row">

        <p className="text-sm">&copy; 2023 EazyEvent. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
