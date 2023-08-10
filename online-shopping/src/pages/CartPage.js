import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout'
import { useAuth } from '../context/auth'
import { useCart } from '../context/Cart';
import { useNavigate } from 'react-router-dom';
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";
import toast from "react-hot-toast"

const CartPage = () => {
  const navigate=useNavigate();
  const [auth,setAuth]=useAuth();
  const [cart,setCart]=useCart();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading,setLoading]=useState(false)
  const [quantityp,setQuantityp]=useState(1);
  const total=0;

console.log(quantityp)
  const updateCartItemQuantity = (pid, newQuantity) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      if (index !== -1) {
        myCart[index].quantity = newQuantity;
        setCart(myCart);
        localStorage.setItem("cart", JSON.stringify(myCart));
      }
    } catch (error) {
      console.log(error);
    }
  };
//=======================================
  const totalPrice = () => {
    try {
      let totalPrice = 0;
      cart?.forEach((item) => {
        totalPrice += item.price * item.quantity;
      });
      return totalPrice.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    } catch (error) {
      console.log(error);
    }
  };

  //detele item
  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };
useEffect(()=>{
  totalPrice();
},[total])


  //get payment gateway token
  const getToken = async () => {
    try {
      const { data } = await axios.get("/api/v1/products/braintree/token");
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getToken();
  }, [auth?.token]);

  //handle payments
  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post("/api/v1/products/braintree/payment", {
        nonce,
        cart,
      });
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/orders");
      toast.success("Payment Completed Successfully ");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <Layout>
    <div className='mt-24 p-4'>
      <h1 className='font-bold text-gray-400 p-2'>{`Shopping cart${auth?.token && auth?.user.name}`}</h1>
      {cart?.length >1 ?`you have ${cart?.length}items in your cart${auth?.token?"":
        "please login to checkout"}`:'your cart in empty'}
        
    <div className='flex mt-10 shadow-md'>
      <div className='w-3/5 h-auto py-2 grid-cols-2 md:grid-cols-1 bg-white'>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-2 '>
          <div className=' text-center text-gray-400 text-[14px] h-4  '>Product Details</div>
          <div className=' text-center text-gray-400 text-[14px]  h-4 '>Quantity</div>
          <div className='text-center text-gray-400 text-[14px] h-4 '>Price</div>
          <div className=' text-center text-gray-400 text-[14px] h-4 '>Total</div>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-2 '>
          {cart.map((p)=>{
            return(
              <>
              <div className='flex text-center gap-2 text-gray-400 text-[14px] p-4 h-32  '>
      <div><img className="w-full m-auto h-full " src={`/api/v1/products/product-photo/${p._id}`} 
      alt="Sunset in the mountains" /></div>
      <div  className='pt-4'>
        <p className='text-[12px] '>{p.name}</p>
        <p className='text-[12px]'>${p.price}</p>
        <p className='text-[12px]'><button className='p-1 bg-red-600 rounded text-white text=[12px]' onClick={()=>removeCartItem(p._id)}>
          remove</button></p>
      </div>

      </div>
              <div className='flex gap-4 text-center m-auto  text-gray-400 text-[14px] justify-items-center h-4  '>
                <span className='block' onClick={() => updateCartItemQuantity(p._id, p.quantity - 1)}>-</span>
                <span   className='block border-1 '>{p.quantity}</span>
                <span className='block' onClick={() => updateCartItemQuantity(p._id, p.quantity + 1)}>+</span>
              </div>
              <div className='text-center text-gray-400 m-auto text-[14px] h-4 '>{p.price}</div>
              <div className=' text-center text-gray-400 m-auto text-[14px] h-4 '>{p.price*p.quantity}</div>
              </>
            )
          })}
        

        </div>

      </div>
      <div className='w-2/5 h-auto bg-gray-400 p-4'>
        <div className='text-center font-bold text-2xl text-white'>Order Summery</div>
        <div className='h-4 text-white py-2 '>Total | checkout | Payment </div>
        <hr className='w-2 bg-gray-200 '/>
        <div className='grid grid-cols-2 '>
          <div className='p-2 py-4 text-red-600'>Items:{cart?.length}</div>
          <div className='p-2 py-4 text-red-600'>{totalPrice()}</div>
        </div>
        
         {auth?.user?.address ?(
          <>
          <div className='m-2'>
            <h2>Current Address</h2>
            <h5>{auth?.user?.address}</h5>
            <button className='px-2 py-1  text-white bg-yellow-400' onClick={()=>navigate("/dashboard/user/profile")}>
              Update Adress
            </button>
          </div>
          </>
         ):(
          <div className='m-2'>
            {auth?.token ?(
              <button className='px-2 py-1 text-white bg-yellow-400' onClick={()=>navigate("/dashboard/user/profile")}>
                Update Adress
              </button>
            ):
            (
              <button className='px-2 py-1 text-white bg-yellow-400' onClick={()=>{
                navigate("/login",{
                  state:"/cart"
                })
              }}>Please login to checkout</button>
            )
            }
          </div>
         )}   
      <div className='w-full p-4  '></div>
      {!clientToken || !auth?.token || !cart?.length ? (
                  ""
                ) : (
                  <>
                    <DropIn
                      options={{
                        authorization: clientToken,
                        paypal: {
                          flow: "vault",
                        },
                      }}
                      onInstance={(instance) => setInstance(instance)}
                    />

                    <button
                      className=" bg-blue-600 text-white rounded p-2"
                      onClick={handlePayment}
                      disabled={loading || !instance || !auth?.user?.address}
                    >
                      {loading ? "Processing ...." : "Make Payment"}
                    </button> 
                  </>
                )}
 
      </div>
    </div>

    </div>
    </Layout>
  )
}

export default CartPage