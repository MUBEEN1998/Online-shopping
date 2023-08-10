
import './App.css';
import { Routes, Route } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Policy from './pages/Policy';
import PageNotfound from './pages/PageNotfound';
import Register from './pages/Auth/Register';
import Login from './pages/Auth/Login';
import Dashboard from './pages/user/Dashboard';
import PrivateRoute from './components/Routes/Private';
import Forgotepassword from './pages/Auth/Forgotpassword'
import AdminRoute from './components/Routes/AdminRoute';
import AdminDashboard from './pages/Admin/AdminDashboard';
import AdminMenu from './components/Layout/AdminMenu';
import Orders from './pages/user/Orders';
import Profile from './pages/user/Profile';
import UserMenu from './components/Layout/UserMenu';
import CreateCetogory from './pages/Admin/CreateCetogory';
import CreateProduct from './pages/Admin/CreateProduct';
import Products from './pages/Admin/Products';
import UpdateProduct from './pages/Admin/UpdateProduct';
import SearchProduct from './pages/SearchProduct';
import ProductDetails from './pages/ProductDetails';
import CartPage from './pages/CartPage';
import CategoryProduct from './pages/CategoryProduct';
import AdminOrders from './pages/Admin/AdminOrders';
function App() {
  return (
    <>
    <Routes>
      <Route path="/" Component={Home}/>
      <Route path="/search" element={<SearchProduct/>} />
      <Route path="/product-details/:slug" element={<ProductDetails/>}/>
      <Route path="/sam" Component={UserMenu}/>
      <Route path="/cart/" element={<CartPage/>}/>
      <Route path="/category/:slug" element={<CategoryProduct />} />

      <Route path="/dashboard" element={<PrivateRoute/>}>
        <Route path="user" element={<Dashboard/>}/>
        <Route path="user/profile" element={<Profile/>}/>
        <Route path="user/orders" element={<Orders/>}/>
        
       
      </Route>
      <Route path="/dashboard" element={<AdminRoute/>}>
        <Route path="admin" element={<AdminDashboard/>}/>
        <Route path="/dashboard/admin/create-category" element={<CreateCetogory/>}/>
        <Route path="/dashboard/admin/create-product" element={<CreateProduct/>}/>
        <Route path="/dashboard/admin/products" element={<Products/>}/>
        <Route path="/dashboard/admin/product/:slug" element={<UpdateProduct />} />
        <Route path="/dashboard/orders" element={<AdminOrders />} />


      </Route>
      <Route path="/register" Component={Register}/>
      <Route path="/login" Component={Login}/>
      <Route path="forgot" Component={Forgotepassword}/>
      <Route path="/about" Component={About}/>
      <Route path="/contact" Component={Contact}/>
      <Route path="/policy" Component={Policy}/>
      <Route path="/*" Component={PageNotfound}/>
    </Routes>
    </>
  );
}

export default App;
