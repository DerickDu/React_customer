import { Outlet, Link } from "react-router-dom";

const Layout = () => {
    return (
        <>
            <nav>
                <div display="flex" >

                    <Link to="/">Home</Link>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                    <Link to="/store">Store</Link>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                    <Link to="/items/1">Product</Link>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                    <Link to="/order">Order</Link>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                    <Link to="/login">Login</Link>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                    <Link to="/logout">Logout</Link>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                </div>
            </nav>

            <Outlet />
        </>
    )
};

export default Layout;