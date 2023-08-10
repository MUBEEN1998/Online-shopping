import axios from 'axios';
import Layout from '../components/Layout/Layout'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const ProductDetails = () => {
    const  params=useParams();
    const [products,setProducts]=useState([]);
    const [similarproduct,setSimilarproduct]=useState([]);

    useEffect(()=>{
        if(params?.slug)getproduct();
    },[params.slug])
    const getproduct=async()=>{
        try{
            const {data}=await axios.get(`/api/v1/products/single-product/${params.slug}`)
            setProducts(data?.product)
            relatedProduct(data?.product?._id,data?.product?.category?._id)
            console.log(products);
        }catch(error){
            console.log(error)
        }
    }
    const relatedProduct=async(pid,cid)=>{
        try{
            const {data} = await axios.get(`/api/v1/products/related-product/${pid}/${cid}`)
            setSimilarproduct(data?.product)
            console.log(data?.product)
        }catch(error){
            console.log(error)

        }
    }
  return (
    <Layout>
    <div className='mt-20'>
            <div className='w-full grid grid-cols-1 md:grid-cols-2 p-4   h-[50vh]'>
                    <div className='w-full '>
                        <img className='m-auto h-1/2' src={`/api/v1/products/product-photo/${products._id}`}/>
                    </div>
                    <div className='w-full  py-4 h-4/5  '>
                    <h1 className='text-red-600 text-2xl font-bold '>PRODUCTS DETAILS</h1>

                        <h1 className='text-gray-600 text-xl font-bold '>Name:{products.name}</h1>
                        <p className='text-[14px] text-gray-400'>Description:{products.description}</p>
                        <p className='text-[16px] font-bold'>Price:{products.price}</p>
                        <p className='text-[16px] font-bold'>Category:{products?.category?.name}</p>
                        <div className=' w-full'>
                            <button className= ' w-1/2 p-2 bg-yellow-300 text-white text-[14px]'>ADD TO CART</button>
                        </div>
                        
                    </div>

                    
            </div>  

            <div className='w-full '>
                
            <span className=''><h1 className='text-2xl bg-gray-200   '>Similar Products</h1>
            {similarproduct.length <1 &&(<h6 className='text-center'>No similar projects</h6>)}
           </span>
           


            <div className=' p-2 grid grid-cols-1  gap-2 md:grid-cols-3  '>

                
      {similarproduct?.map((c) => {

return (
  // <Link key={c._id}
  //   to={`/dashboard/admin/product/${c.slug}`}
  //   className="product-link">

    <div className="w-[80%] pb-4 divide-slate-200 border-2 rounded bg-white overflow-hidden shadow-lg hover:shadow-2xl ease-in duration-200 ease-out duration-200 " key={c._id}>
      <img className="w-1/2 m-auto h-[250px] " src={`/api/v1/products/product-photo/${c._id}`} alt="Sunset in the mountains" />
      <div className="pt-4 px-2">
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
      <button class=" w-auto bg-red-600  text-white font-bold py-2 px-2 " >
  More Details
  </button>
  <button class=" w-auto bg-yellow-600 text-white font-bold py-2 px-2 ">
  ADD TO CART
  </button>
      </div>
      
</div>
    // </Link>



)})}

      </div>

      </div>

    </div>
    </Layout>
  )
}

export default ProductDetails