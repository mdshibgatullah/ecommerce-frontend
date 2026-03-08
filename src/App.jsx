import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './components/Home' 
import Shop from './components/Shop'
import Product from './components/Product'
import Cart from './components/Cart'
import Checkout from './components/Checkout'
import Login from './components/admin/Login'
import {default as AdminRegister} from './components/admin/Register'
import { ToastContainer, toast } from 'react-toastify';
import Dashboard from './components/admin/Dashboard'
import { AdminRequireAuth } from './components/admin/AdminRequireAuth'

import {default as ShowCategoies} from './components/admin/category/Show'
import {default as CreateCategory} from './components/admin/category/Create'
import {default as EditCategory} from './components/admin/category/Edit'

import {default as ShowBrand} from './components/admin/brand/Show'
import {default as CreateBrand} from './components/admin/brand/Create'
import {default as EditBrand} from './components/admin/brand/Edit'

import {default as ShowProduct} from './components/admin/product/Show'
import {default as CreateProduct} from './components/admin/product/Create'
import {default as EditProduct} from './components/admin/product/Edit'
import Register from './components/user/Register'
import {default as UserLogin} from './components/user/Login'
import Account from './components/user/Account'
import { RequireAuth } from './components/RequireAuth'
import Confirmation from './components/Confirmation'
import ShowOrders from './components/admin/Orders/ShowOrders'
import OrderDetails from './components/admin/Orders/OrderDetails'
import MyOrders from './components/user/MyOrders'
import OrderDetail from './components/user/OrderDetail'
import Shipping from './components/admin/Shipping/Shipping'
import ForgotPassword from './components/user/ForgotPassword'
import {default as AdminForgotPassword} from './components/user/ForgotPassword'


function App() {


  return (
    <div>
        <BrowserRouter>
        <Routes>
          {/* User route  */}
          <Route path='/' element={<Home />}/>
          <Route path='/shop' element={<Shop />}/>
          <Route path='/product/:id' element={<Product />}/>
          <Route path='/cart' element={<Cart />}/>
          <Route path='/account/register' element={<Register />}/>
          <Route path='/account/login' element={<UserLogin />}/>
          <Route path='/account/forgot-password' element={<ForgotPassword />}/>

          <Route path='/account' element={
            <RequireAuth>
              <Account />
            </RequireAuth>
          }/>

          <Route path='/account/orders' element={
            <RequireAuth>
              <MyOrders />
            </RequireAuth>
          }/>
          
          <Route path='/checkout' element={
            <RequireAuth>
              <Checkout />
            </RequireAuth>
          }/>

          <Route path='/order/confirmation/:id' element={
            <RequireAuth>
              <Confirmation />
            </RequireAuth>
          }/>


          <Route path='/account/orders/details/:id' element={
            <RequireAuth>
              <OrderDetail />
            </RequireAuth>
          }/>
          

        {/* admin route  */}

          <Route path='/admin/login' element={<Login />}/>
          <Route path='/admin/register' element={<AdminRegister />}/>
          <Route path='/admin/forgot-password' element={<AdminForgotPassword />}/>

          <Route path='/admin/dashboard' element={
            <AdminRequireAuth>
              <Dashboard />
            </AdminRequireAuth>
          }/>

          <Route path='/admin/categories' element={
            <AdminRequireAuth>
              <ShowCategoies />
            </AdminRequireAuth>
          }/>


          <Route path='/admin/categories/create' element={
            <AdminRequireAuth>
              <CreateCategory />
            </AdminRequireAuth>
          }/>


          <Route path='/admin/categories/edit/:id' element={
            <AdminRequireAuth>
              <EditCategory />
            </AdminRequireAuth>
          }/>


          {/* brand  */}
          <Route path='/admin/brands' element={
            <AdminRequireAuth>
              <ShowBrand />
            </AdminRequireAuth>
          }/>


          <Route path='/admin/brands/create' element={
            <AdminRequireAuth>
              <CreateBrand />
            </AdminRequireAuth>
          }/>


          <Route path='/admin/brands/edit/:id' element={
            <AdminRequireAuth>
              <EditBrand />
            </AdminRequireAuth>
          }/>



          {/* product  */}
          <Route path='/admin/products' element={
            <AdminRequireAuth>
              <ShowProduct />
            </AdminRequireAuth>
          }/>


          <Route path='/admin/products/create' element={
            <AdminRequireAuth>
              <CreateProduct />
            </AdminRequireAuth>
          }/>


          <Route path='/admin/products/edit/:id' element={
            <AdminRequireAuth>
              <EditProduct />
            </AdminRequireAuth>
          }/>


          <Route path='/admin/orders' element={
            <AdminRequireAuth>
              <ShowOrders />
            </AdminRequireAuth>
          }/>


          <Route path='/admin/orders/:id' element={
            <AdminRequireAuth>
              <OrderDetails />
            </AdminRequireAuth>
          }/>


          <Route path='/admin/shipping' element={
            <AdminRequireAuth>
              <Shipping />
            </AdminRequireAuth>
          }/>


          
          

        </Routes>
        </BrowserRouter>

        <ToastContainer />
    </div>
  )
}

export default App
