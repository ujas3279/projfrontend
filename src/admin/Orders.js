import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom';
import { isAutheticated } from '../auth/helper';
import Base from '../core/Base';
import { getOrders} from "./helper/adminapicall"

const ManageOrders = () => {

    const [orders, setOrders] = useState([]);

    const {user,token} = isAutheticated();

    const preload = () => {
        getOrders(user._id,token).then(data => {
            if(data.error){
                console.log(data.error);
            }
            else{
                setOrders(data);
            }
        })
    }

    useEffect(() => {
        preload();
    }, [])

    

    return (
        <Base title="Welcome admin" description="Manage Orders here">
      <h2 className="mb-4">All Orders:</h2>
      <Link className="btn btn-info" to={`/admin/dashboard`}>
        <span className="">Admin Home</span>
      </Link>
      <div className="row">
        <div className="col-12">
          <h2 className="text-center text-white my-3">Total Orders</h2>

          {orders.map((order, index) => {
              return(<div key={index} className="row text-center mb-2 ">
              <div className="col-4">
                <h3 className="text-white text-left">{order.user.name}</h3>
              </div>
              <div className="col-4">
                <Link
                  className="btn btn-success"
                  to={`/admin/order/detail/${order._id}`}
                >
                  <span className="">Order detail</span>
                </Link>
              </div>
              <div className="col-4">
                <Link
                className="btn btn-success"
                to={`/admin/orderstatus/update/${order._id}`}>
                  <span className="">Update Status</span>
                </Link>
              </div>
              </div>
              )
          })}
        </div>
      </div>
    </Base>
    )
}

export default ManageOrders;