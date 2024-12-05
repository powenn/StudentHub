import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './style/index.css'
import { RouterProvider, } from 'react-router/dom'
import { createBrowserRouter } from 'react-router-dom'
import App from './view/App'
import InsertOne from './view/InsertOne'
import UpdateStudent from './view/UpdateStudent'
import DeleteStudent from './view/DeleteStudent'
import { StudentsProvider } from './context/StudentsContext';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/insertOne',
    element: <InsertOne />,
  },
  {
    path: '/updateStudent',
    element: <UpdateStudent />,
  },
  {
    path: '/deleteStudent',
    element: <DeleteStudent />
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <StudentsProvider>
      <RouterProvider router={router} />
    </StudentsProvider>
  </StrictMode>,
)
