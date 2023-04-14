import React from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainPage from './main';

const router = createBrowserRouter([
  {
    path: '*',
    element: <MainPage />
  }
]);

export function RouterPage() {
  return <RouterProvider router={router}></RouterProvider>;
}
