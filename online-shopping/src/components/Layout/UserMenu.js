import React, { useState } from "react";
import Header from "./Header";
import { Link } from 'react-router-dom'
import { AiOutlineProfile,AiOutlineBorderInner } from 'react-icons/ai'

// import { RiAdminFill } from "react-icons/ri";
import {BsBackspace} from 'react-icons/bs'
import { GiHamburgerMenu } from "react-icons/gi";
import {CiLogout} from 'react-icons/ci'
import {motion} from "framer-motion"
import { useAuth } from "../../context/auth";
const UserMenu = ({children}) => {
  const [open ,setOpen]=useState(false)
  const [auth,setAuth]=useAuth();
  const [isopen, setIsopen] = useState(false);

  const menu = [
    {name:"Profile", path:"/dashboard/user/profile", icon:<AiOutlineProfile size={24}/>},
    {name:"Orders", path:"/dashboard/user/orders", icon:<AiOutlineBorderInner size={24}/>},
    {name:"logout", icon:<CiLogout size={20}/>}
  ]
  const toggle = () => {
    setIsopen(!isopen);
  };
  return (
    <>
    <Header/>
    <div className="">
      <div className="fixed w-40 h-[100vh] left-[-1px] top-[65px]  shodow-xl">
        {menu?.map((c,index)=>{
          return(
         <Link to={c.path}> <div className="w-full p-2 text-start text-gray-600 hover:text-red-800 gap-2 flex hover:text-white" key={index}>
          {c.icon}  {c.name}
          </div>
          </Link>
          )
        })}
      </div>
     <main className="ml-[200px] h-auto  bg-gray-200">{children}</main>
    </div>
    </>
  );
};

export default UserMenu;
