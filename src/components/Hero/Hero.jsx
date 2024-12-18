// import React from "react";
// import bootstrapThemes from '../../assets/bootstrapThemes.png'

// export default function Hero(){

//     return (
//         <div className="container col-xxl-8 px-4 py-5">
//     <div className="row flex-lg-row-reverse align-items-center g-5 py-5">
//       <div className="col-10 col-sm-8 col-lg-6">
//         <img src={bootstrapThemes} className="d-block mx-lg-auto img-fluid" alt="Bootstrap Themes" width="700" height="500" loading="lazy"/>
//       </div>
//       <div className="col-lg-6">
//         <h1 className="display-5 fw-bold text-body-emphasis lh-1 mb-3">Responsive left-aligned hero with image</h1>
//         <p className="lead">Quickly design and customize responsive mobile-first sites with Bootstrap, the world’s most popular front-end open source toolkit, featuring Sass variables and mixins, responsive grid system, extensive prebuilt components, and powerful JavaScript plugins.</p>
//         <div className="d-grid gap-2 d-md-flex justify-content-md-start">
//           <button type="button" className="btn btn-primary btn-lg px-4 me-md-2">Primary</button>
//           <button type="button" className="btn btn-outline-secondary btn-lg px-4">Default</button>
//         </div>
//       </div>
//     </div>
//   </div>
//     )
// }

import React, { useEffect } from "react";
import bootstrapThemes from '../../assets/bootstrapThemes.png'
import Login from "../Login/Login";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Hero() {
  
  const isLoggedIn = useSelector(state => state.auth.status);
  const navigate = useNavigate();
  return (
    <div className="container col-xxl-8 px-4 py-5">
      <div className="row flex-lg-row-reverse align-items-center g-5 py-5">
        
        {/* Image Section */}
        <div className="col-10 col-sm-8 col-lg-6">
          {/* <img src={bootstrapThemes} className="d-block mx-lg-auto img-fluid rounded-3 shadow-lg" alt="Bootstrap Themes" width="700" height="500" loading="lazy"/> */}
          {
            isLoggedIn ? (
              <img
                src={bootstrapThemes}
                className="d-block mx-lg-auto img-fluid rounded-3 shadow-lg"
                alt="Bootstrap Themes"
                width="700"
                height="500"
                loading="lazy"
              />
            ) : (
              <Login/>
            )
          }
        </div>

        {/* Text Section */}
        <div className="col-lg-6">
          <h1 className="display-4 fw-bold text-dark mb-4">
            Empower Your Connections
          </h1>
          <p className="lead text-muted mb-4">
            Join millions of people on the world’s most popular social platform. Stay connected, share your experiences, and explore exciting new possibilities.
          </p>
          
          <div className="d-grid gap-2 d-md-flex justify-content-md-start">
            {/* Primary Button */}
            <button type="button" className="btn btn-primary btn-lg px-4 me-md-3 shadow-sm" onClick={()=> navigate('/signup')}>
              Join Now
            </button>
            
            {/* Secondary Button */}
            <button type="button" className="btn btn-outline-primary btn-lg px-4 shadow-sm">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}