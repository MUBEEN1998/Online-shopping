import React, { useState, useEffect } from "react";
import AdminMenu from "./../../components/Layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import {Select} from "antd";
import { useNavigate } from "react-router-dom";
const { Option } = Select;

const CreateProduct = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState("");

  //get all category
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/all-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something wwent wrong in getting catgeory");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  //create product function
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("photo", photo);
      productData.append("category", category);
      const { data } = axios.post(
        "/api/v1/products/create-product/",
        productData
      );
      if (data?.success) {
        toast.error(data?.message);
      } else {
        toast.success("Product Created Successfully");
        navigate("/dashboard/admin/products");
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };

  return (
    
    <AdminMenu >
      <section className="h-[100vh] mt-[-14px] bg-[#F5F5F5]">
          <div className=" h-full bg-bg-[#F5F5F5] ">
            <h1 className="text-3xl text-gray-900 block p-2 m-2   text-center mt-20"> Create Product</h1>

            <div className="  w-4/5 grid grid-cols-1 gap-1 md:grid-cols-2">
            <div className=" h-auto p-2 ">

              <div className="w-full ">
              <div className="w-full">
              <Select
                bordered={false}
                placeholder="Select a category"
                size="large"
                showSearch
                className="form-select bg-white border-2 rounded border-gray-300   w-full"
                onChange={(value) => {
                  setCategory(value);
                }}
              >
                {categories?.map((c) => (
                  <Option key={c._id} value={c._id}>
                    {c.name}
                  </Option>
                ))}
              </Select>
              </div>
            </div>
          </div>

          <div className="form-control w-full text-gray-400 text-[14px] p-2 m-2 bg-white border-2 rounded border-gray-300 ">
                <label className="">
                  {photo ? photo.name : "Upload Photo"}
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={(e) => setPhoto(e.target.files[0])}
                    hidden
                  />
                </label>
              </div>
              </div>
              <div className="mb-3">
                {photo && (
                  <div className="text-center justify-items-center w-20 h-20">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="product_photo"
                      height={"200px"}
                      width={"200"}
                      className="img img-responsive"
                    />
                  </div>
                )}
              </div>
            <div className="  w-4/5  gap-4 grid grid-cols-1 md:grid-cols-2">

              <div className="form-control w-full m-2 ">
                <input
                  type="text"
                  value={name}
                  placeholder="write a name"
                  className="form-control text-gray-400 w-full h-4/5 p-2 bg-white border-2 rounded border-gray-300"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="form-control w-full m-2  ">
                <textarea
                  type="text"
                  value={description}
                  placeholder="write a description"
                  className="form-control text-gray-400 w-full h-4/5 p-2 bg-white border-2 rounded border-gray-300"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
                  
              </div> 

            <div className="  w-4/5 grid grid-cols-1 gap-4 md:grid-cols-2">

              <div className="form-control w-full m-2  ">
                <input
                  type="number"
                  value={price}
                  placeholder="write a Price"
                  className="form-control text-gray-400 w-full h-4/5 p-4 bg-white border-2 rounded border-gray-300"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="form-control w-full m-2  ">
                <input
                  type="number"
                  value={quantity}
                  placeholder="write a quantity"
                  className="form-control text-gray-400 w-full h-4/5 p-2 bg-white border-2 rounded border-gray-300"
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
              </div>
              <div className="form-control w-4/5  m-2 ">
                <Select
                  bordered={false}
                  placeholder="Select Shipping "
                  size="large"
                  showSearch
                  className="form-select text-gray-400  w-full h-4/5  bg-white border-2 rounded border-gray-300"
                  onChange={(value) => {
                    setShipping(value);
                  }}
                >
                  <Option value="0">No</Option>
                  <Option value="1">Yes</Option>
                </Select>
              </div>
              <div className="mb-3">
                <button className=" w-auto h-auto rounded p-2 bg-green-600 text-white text-[16px] text-center bg-blue-300 border-b border-2  m-2" onClick={handleCreate}>
                  create product
                </button>
              </div>
              </div>
          </section>
    </AdminMenu>
  );
};

export default CreateProduct;
