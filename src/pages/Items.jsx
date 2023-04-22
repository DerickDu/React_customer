import React, { useEffect, useState } from "react"
import { Navigate } from "react-router-dom"
import { Routes, Route } from "react-router-dom"
import { BrowserRouter } from 'react-router-dom';
import BasicCard from "../components/Items/Card.jsx"
import Cart from "../components/Items/Cart.jsx";

const Items = () => {
    const [data, setData] = useState([])
    const [ItemInCart, setCartItems] = useState([])

    useEffect(() => {
        if (localStorage.getItem("cart") === null) {
            localStorage.setItem("cart", JSON.stringify([]));
        }
        const cart = localStorage.getItem("cart");
        setCartItems(JSON.parse(cart))
        fetch("http://localhost:8081/api/items/")
            .then(res => res.json())
            .then(data => {
                setData(data.items)
            })

    }, [])


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

    return (

        < div >
            <div style={styles.row}>
                {mapItems(data)}
            </div>

            {mapCartItems(ItemInCart, setCartItems)}
        </div >
    )
}




export default Items;