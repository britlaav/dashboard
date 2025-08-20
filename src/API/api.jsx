import axios from "axios";

export const getOrders = () =>
    axios.get("https://dummyjson.com/carts/1").then((res) => res.data);

export const getRevenue = () =>
    axios.get("https://dummyjson.com/carts").then((res) => res.data);

export const getInventory = () =>
    axios.get("https://dummyjson.com/products").then((res) => res.data);

export const getCustomers = () =>
    axios.get("https://dummyjson.com/users").then((res) => res.data);

export const getComments = () =>
    axios.get("https://dummyjson.com/comments").then((res) => res.data);
