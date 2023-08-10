import React, { useEffect, useState } from 'react'
import AdminMenu from '../../components/Layout/AdminMenu'
import toast from 'react-hot-toast';
import axios from 'axios';
import { Link } from 'react-router-dom';
const Products = () => {
  const [products, setProducts] = useState([]);

  const getallproduct = async () => {
    try {
      const { data } = await axios.get("/api/v1/products/all-product");
      setProducts(data.product)
      console.log(products)
      toast.success("get all product")
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getallproduct();
    console.log(products)
  }, [])
  return (
    <>
      <AdminMenu>
        <div className='mt-16 p-4 bg-[#F5F5F5] h-[100%]'>
          <div className='m-auto  grid md:grid-cols-4 gap-2  grid-cols-1'>
            {products?.map((c) => {

              return (
                <Link key={c._id}
                  to={`/dashboard/admin/product/${c.slug}`}
                  className="product-link">

                  <div className="w-[80%] rounded bg-white overflow-hidden shadow-lg hover:shadow-2xl ease-in duration-200 ease-out duration-200 " key={c._id}>
                    <img className="w-4/5 m-auto h-[200px] " src={`/api/v1/products/product-photo/${c._id}`} alt="Sunset in the mountains" />
                    <div className="pt-4 px-2">
                      <p className=" text-gray-400 text-[18px] text-base">
                      {c.name}
                      </p>  
                    </div>
                    <div className=" text-[14px] px-2  mt-[-16px]">{c.description}</div>
                    <span className="inline-block   py-1 text-sm font-semibold text-black px-2 mb-2">${c.price}</span><span className='
                    text-green-600 px-2 text-[12px]'>80% off</span>
                    <div className=" text-[14px] px-2 ">Free deleviery</div>

      </div>
                  </Link>

 

)})}
                </div>
   </div>
      </AdminMenu>
    </>
  )
}

export default Products