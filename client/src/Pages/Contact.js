import React from "react";
import Layout from "../Components/Layout/Layout";
import { BiMailSend, BiPhoneCall, BiSupport } from "react-icons/bi";
const Contact = () => {
  return (
    <Layout title={"Contact us"}>
      <div className="row contactus ">
        <div className="col-md-6 ">
          <img className="contact-img"
            src="/images/Saurav.jpg"
            alt="Saurav"
            style={{ width: "50%" }}
          />
          <img className="contact-img"
            src="/images/Saurav.jpg"
            alt="Saurav"
            style={{ width: "50%" }}
          />
        </div>
        <div className="col-md-4">
          <h1 className="bg-dark p-2 text-white text-center">CONTACT US</h1>
          <p className="text-justify mt-2">
            any query and info about prodduct feel free to call anytime we 24X7
            available
          </p>
          <p className="mt-3">
            <BiMailSend /> : grontho22@gmail.com
          </p>
          <p className="mt-3">
            <BiPhoneCall /> : 9365139650
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;