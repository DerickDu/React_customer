import React, { useEffect, useState } from "react"
// import { DataGrid, Button } from '@mui/material';
import OrderCard from "../components/Orders/OrderCard";



const Order = () => {
    // if (localStorage.getItem('login') === "false") {
    //     return
    // }

    const [order, setOrder] = useState([]);  // add state to functional component, initial [], return a array and a function to update the state

    useEffect(() => {

        fetch('http://6310apiserver-env.eba-jxexupk4.us-east-1.elasticbeanstalk.com/api/orders/customer/1')
            .then((res) => res.json())
            .then((data) => {
                setOrder(data.orders);
                console.log("order detail", data.orders);
            })
            .catch((err) => {
                console.log(err);
            });
        //fetchOrders();
    }, [])


    const styles = {
        row: {
            width: "100%",
            margin: "15 auto",
            display: "flex",
            "flexDirection": "row",
            "justifyContent": "center",
        },
        block: {
            width: "100px",
        }
    }



    //fetch data, run the function vevery render of the component

    const mapOrders = (order) => {
        console.log("🚀 ~ file: Order.jsx:43 ~ mapOrders ~ order:", order)
        if (order["tempCost"] == 0) {
            return
        }
        return (
            <div style={styles.row}>
                <OrderCard order={order} storeId={order.storeId} />
            </div>
        )
    }



    return (
        <div>
            <h1>Order</h1>
            {order.map(mapOrders)}
        </div>
        //
    )
}


export default Order;

//