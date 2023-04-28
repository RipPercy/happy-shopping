import React from "react";
import { BiMailSend, BiPhoneCall } from "react-icons/bi";

const Footer = () => {
  return (
    <div className="footer">
      <div className="col-md-4">
        <h1 className="bg-dark p-2 text-white text-center">CONTACT US</h1>
        <p className="text-justify mt-2">
          Any query and info about product feel free to call anytime we 24/7
          vaialible
        </p>
        <p className="mt-3">
          <BiMailSend /> : hajooka2015@gmail.com
        </p>
        <p className="mt-3">
          <BiPhoneCall /> : 089-649-3543
        </p>
      </div>
    </div>
  );
};

export default Footer;
