import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom"
// import {Logo} from '../index'
import logo from '../../assets/logo.png'
import { useSelector } from "react-redux";
import LogoutBtn from './LogoutBtn'



export default function Header() {
    
    const authStatus = useSelector(state => state.auth.status)

    const navigate = useNavigate();

    const location = useLocation();


    const navItems = [ 
        {
            name: 'Home',
            slug: '/',
            active: true,
            isCurrPage: location.pathname === '/'
        },
        {
            name: 'Login',
            slug: '/login',
            active: !authStatus,
            isCurrPage: location.pathname === '/login'
        },
        {
            name: 'Signup',
            slug: '/signup',
            active: !authStatus,
            isCurrPage: location.pathname === '/signup'
        },
        {
            name: 'All Posts',
            slug: '/all-posts',
            active: authStatus,
            isCurrPage: location.pathname === '/all-posts'
        },
        {
            name: 'Add Post',
            slug: '/add-post',
            active: authStatus,
            isCurrPage: location.pathname === '/add-post'
        }
    ]

    return(
        <header className="container-fluid d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom bg-dark">
      <div className="col-md-3 mb-2 mb-md-0">
        {/* <Link to={'/'}>
            Logo
        </Link> */}
        <img 
    src={logo} 
    alt="logo" 
    style={{
      width: "50px",
      height: "50px",
      borderRadius: "50%",
      border: "3px solid white", // adds a white border around the circle
      objectFit: "cover" // ensures the image fits well within the circular shape
    }}
  />
      </div>

      <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
        {
            navItems.map((item) => item.active? (
                <button
                key={item.name}
                    className={`btn btn-dark ${item.isCurrPage?"text-info":"text-light"}`}
                    onClick={()=> navigate(item.slug)}
                >
                    {item.name}
                </button>
            ):null)
        }
      </ul>

      

      <div className="col-md-3 text-end">
        {
            authStatus && <LogoutBtn
            className="btn btn-outline-secondary me-2 text-light"
            />
        }
        {/* <button type="button" className="btn btn-outline-secondary me-2 text-light">Login</button> */}
        {/* <button type="button" className="btn btn-outline-secondary me-2 text-light">Login</button> */}
        {/* <button type="button" className="btn btn-secondary">Sign-up</button> */}
        {/* Here Add Logout Btn */}
      </div>
    </header>
    )
}