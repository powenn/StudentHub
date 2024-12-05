import { createHashRouter } from "react-router";
import App from '../view/App';

export const router = createHashRouter([
    {
        path: "/",
        element: <App />,
    },
])