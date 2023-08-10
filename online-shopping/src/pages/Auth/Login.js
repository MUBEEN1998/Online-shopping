import React,{useState} from 'react'
import Layout from '../../components/Layout/Layout'
import { Link } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import { useAuth } from '../../context/auth';
const Login = () => {
  const navigate=useNavigate();
  const [auth,setAuth]=useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      
      const res = await axios.post('/api/v1/auth/login', {
        
        email,
        password,
      });
      if (res) {
        toast.success(res.data.message);
        setAuth(
          {
            ...auth,
            user:res.data.user,
            token:res.data.token
          }
        )
        localStorage.setItem("auth",JSON.stringify(res.data))
        console.log(res.data.message);
        navigate('/');
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
    <Layout>
      <div className='w-full p-4 bg-gray-100  m-auto'>
            <div className='w-full mt-12 md:mt-0  h-60 '>
<section className="bg-gray-50 dark:bg-gray-900">
  <div className="flex flex-col items-center justify-center  px-6 py-8 mx-auto md:h-screen lg:py-0">
    
    <div className="w-full bg-white rounded-lg shadow dark:border hover:shadow-xl md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1 className="text-xl font-bold text-red-900  leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
          Sign in to your account
        </h1>
        <form className="space-y-4 md:space-y-6" onSubmit={handlesubmit} action="#">
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
            <input type="email" 
            name="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required />
          </div>
          <div>
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
            <input type="text"
             name="password"
             value={password}
             onChange={(e)=>setPassword(e.target.value)}
             id="password"
            placeholder="••••••••"
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600  w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Remember me</label>
              </div>
            </div>
            <Link to="/forgot" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</Link>
          </div>
          <button type="submit" className="w-full text-white bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% ... hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>
          <p className="text-sm font-light text-gray-500 dark:text-gray-400">
            Don’t have an account yet? <a href="#" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</a>
          </p>
        </form>
      </div>
    </div>
  </div>
</section>


            </div>
      </div>
    </Layout>
    </>
  )
}

export default Login