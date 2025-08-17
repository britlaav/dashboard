import { Route, Routes } from "react-router-dom";
import Inventory from "../Pages/Inventory/inventory";
import Orders from "../Pages/Orders/orders";
import Customers from "../Pages/Customers/customers";
import Dashboard from "../Pages/Dashboard/dashboard";

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Dashboard></Dashboard>}></Route>
            <Route path="/inventory" element={<Inventory></Inventory>}></Route>
            <Route path="/orders" element={<Orders></Orders>}></Route>
            <Route path="/customers" element={<Customers></Customers>}></Route>
        </Routes>
    );
}

export default AppRoutes;
