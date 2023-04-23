import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import NoPage from "./pages/NoPage";
import Items from "./pages/Items";
import Login from "./pages/Login";
import ProtectedRoute from './components/ProtectedRoute';
import { useState } from "react";
import Order from "./pages/Order";

export default function App() {

    return (

        <BrowserRouter>
            <Routes>

                <Route exact path="/login" element={<Login />} />
                <Route element={ProtectedRoute}></Route>
                <Route path="/" element={<Layout />} >
                    <Route path="/home" element={<Home />} />
                    <Route path="/order" element={<Order />} />
                    <Route path="/items" element={<Items />} />
                    <Route path="contact" element={<Contact />} />
                    <Route path="*" element={<NoPage />} />\
                </Route>
            </Routes>
        </BrowserRouter >
    );
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);