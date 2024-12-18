import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import {Home, AllPosts, AddPost, Login, Signup, Post, EditPost} from './pages/index.js'

import AuthLayout from './AuthLayout/AuthLayout.jsx';

import store from './store/store.js';
import { Provider } from 'react-redux';

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <App />,
//     children: [
//       {
//         path: "/",
//         element: <Home/>
//       },
//       {
//         path: "/all-posts",
//         element: <AllPosts/>
        
//       },
//       {
//         path: "/add-post",
//         element: <AddPost/>
//       },
//       {
//         path: "/login",
//         element:<Login/>
//       },
//       {
//         path: "/signup",
//         element:<Signup/>
      
//       },
//     ],
//   },
// ]);
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: (
          <AuthLayout authentication={true}>
            <Home/>
          </AuthLayout>
        ),
      },
      {
        path: "/all-posts",
        element: (
          <AuthLayout>
            <AllPosts/>
          </AuthLayout>
        ),
      },
      {
        path: "/add-post",
        element: (
          <AuthLayout>
            <AddPost/>
          </AuthLayout>
        )
      },
      {
        path: "/login",
        element:(
          <AuthLayout authentication={true}>
            <Login/>
          </AuthLayout>
        ),
      },
      {
        path: "/signup",
        element: (
          <AuthLayout authentication = {true}>
            <Signup/>
          </AuthLayout>
        ),
      },
      {
        path: "/post/:id",
        element: (
          <AuthLayout>
            <Post/>
          </AuthLayout>
        ),
      },
      {
        path: "/edit-post/:id",
        element: (
          <AuthLayout>
            <EditPost/>
          </AuthLayout>
        ),
      }
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  </StrictMode>,
)
