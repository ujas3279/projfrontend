import React,{useState,useEffect} from 'react'
import Base from '../core/Base';
import { getOrder } from './helper/adminapicall';

import Card from '../core/Card';



const OrderDetail = ({match}) => {

    const [values, setValues] = useState({
        User_name: "",
        status: "",
        amount: "",
        address: "",
        transaction_id:"",
        products:[],
        error:""

      });
    
      const {
        User_name,
        status,
        amount,
        address,
        transaction_id,
        products,
        error
      } = values;

    
    const preload = (orderId) => {
        getOrder(orderId).then(data=>{
            //console.log(data[0]);
            

            if(data.error)
            {
                setValues({ ...values, error: data.error });
            }
            else
            {
              const order=data[0];
                setValues({
                    ...values,
                    User_name : order.user.name,
                    status : order.status,
                    amount: order.amount,
                    address: order.address,
                    transaction_id: order.transaction_id,
                    products: order.products
                })
            }
        })
    }

    useEffect(() => {
        preload(match.params.orderId);
      }, []);


    return (
        <Base title="Order detail" description="">
            <div className=" mr-5 col-12" ><span className="color-black">Name of user:</span> {User_name}</div>
            <div className=" mr-5 col-12" ><span className="color-black">Order Status:  </span> {status}</div>
            <div className=" mr-5 col-12" ><span className="color-black">Order amount:</span> {amount}</div>
            <div className=" mr-5 col-12" ><span className="color-black">Order address:</span> {address}</div>
            <div className=" mr-5 col-12" ><span className="color-black">Transaction:</span> {transaction_id}</div>
            <div className=" mr-5 col-12" ><span className="color-black">Products:</span> </div>
            <div className="row">
          {products.map((product,index) => {
            return(
              <div key={index}  className="col-4 mb-4">
                <Card product={product} addtoCart={false} />
              </div>
            )
          })}

        </div>

        </Base>
    )
}

export default OrderDetail;

