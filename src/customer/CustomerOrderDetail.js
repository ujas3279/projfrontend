import React from 'react'
import { Link } from 'react-router-dom';
import { isAutheticated } from '../auth/helper';
import Base from '../core/Base';
import Card from '../core/Card';

const CustomerOrderDetail = () => {
    const {
        user: { _id,purchases,role}
      } = isAutheticated();

      console.log(purchases)
    return (
      <Base>
      <Link className="btn btn-info" to={`/user/dashboard`}>
        <span className="">User Home</span>
      </Link>
        <div className="row">
        <div className="col-12">
          <h2 className="text-center text-white my-3">Total Orders</h2>
          {purchases.map((order, index) => {
              return(<div key={index} className="row text-center mb-2 ">
              <div className="col-4">
                <h3 className="text-white text-left">{order.name}</h3>
              </div>
              <div className="col-4">
                <Link
                  className="btn btn-success"
                  to={`/admin/order/detail/${order._id}`}
                >
                  <span className="">Order detail</span>
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

export default CustomerOrderDetail;