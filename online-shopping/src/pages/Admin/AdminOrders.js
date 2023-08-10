import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import AdminMenu from "../../components/Layout/AdminMenu";
import { useAuth } from "../../context/auth";
import moment from "moment";
import { Select } from "antd";
const { Option } = Select;

const AdminOrders = () => {
  const [status, setStatus] = useState([
    "Not Process",
    "Processing",
    "Shipped",
    "deliverd",
    "cancel",
  ]);
  const [changeStatus, setCHangeStatus] = useState("");
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();
  const getOrders = async () => {
    try {
      const { data } = await axios.get("/api/v1/auth/all-orders");
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  const handleChange = async (orderId, value) => {
    try {
      const { data } = await axios.put(`/api/v1/auth/order-status/${orderId}`, {
        status: value,
      });
      getOrders();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <AdminMenu>
    <div className=" mt-16  dashboard">
    <div className="py-2 text-center text-2xl font-bold  ">ALL ORDERS</div>
    <div className=" p-4">
      <div className=" bg-white shodow-md w-full">
        <div className="">
          <div className="overflow-x-auto">
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
                    <Select
                          bordered={false}
                          onChange={(value) => handleChange(o._id, value)}
                          defaultValue={o?.status}
                        >
                          {status.map((s, i) => (
                            <Option key={i} value={s}>
                              {s}
                            </Option>
                          ))}
                        </Select>
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
  </AdminMenu>
   );
};

export default AdminOrders;
