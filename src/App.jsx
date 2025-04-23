
import { Outlet } from 'react-router-dom'
import './App.css'
import Navbar from './componets/Navbar'
import Footer from './componets/Footer'

function App() {

  return (
    <>
    <Navbar/>
    <Outlet/>
    <Footer/>
    </>
    
  )
}

export default App
