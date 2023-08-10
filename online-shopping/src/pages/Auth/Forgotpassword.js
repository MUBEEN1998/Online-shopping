import React, { useState } from 'react';
import Layout from '../../components/Layout/Layout';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [answer, setAnswer] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/auth/forgot-password", {
        email,
        newPassword,
        answer,
      });
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);

        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };


  return (
    <>
      <Layout>
        <div className="w-full p-4 bg-gray-100 m-auto">
          <div className="w-full mt-12 md:mt-0 h-60 ">
            <section className="bg-gray-50 dark:bg-gray-900">
              <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
                  <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                    Forgot Password
                  </h2>
                  <form
                    className="mt-4 space-y-4 lg:mt-5 md:space-y-5"
                    onSubmit={handleSubmit}
                  >
                    <div>
                      <label
                        htmlFor="email"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Your email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        id="email"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="name@company.com"
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="answer"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Your Answer
                      </label>
                      <input
                        type="text"
                        name="answer"
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                        id="answer"
                        placeholder="enter your answer"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="new-password"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        New Password
                      </label>
                      <input
                        type="password"
                        name="newpassword"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        id="new-password"
                        placeholder="••••••••"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                      />
                    </div>
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="newsletter"
                          aria-describedby="newsletter"
                          type="checkbox"
                          className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                          required
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label
                          htmlFor="newsletter"
                          className="font-light text-gray-500 dark:text-gray-300"
                        >
                          I accept the{' '}
                          <a
                            className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                            href="#"
                          >
                            Terms and Conditions
                          </a>
                        </label>
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="w-full text-white bg-gray-200 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                    >
                      Reset password
                    </button>
                  </form>
                </div>
              </div>
            </section>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default ForgotPassword;
