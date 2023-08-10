import React, { useState, useEffect } from "react";
import Layout from "./../../components/Layout/Layout";
import AdminMenu from "./../../components/Layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";
const { Option } = Select;

const UpdateProduct = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState("");
  const [id, setId] = useState("");

  //get single product
  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/products/single-product/${params.slug}`
      );
      setName(data.product.name);
      setId(data.product._id);
      setDescription(data.product.description);
      setPrice(data.product.price);
      setPrice(data.product.price);
      setQuantity(data.product.quantity);
      setShipping(data.product.shipping);
      setCategory(data.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getSingleProduct();
    //eslint-disable-next-line
  }, []);
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

  //update product function
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      photo && productData.append("photo", photo);
      productData.append("category", category);
      const { data } = axios.put(
        `/api/v1/products/update-product/${id}`,
        productData
      );
      if (data?.success) {
        toast.error(data?.message);
      } else {
        toast.success("Product Updated Successfully");
        navigate("/dashboard/admin/products");
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };

  //delete a product
  const handleDelete = async () => {
    try {
      let answer = window.prompt("Are You Sure want to delete this product ? ");
      if (!answer) return;
      const { data } = await axios.delete(
        `/api/v1/products/delete-product/${id}`
      );
      toast.success("Product DEleted Succfully");
      navigate("/dashboard/admin/products");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  return (
    
    <AdminMenu >
      <section>
          <div classname=" w-full bg-[#F5F5F5]">
            <h1 className="text-2xl block p-2 m-2   text-center  mt-20"> Update  Product</h1>

            <div className="  w-4/5 grid grid-cols-1 md:grid-cols-2">
            <div className="w-full h-auto p-2 ">

              <div className="w-full ">
              <div className="w-full">
              <Select
                bordered={false}
                placeholder="Select a category"
                size="large"
                showSearch
                className="form-select bg-white border-2 rounded border-gray-300  w-full"
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

          <div className="form-control w-full bg-white border-2 rounded border-gray-300 p-2  m-2 ">
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
              <div className="mb-3 ">
                {photo ? (
                  <div className=" w-40 bg-red-200 justify-items-center text-center  ">
                    <div className="w-auto">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="product_photo"
                      height={"200px"}
                      weight={"200px"}
                      className="img img-responsive"
                    />
                    </div>
                  </div>
                ) : (
                  <div className="text-center justify-items-center ">
                    <div >
                    <img
                      src={`/api/v1/products/product-photo/${id}`}
                      alt="product_photo"
                      height={"200px"}
                      weight={"200px"}
                      className="img img-responsive"
                    />
                    </div>
                  </div>
                )}
              </div>
            <div className="  w-4/5  gap-4 grid grid-cols-1 md:grid-cols-2">

              <div className="form-control w-full m-2 ">
                <input
                  type="text"
                  value={name}
                  placeholder="write a name"
                  className="form-control w-full  bg-white border-2 rounded border-gray-300 p-2"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="form-control w-full m-2 ">
                <textarea
                  type="text"
                  value={description}
                  placeholder="write a description"
                  className=" w-full form-control bg-white border-2 rounded border-gray-300 p-2"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
                  
              </div> 

            <div className="  w-4/5 grid gap-4 grid-cols-1 md:grid-cols-2">

              <div className="form-control w-full m-2 ">
                <input
                  type="number"
                  value={price}
                  placeholder="write a Price"
                  className=" w-full form-control bg-white border-2 rounded border-gray-300 p-2"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="form-control w-full m-2  shadow-md">
                <input
                  type="number"
                  value={quantity}
                  placeholder="write a quantity"
                  className=" w-full form-control bg-white border-2 rounded border-gray-300 p-2"
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
                  className=" w-full form-select bg-white border-2 rounded border-gray-300 p-2 mb-3"
                  onChange={(value) => {
                    setShipping(value);
                  }}
                >
                  <Option value="0">No</Option>
                  <Option value="1">Yes</Option>
                </Select>
              </div>
              <div className="flex">
              <div className="mb-3">
                <button className=" w-auto h-auto p-2 text-[14px] text-center rounded bg-green-600  text-white m-2" onClick={handleUpdate}>
                  update product
                </button>
              </div>
              <div className="mb-3">
                <button className=" w-auto h-auto p-2 text-[14px] rounded text-center bg-red-600 text-white  m-2" onClick={handleDelete}>
                  delete product
                </button>
              </div>
              </div>
              </div>
              
          </section>
    </AdminMenu>


  );
};

export default UpdateProduct;
