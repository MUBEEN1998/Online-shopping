import UserMenu from '../../components/Layout/UserMenu'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast';
import { useAuth } from '../../context/auth';
const Dashboard = () => {
  const [auth,setAuth]= useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState('');

  
useEffect(()=>{

  

  setName(auth?.user?.name)
  setEmail(auth?.user?.email)
  setPhone(auth?.user?.phone)
  setAddress(auth?.user?.address)
  
},[auth?.user])

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const { data } = await axios.put("/api/v1/auth/profile", {
      name,
      password,
      phone,
      address,
    });
    if (data?.errro) {
      toast.error(data?.error);
    } else {
      setAuth({ ...auth, user: data?.updatedUser });
      let ls = localStorage.getItem("auth");
      ls = JSON.parse(ls);
      ls.user = data.updatedUser;
      localStorage.setItem("auth", JSON.stringify(ls));
      toast.success("Profile Updated Successfully");
    }
  } catch (error) {
    console.log(error);
    toast.error("Something went wrong");
  }
};

  return (
    <>
    
    <UserMenu>
    <div className=' w-full bg-gray-200 m-2 p-2'>
          <div className='w-full'>
          <div className='bg-gray-300 py-4' >
    <section className="bg-gray-50 dark:bg-gray-900">
  <div className="flex flex-col items-center justify-center px-6 py-4 mx-auto md:h-screen lg:py-0">
    
    <div className="w-full mt-20 bg-white rounded-lg shadow dark:border hover:shadow-xl md:mt-0 sm:max-w-md xl:p-0 dark:bg-red-900 dark:border-red-400">
      <div className="p-4 space-y-2 md:space-y-6 sm:p-6">
        <h1 className="text-xl font-bold leading-tight  text-red-900 md:text-2xl dark:text-white">
        </h1>
        <form className="space-y-2 md:space-y-4" onSubmit={handleSubmit} action="#">
          <div>
            <input type="text" name="name" 
            onChange={(e)=>setName(e.target.value)}

             value={name}
             className="bg-gray-20 border
             border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600
              focus:border-primary-600 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 
              dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
              placeholder="name" required />
          </div>
          <div class=""></div>

          <div>
            <input type="email" name="email" 
            onChange={(e)=>setEmail(e.target.value)}

            value={email}
             className="bg-gray-20 border
             border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600
              focus:border-primary-600 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 
              dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
              placeholder="name@company.com" required disabled />
          </div>
          <div>
            <input type="Number" name="phone"
            onChange={(e)=>setPhone(e.target.value)}

            value={phone}
             className="bg-gray-20 border
             border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600
              focus:border-primary-600 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 
              dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
              placeholder="phone" required />
          </div>
          <div>
            <input type="text" name="address" 
            value={address}
            onChange={(e)=>setAddress(e.target.value)}
             placeholder="address" className="bg-gray-20 border
             border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600
              focus:border-primary-600 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 
              dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  required />
          </div>

          

          <div>
            <input type="text" name="password" 
            onChange={(e)=>setPassword(e.target.value)}
            value={password}
            placeholder="••••••••"
             className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg 
             focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700
              dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500
               dark:focus:border-blue-500" required />
          </div>
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input id="terms" aria-describedby="terms" type="checkbox" className="bg-gray-20 border
             border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600
              focus:border-primary-600 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 
              dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  required />
            </div>
            <div className="ml-3 text-sm">
            </div>
          </div>
          <button type="submit" className="w-full
           text-white bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% ... hover:bg-gray-800 md:text-white text-gray-500 focus:ring-4
           focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2 text-center
            dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Update account</button>
          
        </form>
      </div>
    </div>
  </div>
</section>

    </div>
          </div>
    </div>
    </UserMenu>
    </>
  )
}

export default Dashboard