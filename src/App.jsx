import GenericLayout from "./Components/GenericLayout";
import Inventory from "./Components/Pages/inventory";
import Dashboard from "./Components/Pages/dashboard";
import Orders from "./Components/Pages/orders";
import Customers from "./Components/Pages/customers";
import { Route, Routes } from "react-router-dom";

const App = () => {
    return (
        <GenericLayout>
            <Routes>
                <Route path="/" element={<Dashboard />}></Route>
                <Route path="/inventory" element={<Inventory />}></Route>
                <Route path="/orders" element={<Orders />}></Route>
                <Route path="/customers" element={<Customers />}></Route>
            </Routes>
        </GenericLayout>
    );
};
export default App;
