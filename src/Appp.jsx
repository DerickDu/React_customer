import React, { useEffect, useState } from "react"
import { Navigate } from "react-router-dom"
import { Routes, Route } from "react-router-dom"
import { BrowserRouter } from 'react-router-dom';
import BasicCard from "./components/Items/Card";
import Cart from "./components/Items/Cart";

const App = () => {
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


  const mapItems = (data) => {
    return (
      data.map((item) => {
        return (
          <BasicCard key={item.id} item={item} clickHandler={handleAddToCart} />
        )
      })
    )
  }
  const mapCartItems = (ItemInCart, setCartItems) => {
    return (
      <Cart ItemInCart={ItemInCart} setCartItems={setCartItems} />
    )
  }

  return (

    < div display="flex" >
      {mapItems(data)}
      {mapCartItems(ItemInCart, setCartItems)}
    </div >
  )
}


export default App