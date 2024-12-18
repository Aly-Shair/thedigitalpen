import React, { useEffect, useState } from "react";
import configService from "../../appwrite/config";
import { Link } from "react-router-dom";
import {Button} from "../index"

export default function PostCard({$id, slug, featuredImageId}) {
  const[previewUrl, serPreviewUrl] = useState("");
// console.log(featuredImageId);
useEffect(()=>{
  const fetchUrl = async () => {
    try {
      const Url = configService.getFilePreview(featuredImageId);
      // console.log(previewUrl)
      serPreviewUrl(Url)
      // console.log(Url)
    } catch (error) {

    }
  }
  fetchUrl();
},[])

  return (
    //   <div className="card shadow-sm">
    //   <img src={previewUrl} className="card-img-top" alt={slug} width="100%" height="225" />
    //   <div className="card-body">
    //     <h3 className="card-text">{slug}.</h3>
    //     <div className="d-flex justify-content-between align-items-center">
    //       <div className="btn-group">
    //         {/* <Link to={''}> */}
    //             <button type="button" className="btn btn-sm btn-outline-secondary">View</button>
    //         {/* </Link> */}
            
    //         {/* <Link to={''}>
    //             <Button
    //                 value = 'Edit'
    //             />
    //         </Link> */}
    //         <button type="button" className="btn btn-sm btn-outline-secondary">Edit</button>
    //       </div>
    //       <small className="text-body-secondary">9 mins ago</small>
    //     </div>
    //   </div>
    // </div>
    <div className="card shadow-sm h-100 my-2 w-100 p-4">
      {previewUrl && (
        <img
          src={previewUrl}
          className="card-img-top"
          alt={slug}
          style={{ height: "200px", objectFit: "cover" }}
        />
      )}
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{slug}</h5>
        <div className="mt-1">
          <div className="btn-group">
            <Link to= {`/post/${$id}`}  >
                 <Button
                     value = 'View'
                     type="button" 
                     className="btn-outline-secondary btn-sm "
                 />
             </Link>
            {/* <button type="button" className="btn btn-sm btn-outline-secondary mx-2">
              Edit
            </button> */}
          </div>
          {/* <small className="text-muted d-block mt-2">9 mins ago</small> */}
        </div>
      </div>
    </div>

  );
}
