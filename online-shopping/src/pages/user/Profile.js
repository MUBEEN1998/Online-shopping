import React, { useEffect, useState } from 'react'
import UserMenu from '../../components/Layout/UserMenu'
import { useAuth } from '../../context/auth';
import { Link } from 'react-router-dom';
const Profile = () => {
  const [auth, setAuth] = useAuth();

  return (
    <UserMenu>
      <div className='  bg-gray-200 h-[100vh] p-4 ' style={{ marginTop: "60px" }}>
        <div clasName='p-4'>
          <div className='w-auto mx-auto text-center text-white font-bold text-4xl  justify-center'>
            <p bg-blue-600>Hello</p>
            
          </div>
          <div className='w-auto  mx-auto text-gray-800 text-center text-white font-bold text-2xl  justify-center'>
            I'm {auth?.user?.name}
          </div>

          <div className='shadow-md bg-white gap-4 p-4 '>
            <div className='px-2 flex gap-8 mt-4'>
              <div >Email  :</div>
              <div>
                {auth?.user?.email}

              </div>

            </div>
            <div className='px-2 flex gap-8 mt-8'>
              <div >Name :</div>
              <div>
                {auth?.user?.name}

              </div>

            </div>
            <div className='px-2 flex gap-8 mt-8'>
              <div >Mobile:</div>
              <div>
                {auth?.user?.phone}

              </div>

            </div>



            <div className='px-2 flex gap-4 mt-8'>
              <div >Address  :</div>
              <div>
                {auth?.user?.address}

              </div>

            </div>

        <Link to="/dashboard/user"><div className='mt-8 w-1/4 h-auto text-center text-white rounded p-2 
        bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 text-[14px] '>Update Profile</div></Link>

    </div>
          </div>
        </div>
      
    </UserMenu>

  )
}

export default Profile