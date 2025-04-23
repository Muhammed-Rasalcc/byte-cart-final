import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import Home from '../pages/home/Home'
import CategoryPage from "../pages/category/CategoryPage"
import Search from "../pages/search/Search"
import ShopPage from '../pages/shop/ShopPage'
import SingleProduct from "../pages/shop/productdetails/SingleProduct"
import Login from '../componets/Login'
import Register from '../componets/Register'
import PaymentSuccess from '../componets/PaymentSuccess'
import DashboardLayout from '../pages/dashboard/DashboardLayout'
import PrivateRoute from './PrivateRouter'
import UsersDmain from '../pages/dashboard/user/dashboard/UsersDmain'
import UserOrders from '../pages/dashboard/user/UserOrder'
import OrderDetails from '../pages/dashboard/user/OrderDetails'
import UserPayments from '../pages/dashboard/user/UserPayments'
import UserReviews from '../pages/dashboard/user/UserReviews'
import UserProfile from '../pages/dashboard/user/UserProfile'
import AdminDMain from '../pages/dashboard/admin/dashboard/AdminDmain'
import AddProduct from '../pages/dashboard/admin/addproduct/AddProduct'
import ManageProduct from '../pages/dashboard/admin/mangeProduct/MangeProduct'
import UpdateProduct from '../pages/dashboard/admin/mangeProduct/UpdateProduct'
import ManageUser from '../pages/dashboard/admin/users/MangeUser'
import ManageOrders from '../pages/dashboard/admin/manageOrders/ManageOrders'

const Router = createBrowserRouter([
    {
        path: '/',
        element: <App/>,
        children: [
            {path: '/', element: <Home/>},
            {path: '/categories/:categoryName', element: <CategoryPage/>},
            {path: '/search', element: <Search/>},
            {path: '/shop', element: <ShopPage/>},
            {path: '/shop/:id', element: <SingleProduct/>},
            {
                path:'/success', element:<PaymentSuccess/>
            },
            {
                path:'/orders/:orderId',
                element:<OrderDetails/>
            }
        ]
    },
    {
        path: '/login',
        element: <Login/>
    },
    {
        path: '/register',
        element: <Register/>
    },
    // dashboard routes start here
    {
        path:'/dashboard',
        element:<PrivateRoute><DashboardLayout/></PrivateRoute>,
        children:[
            //user routes
            {path:'', element:<UsersDmain/>},
            {path:'orders', element:<UserOrders/>},
            {path:'payments', element:<UserPayments/>},
            {path:'profile', element:<UserProfile/>},
            {path:'reviews', element:<UserReviews/>},

            // admin routes (accesiable only for admin) todo : privte routes
            {
                path:'admin', 
                element:<PrivateRoute role='admin'><AdminDMain/></PrivateRoute>
            },
            {
                path:'add-product', 
                element:<PrivateRoute role='admin'><AddProduct/></PrivateRoute>
            },
            {
                path:'manage-products', 
                element:<PrivateRoute role='admin'><ManageProduct/></PrivateRoute>
            },
            {
                path:'update-product/:id',
                element:<PrivateRoute role='admin'><UpdateProduct/></PrivateRoute>
            },
            {
                path:'users',
                element:<PrivateRoute role='admin'><ManageUser/></PrivateRoute>
            },
            {
                path:'manage-orders', 
                element:<PrivateRoute role='admin'><ManageOrders/></PrivateRoute>
            },

        ]
    }
])
  

export default Router
