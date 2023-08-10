import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { GiShoppingCart, GiHamburgerMenu, GiSplitCross } from 'react-icons/gi'
import { useAuth } from '../../context/auth'
import { toast } from 'react-hot-toast'
import Searchform from '../Forms/Searchform'
import { useCart } from '../../context/Cart'
import useCategory from '../../hooks/useCategory'


const Header = () => {
  const categorys =useCategory();

  const [auth, setAuth] = useAuth();
  const [cart,setCart]=useCart();
  const [drop,setDrop]=useState(false)
  const hanlogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");

  }
  const dropdowns=()=>{
    setDrop(true)
  }
  const outdrop=()=>{
    setDrop(false)
  }
  const menu = [
    { path: "/", name: "Home" },
    {name:"Category",fun:dropdowns,fun1:outdrop},
    !auth?.user ? { path: "/register", name: "Register" } : { path: "/login", name: "Logout", fun: hanlogout },
    !auth?.user ? { path: "/login", name: "Login", } : { path: null ,name:""},
    { path: "/cart", name: `Cart(${cart?.length})` }
  ];


  const [open, setOpen] = useState(false)
  return (
    <>
      <div className='w-full bg-[#8B0000] text-white fixed top-0 z-index-1 left-0'>
        <div className='md:flex items-center justify-between bg-[#8B0000] ot-4 md:px-5 px-7 pt-2 '>
          <div className='gap-2 flex'>
            <GiShoppingCart size={20} /> <p> Shopping</p>
          </div>
          <div onClick={() => setOpen(!open)} className='absolute  md right-5 top-5 cursor-pointer md:hidden'>
            {open ? <GiHamburgerMenu size={20} /> : <GiSplitCross size={20} />}
          </div>


          <ul className={`md:flex md:items-center text-white md:pb-0 pb-14 pt-5 md:pt-0 pl-5 md:pl-0 absolute md:static 
      bg-[#8B0000] md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-0 duration-500 ease-in ${open ? 'top-[-200px]' : 'top-[30px]'} `}>
            <div className='w-auto md:w-[400px]'><Searchform/></div>
            {menu.map((item, index) => {
              return (
                <li className='md:ml-8 text-md '>
                  { item.name ? (
                    <Link
                      className='text-gray-white hover:text-gray-100 duration-500'
                      onClick={item.fun} // Call the function here
                      to={item.path}
                      onChange={item.fun1}
                    >
                      {item.name}
                    </Link>
                  ) : null}     </li>
              )
            })}
             { auth?.user ? <Link
                          to={`/dashboard/${
                            auth?.user?.role === 1 ? "admin" : "user"
                          }`}
                          className="dropdown-item px-8"
                        >Dashboard</Link>:<li></li>}
          </ul>
        </div>
      </div>
      {drop?<div className=' w-[80px] left-[1000px] fixed top-10 bg-white 
      transition ease-in-out delay-260 rounded shadow-md h-[20]'>

        <ul className=''>
          {categorys?.map((item,index)=>{
            return(
          <li className='p-1 text-[14px] text-gray-400 hover:bg-red-800 hover:text-white' key={index}>
            <Link to={`/category/${item.slug}`}>{item.name}</Link></li>

            )

          })}
          
        </ul>
      </div>:<p></p>}
      


    </>
  )
}

export default Header