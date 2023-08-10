// import React from 'react'
// import Layout from '../components/Layout/Layout';

import React from "react";
import Layout from "../components/Layout/Layout";
import { BiMailSend, BiPhoneCall, BiSupport } from "react-icons/bi";
const Contact = () => {
  return (
    <Layout title={"Contact us"}>
      <div className="  static m-auto md:absolute left-10 right-10 top-20 gap-10 flex grid grid-cols-1 md:grid-cols-2">
        <div className="p-5 ">
          <img
            src="https://media.istockphoto.com/id/673893168/photo/cloud-computing-concept.
            jpg?s=612x612&w=0&k=20&c=cL8g91CfGDrfuLNCnYyF-_GWFDGwIBGpHlKNtT_dmKs="
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>
        <div className="p-5 fe">
          <h1 className="bg-dark p-2 text-white text-center">CONTACT US</h1>
          <p className="text-justify text-2xl text-gray-800 mt-2">
            Any query and info about prodduct feel free to call anytime we 24X7
            vaialible
          </p>
          <div className="flex gap-5 text-xl text-gray-700 ">
          <p className="mt-3"><BiMailSend size={25} /></p> <p className="pt-1">: www.help@ecommerceapp.com</p>
          
          </div>
          <div className="flex gap-5 text-xl text-gray-700 ">
          <p className="mt-3"><BiPhoneCall  size={25} /></p> <p className="pt-1">: 012-3456789</p>
          
          </div>
          <div className="flex gap-5 text-xl text-gray-700 ">
          <p className="mt-3"><BiSupport  size={25} /></p> <p className="pt-1">: 1800-0000-0000 (toll free)</p>
          
          </div>
          
          
          
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
