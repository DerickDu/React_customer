import { Outlet, Link } from "react-router-dom";

const Layout = () => {
    return (
        <>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/items">Product</Link>
                    </li>
                    <li>
                        <Link to="/order">Order</Link>
                    </li>
                    <li>
                        <Link to="/store">Store</Link>
                    </li>
                    <li>
                        <Link to="/drone">Drone</Link>
                    </li>
                </ul>
            </nav>

            <Outlet />
        </>
    )
};

export default Layout;