import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './style/index.css'
import { RouterProvider, } from 'react-router/dom'
import { createBrowserRouter } from 'react-router-dom'
import App from './view/App'
import InsertOne from './view/InsertOne'


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/insertOne',
    element: <InsertOne />,
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
