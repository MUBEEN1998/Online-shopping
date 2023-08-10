import React, { useState, useEffect } from 'react'
import AdminMenu from '../../components/Layout/AdminMenu'
import axios from 'axios'
import  toast from 'react-hot-toast'
import Categoryform from '../../components/Forms/Categoryform'
import { RiDeleteBin5Fill, RiEditFill } from "react-icons/ri";
import { Button, Modal } from 'antd';


const CreateCetogory = () => {
  const [category, setCategory] = useState([])
  const [name, setName] = useState("")
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");
  // get category=====================================
  const getCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/all-category");
      if (data.success) {
        setCategory(data?.category);
        console.log(category) // Extract the category data and update the state
        // Extract the category data and update the state
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };


  useEffect(() => {
    getCategory()

  }, [])
  //=========================================create category==========================
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/v1/category/create-category", { name, });
      console.log(data?.success);
      if (data?.success) {
        toast.success(`${name} is created`);
        getCategory();
        setName("");
      }

    } catch (error) {
      console.log(error)
      toast.success("category not created")
    }
  }

//=================delete category=========================
const deltecategory=async(pid)=>{
  try {
    const { data } = await axios.delete(
      `/api/v1/category/delete-category/${pid}`
    );
    if (data.success) {
      toast.success(`category is deleted`);

      getCategory();
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    toast.error("Somtihing went wrong");
  }
};

//======================update category================================
const updatacategory=async(e)=>{
  e.preventDefault();
    try {
      const { data } = await axios.put(
        `/api/v1/category/update-category/${selected._id}`,
        { name: updatedName }
      );
      if (data?.success) {
        toast.success(`${updatedName} is updated`);
        setSelected(null);
        setUpdatedName("");
        setVisible(false);
        getCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <AdminMenu>

        <div className=''>


          <div className='w-1/2  p-4 mx-5 mt-20 text-align-center text-white bold  '>
            <h1>CREATE CATEGORY</h1>
            <Categoryform
              handleSubmit={handleSubmit}
              value={name}
              setValue={setName}
            />
            <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-3 py-3">
                      Category name
                    </th>



                    <th scope="col" className="px-2 py-2">
                      <span className="sr-only"></span>
                    </th>
                    <th scope="col" className="px-2 py-2">
                      <span className="sr-only"></span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {category.map((c, index) => {
                    return (
                      <>
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={index}>
                          <th scope="row" className="px-2 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {c.name}
                          </th>


                          <td className="px-2 py-2 text-right">
                            <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                              <RiEditFill size={20}
                              
                              onClick={() => {
                                setVisible(true);
                                setUpdatedName(c.name);
                                setSelected(c);
                              }}
                              /></a>
                          </td>
                          <td className="px-2 py-2 text-right">
                            <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline"><RiDeleteBin5Fill size={20} onClick={()=>deltecategory(c._id)} /></a>
                          </td>
                        </tr>
                      </>
                    )
                  })}


                </tbody>
              </table>

              <div>
              <Modal
              onCancel={() => setVisible(false)}
              footer={null}
              visible={visible}
            >
              <Categoryform
                value={updatedName}
                setValue={setUpdatedName}
                handleSubmit={updatacategory}
              />
            </Modal>
              </div>

  

            </div>
          </div>
        </div>
      </AdminMenu>
    </>
  )
}

export default CreateCetogory