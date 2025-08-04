// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import './index.css'
import App from './App.jsx';
import CategoryPage from './page/CategoryPage.jsx';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import BrandPage from './page/BrandPage.jsx';
import ProductPage from './page/ProductPage.jsx';
import StaffPage from './page/StaffPage.jsx';
import AdminPage from './page/AdminPage.jsx';
import RolePage from './page/RolePage.jsx';
import ActionPage from './page/ActionPage.jsx';
import FloorPage from './page/FloorPage.jsx';
import TablePage from './page/TablePage.jsx';
import ReservationPage from './page/ReservationPage.jsx';
import CustomerPage from './page/CustomerPage.jsx';
import LoginPage from './page/LoginPage.jsx';
import PrivateRoute from './page/PrivateRoute.jsx';
import DoashBoardPage from './page/DoashboardPage.jsx';
import CallFoodPage from './page/CallFoodPage.jsx';
import CallFoodComponent from './component/callfood/CallFoodComponent.jsx';
import FoodHadCallComponent from './component/callfood/FoodHadCallComponent.jsx';
import LoginCallFood from './page/LoginCallFood.jsx';
import PrivateRouteCallFood from './page/PrivateRouteCallFood.jsx';
import CallFoodAdminChef from './page/CallFoodAdminChef.jsx';
import CallFoodAdminDelivery from './page/CallFoodAdminDelivery.jsx';
import ClientPage from './page/ClientPage.jsx';
import HomePage from './page/HomePage.jsx';
import PolicyPlaceOrderComponent from './component/client/PolicyPlaceOrderComponent.jsx';
import PlaceTableComponent from './component/client/PlaceTableComponent.jsx';
import NewReservationPage from './page/NewReservationPage.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    // errorElement: <ErrorPage/>,
    children: [
      {
        element: < PrivateRoute />, // element nay de check xem cac route con co hoat dong hay khong 
        children: [
          {
            path: "/admin",
            element: <AdminPage />,
            // Các thành phần của trang admin
            children: [
              {
                index: true,
                element: <DoashBoardPage></DoashBoardPage>
              },
              {
                path: "category",
                element: <CategoryPage />,
              },
              {
                path: "brand",
                element: <BrandPage />,
              },
              {
                path: "product",
                element: <ProductPage />,
              },
              {
                path: "staff",
                element: <StaffPage />
              },
              {
                path: "role",
                element: <RolePage />
              },
              {
                path: "action",
                element: <ActionPage />
              },
              {
                path: "floor",
                element: <FloorPage />
              },
              {
                path: 'table',
                element: <TablePage />
              },
              {
                path: 'reservation',
                element: <ReservationPage />
              },
              {
                path: 'new_reservation',
                element: <NewReservationPage />
              },
              {
                path: 'customer',
                element: <CustomerPage />
              },
              {
                path: 'call-food-chef',
                element: <CallFoodAdminChef />
              },
              {
                path: 'call-food-done',
                element: <CallFoodAdminDelivery />
              }
            ]
          },

        ]

      },

      {
        path: "/admin/login",
        element: <LoginPage />
      },


      {
        element: <PrivateRouteCallFood />,
        children: [
          {
            path: '/call-food',
            element: <CallFoodPage />,
            children: [
              {
                index: true,
                element: <CallFoodComponent />
              },
              {
                path: 'all-food-choosed',
                element: <FoodHadCallComponent />
              }
            ]
          },
        ]
      },


      {
        path: '/login-call-food',
        element: <LoginCallFood />,
      },


    ]
  },

  {
    path: '/',
    element: <ClientPage />,
    children: [

      {
        index: true,
        element: <HomePage />
      },
      {
        path: 'chinh-sach-dat-ban.html',
        element: <PolicyPlaceOrderComponent />
      },
      {
        path: 'dat-ban.html',
        element: <PlaceTableComponent />
      }

    ]
  }

]);


createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
