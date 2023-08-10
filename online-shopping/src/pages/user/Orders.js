import React, { useState, useEffect } from "react";
import UserMenu from "../../components/Layout/UserMenu";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import { useAuth } from "../../context/auth";
import moment from "moment";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();
  const getOrders = async () => {
    try {
      const { data } = await axios.get("/api/v1/auth/orders");
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);
  return (
    <UserMenu>
      <div className=" mt-16  dashboard">
        <div className="py-2 text-center text-2xl font-bold  ">ALL ORDERS</div>
        <div className=" p-4">
          <div className=" bg-white shodow-md w-full">
            <div className="">
              <div className=" overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                    <th scope="col" className="px-6 py-3">
                        #
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Buyer
                      </th>
                      <th scope="col" className="px-6 py-3">
                        date
                      </th>
                      <th scope="col" className="px-6 py-3">
                        payment
                      </th>
                      <th scope="col" className="px-6 py-3">
                        quantity
                      </th>
                    </tr>
                    
                  </thead>
                  <tbody>
                    {orders?.map((o,i)=>{
                      return (
                        <>
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={i}>
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          {i+1}
                        </th>
                        <td className="px-6 py-4">
                          {o.status}
                        </td>
                        <td className="px-6 py-4">
                        {o?.buyer?.name}
                        </td>
                        <td className="px-6 py-4">
                        {moment(o?.createAt).fromNow()}
                        </td>
                        <td className="px-6 py-4">
                        {o?.payment.success ? "Success" : "Failed"}
                        </td>
                        <td className="px-6 py-4">
                        {o?.products?.length}
                        </td>
                        
                      </tr>
                      {o?.products?.map((p,j)=>{
                        return (
                          <>
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={j}>
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          
                        </th>
                        <td className="px-6 py-4">
                        <img
                src={`/api/v1/products/product-photo/${p._id}`}
               className="card-img-top"
               alt={p.name}
             width="100px"
               height={"100px"}
              /> 
                        </td>
                        <td className="px-6 py-4">
                        <div>name : {p.name}</div>
                        <div>description : {p.description.substring(0, 30)}</div>
                        <div>price : ${p.price}</div>
                        </td>
                       
                        
                        
                        
                      </tr>
                          </>
                        )
                      })}
                      </>
                      )
                    })}
                                        
                  </tbody>
                </table>
              </div>

            </div>

          </div>
        </div>
      </div>
    </UserMenu>
  );
};

export default Orders;

// <div className="col-md-9">
// <h1 className="text-center">All Orders</h1>
// {orders?.map((o, i) => {
//   return (
//     <div className="">
//       <table className="table">
//         <thead>
//           <tr>
//             <th scope="col">#</th>
//             <th scope="col">Status</th>
//             <th scope="col">Buyer</th>
//             <th scope="col"> date</th>
//             <th scope="col">Payment</th>
//             <th scope="col">Quantity</th>
//           </tr>
//         </thead>
//         <tbody>
//           <tr>
//             <td>{i + 1}</td>
//             <td>{o?.status}</td>
//             <td>{o?.buyer?.name}</td>
//             <td>{moment(o?.createAt).fromNow()}</td>
//             <td>{o?.payment.success ? "Success" : "Failed"}</td>
//             <td>{o?.products?.length}</td>
//           </tr>
//         </tbody>
//       </table>
//       <div className="container">
//         {o?.products?.map((p, i) => (
//           <div className="row mb-2 p-3 card flex-row" key={p._id}>
//             <div className="col-md-4">
//               <img
//                 src={`/api/v1/products/product-photo/${p._id}`}
//                 className="card-img-top"
//                 alt={p.name}
//                 width="100px"
//                 height={"100px"}
//               />
//             </div>
//             <div className="col-md-8">
//               <p>{p.name}</p>
//               <p>{p.description.substring(0, 30)}</p>
//               <p>Price : {p.price}</p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// })}
// </div>