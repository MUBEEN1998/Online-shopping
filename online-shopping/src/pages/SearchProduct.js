import React from 'react'
import { useSearch } from '../context/search';

import Layout from '../components/Layout/Layout';
const SearchProduct = () => {
  const [values, setValues] = useSearch();

  return (
    
<Layout>
    <div className=' mt-24 '>

  <div className="text-center">
    <h1 className="text-4xl font-bold">Search Results</h1>
    <h6>
      {values?.results.length < 1
      ? "No Products Found"
      : `Found ${values?.results.length}`}
    </h6>
</div>
<div className="w-full p-4   grid grid-cols-1 md:grid-cols-4 mt-4">
      {values?.results.map((p) =>(
      <div key="{p._id}" className=' w-4/5 hover:shadow-xl border-1 p-2 bg-border-gray-100 gap-4'>
        <img src={`/api/v1/products/product-photo/${p._id}`} className="w-full  h-[250px]" alt="{p.name}" />
        <div className="px-1 py-4">
          <h5 className="font-bold text-gray-400 text-[16px] mb-2">{p.name}</h5>
          <p className="text-gray-700 text-[14px]">{p.description.substring(0, 30)}...</p>
          <p className="text-gray-800 text-[14px] font-bold ">$ {p.price}</p>
        </div>
        <div className="p-2 flex gap-4 ">
         <div> <button className="bg-red-600 text-white p-2 ">More Details</button></div>
         <div> <button className="bg-yellow-600 text-white p-2 ">Add To Cart</button></div>
          
        </div>
      </div>
      ))}
    </div>
    </div>
{/* <div className="mt-80 bg-red-100">
      <div className="w-4/5 grid grid-cols-1 md:grid-cols-3 mt-40">
      {values?.results.map((p) =>(
      <div key="{p._id}" className="w-4/5 h-40">
        <img src={`/api/v1/products/product-photo/${p._id}`} className="w-1/4 h-[250px]" alt="{p.name}" />
        <div className="px-6 py-4">
          <h5 className="font-bold text-xl mb-2">{p.name}</h5>
          <p className="text-gray-700 text-base">{p.description.substring(0, 30)}...</p>
          <p className="text-gray-800 font-bold mt-2">$ {p.price}</p>
        </div>
        <div className="px-6 py-2">
          <button className="btn-primary mr-2">More Details</button>
          <button className="btn-secondary">ADD TO CART</button>
        </div>
      </div>
      ))}
    </div>
  </div>
</div> */}

        </Layout>

    
  )
}

export default SearchProduct