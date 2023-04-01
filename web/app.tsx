import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: '/',
    element: <div>Hello World</div>,
  },
]);

const App: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default App;
