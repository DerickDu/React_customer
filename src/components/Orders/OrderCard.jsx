import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import React, { useEffect, useState } from 'react'
import LineButton from './LineButton';


const OrderCard = ({ order, storeId }) => {

    const [store, setStore] = useState("");


    console.log("order", order)

    useEffect(() => {

        fetch('http://localhost:8081/api/stores/' + storeId)
            .then((res) => res.json())
            .then((data) => {
                setStore(data.data.name);

            })
            .catch((err) => {
                console.log(err);
            });
    }, [])

    return (
        < Card key={order.Id} sx={{ bgcolor: "#E8E8E8" }}
>
            <CardContent>
                <Typography variant="h5" component="div">
                    Order ID: {order.orderId}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    Order Cost: {order.tempCost}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    From Store: {store}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    Order Status: {order.orderStatus}
                </Typography>
            </CardContent>
            <CardActions>
                <LineButton OrderId={ order.orderId} />
            </CardActions> 
            <CardActions>
                <Button variant="outlined" size="middle" onClick={(e) => {
                    e.preventDefault();
                    // console.log(item)
                    // clickHandler(item);
                }}>Cancel Order</Button>
            </CardActions> 
        </Card >
    );
}

export default OrderCard;