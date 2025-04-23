import React, { useState  } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import CartModel from '../pages/shop/CartModel';
import avaterImg from '../assets/avatar.png'
import { useLogoutUserMutation } from '../redux/features/auth/authApi';
import { logout } from '../redux/features/auth/authSlice';

const Navbar = () => {

  const products = useSelector((state) => state.cart.products);
  const [isCartOpen, setisCartOpen]= useState(false);
  const handlecartToggle = () => {
    setisCartOpen(!isCartOpen)
  }
  
  // show user if logged in
  const dispatch = useDispatch();
  const {user} = useSelector((state) => state.auth);
  const [logoutUser] = useLogoutUserMutation ();
  const navigate = useNavigate();
  
// drop down menus
const [isDropDownOpen, setIsDropDownOpen] = useState(false);
const handleDropDownToggle = () =>{
  setIsDropDownOpen(!isDropDownOpen)
}

// admin dropdown menu
const adminDropDownMenus = [
  {label: "Dasboard", path: "/dashboard/admin"},
  {label: "Manage Items", path: "/dashboard/manage-products"},
  {label: "All Orders", path: "/dashboard/manage-orders"},
  {label: "Add Product", path: "/dashboard/add-product"},
]

//user dropdown menu
const userDropDownMenus = [
  {label: "Dasboard", path: "/dashboard"},
  {label: "Profile", path: "/dashboard/profile"},
  {label: "Payments", path: "/dashboard/payments"},
  {label: "Orders", path: "/dashboard/orders"},
]

const dropdownMenus = user ?.role === 'admin' ? [...adminDropDownMenus] : [...userDropDownMenus]

const handleLogout = async () => {
  try {
    await logoutUser().unwrap();
    dispatch(logout())
  } catch (error) {
    console.error("failed to logout",error)
  }
}

  return (
    <header className='fixed-nav-bar w-bar'>
      <nav className='max-2xl mx-auto px-4 flex justify-between items-center'>
        <ul className='nav__links'>
          <li className='link'><Link to="/">Home</Link></li>
          <li className='link'><Link to="/shop">Shop</Link></li>
          <li className='link'><Link to="/">Pages</Link></li>
          <li className='link'><Link to="/Contact">Contact</Link></li>
        </ul>


        {/*logo*/}
        <div className='nav__logo'>
          <Link to="/">ByteCart</Link><span>.</span>
        </div>

        {/*nav icons*/}
        <div className='nav__icons relative'>
          <span>
            <Link to='/search'>
              <i className="ri-search-line"></i>
            </Link>
          </span>
          <span>
            <button onClick={handlecartToggle} className='hover:text-primary'>
              <i className="ri-shopping-bag-line"></i>
              <sup className='text-sm inline-block px-1.5 text-white 
               rounded-full bg-primary'>{products.length}</sup>
            </button>
          </span>
          <span>
             {
              user && user ? (<>
              <img 
              onClick={handleDropDownToggle}
              src={user?.profileImage || avaterImg} alt="" className='size-6 rounded-full cursor-pointer' />
              {
                isDropDownOpen && (
                  <div className='absolute right-0 mt-3 p-4 w-48 bg-white border border-gray-200
                  rounded-lg shadow-lg z-50'>
                    <ul className='font-medium space-y-4 p-2'>
                      {dropdownMenus.map((menu, index) =>(
                        <li key={index}>
                          <Link 
                          onClick={() => setIsDropDownOpen(false)}
                          className='dropdown-items' to={menu.path}>{menu.label}</Link>
                        </li>
                      ))}
                      <li><Link
                      onClick={handleLogout} 
                      className='dropdown-items'>Logout</Link></li>
                    </ul>
                  </div>
                )
              }
               
              </>) : (
                <Link to='login'>
                <i className="ri-user-line"></i>
              </Link>
              )
              
            }
           
          </span>
        </div>


      </nav>
      {
      isCartOpen && <CartModel products={products} isOpen={isCartOpen} onclose={handlecartToggle}/>
      }
      

    </header>
  )
}

export default Navbar
