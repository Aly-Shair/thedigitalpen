import React from "react";
import logo from '../../assets/logo.png'

export default function Footer(){

    return(
<footer className="container-fluid d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top bg-dark text-light">
    <p className="col-md-4 mb-0 text-light">© 2024 Company, Inc</p>

    {/* <a href="/" className="col-md-4 d-flex align-items-center justify-content-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">
      <svg className="bi me-2" width="40" height="32"><use xlink:href="#bootstrap"></use></svg>
    </a> */}
    <a href="/" className="col-md-4 d-flex align-items-center justify-content-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">
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
    </a>

    <ul className="nav col-md-4 justify-content-end">
      <li className="nav-item"><span className="px-2 text-light">Home</span></li>
      <li className="nav-item"><span className="px-2 text-light">Features</span></li>
      <li className="nav-item"><span className="px-2 text-light">Pricing</span></li>
      <li className="nav-item"><span className="px-2 text-light">FAQs</span></li>
      <li className="nav-item"><span className="px-2 text-light">About</span></li>
    </ul>
  </footer>
    )
}