import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./core/Home";
import Signup from "./user/Signup";
import Signin from "./user/Signin";
import AdminRoute from "./auth/helper/AdminRoutes";
import PrivateRoute from "./auth/helper/PrivateRoutes";
import UserDashBoard from "./user/UserDashBoard";
import AdminDashBoard from "./user/AdminDashBoard";
import AddCategory from "./admin/AddCategory";
import ManageCategories from "./admin/ManageCategories";
import AddProduct from "./admin/AddProduct";
import ManageProducts from "./admin/ManageProducts";
import UpdateProduct from "./admin/UpdateProduct";
import UpdateCategory from "./admin/UpdateCategory";
import Cart from "./core/Cart";
import ManageOrders from "./admin/Orders";
import UpdateOrderStatus from "./admin/updateOrderStatus";
import OrderDetail from "./admin/OrderDetail";
import Setting from "./customer/Setting";
import CustomerOrderDetail from "./customer/CustomerOrderDetail"


const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/signin" exact component={Signin} />
        <Route path="/cart" exact component={Cart} />
        <PrivateRoute path="/user/dashboard" exact component={UserDashBoard}/>
        <PrivateRoute path="/user/setting" exact component={Setting}/>
        <PrivateRoute path="/user/orders" exact component={CustomerOrderDetail}/>
        <AdminRoute path="/admin/dashboard" exact component={AdminDashBoard}/>
        <AdminRoute path="/admin/create/category" exact component={AddCategory}/>
        <AdminRoute path="/admin/category/update/:categoryId" exact component={UpdateCategory}/>
        <AdminRoute path="/admin/categories" exact component={ManageCategories}/>
        <AdminRoute path="/admin/create/product" exact component={AddProduct}/>
        <AdminRoute path="/admin/products" exact component={ManageProducts}/>
        <AdminRoute path="/admin/product/update/:productId" exact component={UpdateProduct}/>
        <AdminRoute path="/admin/orders" exact component={ManageOrders}/>
        <AdminRoute path="/admin/orderstatus/update/:orderId" exact component={UpdateOrderStatus}/>
        <AdminRoute path="/admin/order/detail/:orderId" exact component={OrderDetail}/>
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
