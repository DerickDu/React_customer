import React, { useEffect, useState } from "react"
import { Navigate } from "react-router-dom"
import { Routes, Route } from "react-router-dom"
import { BrowserRouter } from 'react-router-dom';
import BasicCard from "../components/Items/Card.jsx"
import Cart from "../components/Items/Cart.jsx";
import { useParams } from "react-router-dom";
const Items = () => {
    let { id } = useParams();
    const [data, setData] = useState([])
    const [ItemInCart, setCartItems] = useState([])

    useEffect(() => {
        if (localStorage.getItem("cart") === null) {
            localStorage.setItem("cart", JSON.stringify([]));
        }
        const cart = localStorage.getItem("cart");
        setCartItems(JSON.parse(cart))
        fetch("http://6310apiserver-env.eba-jxexupk4.us-east-1.elasticbeanstalk.com/api/items/store/" + id)
            .then(res => res.json())
            .then(data => {
                setData(data.items)
            })

    }, [])

    const check = () => {
        let sum = 0
        ItemInCart.forEach((item) => {
            sum += item.amount
        })
        return sum != 0

    }



    const handleAddToCart = (clickedItem) => {
        setCartItems((prev) => {
            const isItemInCart = prev.find((item) => item.name === clickedItem.name);

            if (isItemInCart) {
                const newCart = (prev.map((item) =>
                    item.name === clickedItem.name
                        ? { ...item, amount: item.amount + 1 }
                        : item)
                )
                localStorage.setItem("cart", JSON.stringify(newCart));
                return newCart;
            }
            const newCart = [...prev, { ...clickedItem, amount: 1 }];
            localStorage.setItem("cart", JSON.stringify(newCart));
            return newCart;
        });

    };
    console.log("🚀 ~ file: Items.jsx:10 ~ Items ~ ItemInCart", ItemInCart)

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

    const mapItems = (data) => {
        return (
            data.map((item) => {
                return (
                    <div style={styles.row}>
                        <BasicCard key="{item}" item={item} clickHandler={handleAddToCart} />
                    </div >
                )
            })
        )
    }
    const mapCartItems = (ItemInCart, setCartItems) => {
        return (
            <div>
                <Cart ItemInCart={ItemInCart} setCartItems={setCartItems} sx={{ width: "100px" }} />

            </div>
        )
    }
    if (localStorage.getItem('login') === false) {
        return
    }

    return (



        < div >
            <div style={styles.row}>
                {mapItems(data)}
            </div>
            {check() && mapCartItems(ItemInCart, setCartItems)}
        </div >
    )
}




export default Items;