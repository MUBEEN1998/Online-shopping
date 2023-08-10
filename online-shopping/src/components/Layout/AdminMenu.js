import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { BiCategory, BiLogoProductHunt, BiSolidCartAdd, BiBorderAll } from "react-icons/bi";
// import { RiAdminFill } from "react-icons/ri";
import {BsBackspace} from 'react-icons/bs'
import { GiHamburgerMenu } from "react-icons/gi";
import Header from "./Header";

const AdminMenu = ({ children }) => {
  const [isopen, setIsopen] = useState(false);

  const toggle = () => {
    setIsopen(!isopen);
  };

  const menu = [
    { name: "Create Category", path: "/dashboard/admin/create-category", icon: <BiCategory size={20} /> },
    { name: "Create Products", path: "/dashboard/admin/create-product", icon: <BiSolidCartAdd size={20} /> },
    { name: " Products", path: "/dashboard/admin/products", icon: <BiLogoProductHunt size={20} /> },
    { name: " Orders", path: "/dashboard/admin/orders", icon: <BiBorderAll size={20} /> },
  ];

  return (
    <>
      <Header />
      <div className="">
        <motion.div animate={{ width: isopen ? "250px" : "36px" }} className="sidebar top-[114px] transitions-in  shadow-md ">
          <div className="w-auto flex p-1 gap-2 text-[#8B0000] text-2xl bold ">
            {isopen ? (
              ""
            ) : (
              <GiHamburgerMenu onClick={toggle} />
            )}
            {isopen ? <p>Admin Panel</p> : ""}
            {isopen ? (
              <p className="p-2 ml-14">
                <BsBackspace onClick={() => setIsopen(false)} size={20} />
              </p>
            ) : (
              ""
            )}
          </div>
          {menu.map((item, index) => {
            return (
              <div className="w-full mt-4 p-2 text-black hover:text-[#8B0000]" key={index}>
                <Link to={item.path} className="flex gap-2">
                  <p>{item.icon}</p>
                  {isopen ? <p>{item.name}</p> : ""}
                </Link>
              </div>
            );
          })}
        </motion.div>
        <motion.main
          animate={{ marginLeft: isopen ? "250px" : "36px" }} // This will slide the children component
          transition={{ type: "spring", damping: 25, stiffness: 120 }}
          className="ml-20  "
        >
          {children}
        </motion.main>
      </div>
    </>
  );
};

export default AdminMenu;
