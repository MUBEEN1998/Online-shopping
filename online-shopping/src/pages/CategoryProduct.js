import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useCart } from "../context/Cart";
import toast from "react-hot-toast";
const CategoryProduct = () => {
  const params = useParams();
  const [cart,setCart]=useCart();

  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);

  useEffect(() => {
    if (params?.slug) getPrductsByCat();
  }, [params?.slug]);
  const getPrductsByCat = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/products/product-category/${params.slug}`
      );
      setProducts(data?.product);
      setCategory(data?.category);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="mt-16 category items-center justify-between p-auto  bg-gray-200">
        <h1 className="text-center mt-2 font-bold text-2xl text-red-800 ">{category?.slug}</h1>
      <div className='p-4 grid  grid-cols-1 gap-2 md:grid-cols-3 '>
      {products?.map((c) => {

return (
  // <Link key={c._id}
  //   to={`/dashboard/admin/product/${c.slug}`}
  //   className="product-link">

    <div className="w-[60%] p-2 pb-4 rounded bg-white overflow-hidden shadow-lg hover:shadow-2xl ease-in duration-200 ease-out duration-200 " key={c._id}>
      
      <img className="w-full m-auto h-[250px]
       " src={`/api/v1/products/product-photo/${c._id}`} alt="Sunset in the mountains" />
      <div className="pt-4 px-2 ">
        <p className=" text-gray-400 text-start text-[18px] text-base">
        {c.name}
        </p>  
      </div>
      <div className=" text-[14px] px-2 text-start  mt-[-16px]">{c.description}</div>
      <div className='flex gap-2'>
      <span className=" text-start font-semibold  text-black px-2 mb-2">${c.price}</span><span className='
      text-green-600 px-2 text-[12px]'>80% off</span>
      </div>
      <div className=" text-[14px] px-2 flex gap-4 px-auto ">
      <button class=" w-auto bg-red-600  text-white rounded font-bold py-2 px-2 " onClick={()=>navigate(`/product-details/${c.slug}`)}>
  More Details
  </button>
  <button class=" w-auto bg-yellow-600 text-[14px ] rounded text-white font-bold py-2 px-2 " onClick={()=>{setCart([...cart,c]);
  localStorage.setItem(
    "cart",
    JSON.stringify([...cart, c])
  );
  toast.success("card added")}}>
  Add To Cart
  </button>
      </div>
      
</div>
    // </Link>



)})}

      </div>

      </div>
    </Layout>
  );
};

export default CategoryProduct;
