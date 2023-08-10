import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout'
// import { useAuth } from '../context/auth'
// import { json } from 'react-router-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import axios from 'axios';
import {  useNavigate } from 'react-router-dom';
import { Checkbox, Radio } from 'antd';
import { Prices } from '../components/Prices';
import { useCart } from '../context/Cart';
import { toast } from 'react-hot-toast';
import ReactLoading from 'react-loading';
import {Badge} from 'antd'
import Footer from '../components/Layout/Footer';
const Home = () => {
  const [cart,setCart]=useCart();
  // const [auth, setAuth] = useAuth();
  const navigate = useNavigate()
  const [products,setProducts]=useState([]);
  const [categories,setCategories]=useState([]);
  const [checked,setChecked]=useState([]);
  const [radio,setRadio]=useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

 

  const getallproducts=async()=>{
    try{
      const {data}=await axios.get(`/api/v1/products//product-list/${page}`);
      if(data.success){
        setProducts(data?.product)
        console.log(products);
      }
    }catch(error){
      console.log(error);
    }

  }
  
  //===========================paginations==========================
  useEffect(()=>{
    getTotal();
  })
    //getTOtal COunt
    const getTotal = async () => {
      try {
        const { data } = await axios.get("/api/v1/products/product-count");
        setTotal(data?.total);
      } catch (error) {
        console.log(error);
      }
    };
  
    useEffect(() => {
      if (page === 1) return;
      loadMore();
    }, [page]);
    //load more
    const loadMore = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`/api/v1/products/product-list/${page}`);
        setLoading(false);
        setProducts([...products, ...data?.product]);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
  const getCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/all-category");
      if (data.success) {
        setCategories(data?.category);
        console.log(categories) // Extract the category data and update the state
        // Extract the category data and update the state
      }
    } catch (error) {
      console.log(error);
    }
  };

useEffect(()=>{
  getCategory();
},[])

useEffect(() => {
  if (!checked.length || !radio.length) getallproducts();
}, [checked.length, radio.length]);

useEffect(() => {
  if (checked.length || radio.length) filterProduct();
}, [checked, radio]);

//===============================funtion filter==================
const handlechecked=(value,id)=>{
let all=[...checked]
if(value){
  all.push(id)
}else{
  all = all.filter(p=>p!==id)
}
setChecked(all)
}
//========================filter products=============
const filterProduct = async () => {
  try {
    const { data } = await axios.post("/api/v1/products/product-filters", {
      checked,
      radio,
    });
    setProducts(data?.produc);
    console.log(products)
  } catch (error) {
    console.log(error);
  }
};
  return (
<>
    <Layout>
      {/* <pre>{JSON.stringify(auth,null,4)}</pre> */}
    

     <div className="flex">
  <aside className="w-52 fixed left-0 top-16 h-screen shadow-md  p-10">
    <p className=" text-[15px]">Filter by categories</p>
    <div className=''>
      {categories.map((p)=>{
        return(
          <Checkbox key={p._id} onChange={(e)=>handlechecked(e.target.checked,p._id)}>{p.name}</Checkbox>
        )
      })}
    </div>
    <div className='mt-8'>
      <div>Filter by Price</div>
    <Radio.Group onChange={(e)=>setRadio(e.target.value)}>

      {Prices.map((b)=>{
        return(
          <div key={b._id} >
          <Radio value={b.array}>{b.name}</Radio>
          </div>
        )
      })}
      </Radio.Group>
      <div className=' mt-2 text-white'>
      <button class=" w-auto bg-red-400 rounded   text-white font-bold py-2 px-2 "
      onClick={()=>window.location.reload()}> Reset filters</button>

      </div>
    </div>
  </aside>
  <main className="flex-1 mt-16 ml-44">
    
    <div className="h-20 ml-8 text-center p-10">
      <h1 className="text-4xl">All Products</h1>
      <h1>{radio}</h1>
      {/* <h1>{JSON.stringify(checked,null,4)}</h1> */}
      {products?(
      <div className='grid grid-cols-1 gap-2 md:grid-cols-3 '>
      {products?.map((c) => {

return (
  // <Link key={c._id}
  //   to={`/dashboard/admin/product/${c.slug}`}
  //   className="product-link">

    <div className="w-[80%] pb-4 rounded bg-white overflow-hidden shadow-lg hover:shadow-2xl ease-in duration-200 ease-out duration-200 " key={c._id}>
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
      <button class=" w-auto bg-red-600  text-white font-bold py-2 px-2 " onClick={()=>navigate(`/product-details/${c.slug}`)}>
  More Details
  </button>
  <button class=" w-auto bg-yellow-600 text-white font-bold py-2 px-2 " onClick={()=>{setCart([...cart,c]);
  localStorage.setItem(
    "cart",
    JSON.stringify([...cart, c])
  );
  toast.success("card added")}}>
  ADD TO CART
  </button>
      </div>
      
</div>
    // </Link>



)})}

      </div>
      ):(<ReactLoading  width={'20%'} />)}
      <div className="m-2 p-3  ">
            {products && products.length < total && (
              <button
                className="border-1 bg-border-gray-200 p-2 "
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? (
                  <ReactLoading  height={'20%'} width={'20%'} />
                ) : (
                  <>
                    {" "}
                    Loadmore 
                  </>
                )}
              </button>
            )}
          </div>
    </div>
    
  </main>
</div>

    
    

 
    </Layout>
    <footer>
        <Footer />
      </footer>
    </>
  )
}

export default Home