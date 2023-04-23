import React, { useEffect, useState } from 'react'
import { Card, Button } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import BasicCard from './Card';
import axios from 'axios';
const Cart = ({ ItemInCart, setCartItems }) => {

    const handleMinusToCart = (clickedItem) => {
        setCartItems((prev) => {
            const isItemInCart = prev.find((item) => item.name === clickedItem.name);

            if (isItemInCart) {
                const newCart = (prev.map((item) =>
                    item.name === clickedItem.name
                        ? { ...item, amount: item.amount - 1 }
                        : item)
                )
                localStorage.setItem("cart", JSON.stringify(newCart));
                return newCart;
            }
            const newCart = [...prev, { ...clickedItem, amount: 0 }];
            localStorage.setItem("cart", JSON.stringify(newCart));
            return newCart;
        });
    };

    const calculateTotal = (ItemInCart) => {
        let total = 0;
        ItemInCart.forEach((item) => {
            total += item.price * item.amount;
        })
        return total;
    }
    const sumTotalAmount = (ItemInCart) => {
        let total = 0;
        ItemInCart.forEach((item) => {
            total += item.amount;
        })
        return total;
    }
    const clickToBuy = () => {
        if (sumTotalAmount(ItemInCart) === 0) {
            alert("Please add item to cart")
        }
        axios.post("http://6310apiserver-env.eba-jxexupk4.us-east-1.elasticbeanstalk.com/api/orders/", {
            "customer": 1,
            "tempCost": 0,
            "tempWeight": 0,
            "purchased": true,
            "storeId": 1,
            "orderStatus": "Not Purchased",
            "deliveryTime": 0,
            "purchaseTime": null,
            "arrivalTime": null
        }).then((res) => {
            console.log("set orderId to", JSON.stringify(res.data["order_id"]))
            const order_id = JSON.stringify(res.data["order_id"])
            for (let i = 0; i < ItemInCart.length; i++) {
                if (ItemInCart[i].amount === 0) {
                    continue;
                } else {
                    console.log("order id", order_id)
                    const requestBody = {
                        "itemId": ItemInCart[i].itemId,
                        "quantity": ItemInCart[i].amount,
                        "orderId": order_id
                    }
                    console.log("🚀 ~ file: Cart.jsx:75 ~ clickToBuy ~ requestBody:", requestBody)
                    axios.post("http://6310apiserver-env.eba-jxexupk4.us-east-1.elasticbeanstalk.com/api/lines/", requestBody)
                        .then((res) => {
                            console.log(res)
                        }
                        ).catch((err) => {
                            console.log(err)
                        })
                }
            }
        })
            .catch((err) => {
                console.log(err)
            })

        alert("Order placed Successfully!")
        setCartItems([]);
        localStorage.setItem("cart", JSON.stringify([]));
    }

    return (
        <div>
            <Card sx={{ minWidth: 150 }}>
                <CardContent>
                    {ItemInCart.map((item) => {
                        if (item.amount === 0) {
                            return null;
                        } else {
                            return (
                                <div key={item.itemId}>
                                    {`${item.name} ${item.amount}`}
                                    <Button key={item.name} variant="outlined" onClick={() => { handleMinusToCart(item) }}>-</Button>
                                </div>
                            )
                        }
                    })}
                    <div>
                        Total: {calculateTotal(ItemInCart)}
                    </div>
                </CardContent>
            </Card>
            <Button variant="outlined" onClick={() => { clickToBuy() }}>Buy</Button>
        </div>
    )
}

export default Cart