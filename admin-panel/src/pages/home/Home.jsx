import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
import Widget from "../../components/widget/Widget";
import Featured from "../../components/featured/Featured";
import Chart from "../../components/chart/Chart";
import Table from "../../components/table/Table";

import React, { useState, useContext, useEffect } from "react";

import { OpulentSips } from "../../context/OpulentSipsContext";

const Home = () => {
  const [product, setProduct] = useState([]);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [todaySale, setTodaySales] = useState("0");
  const [todaySaleFromStart, setTodaySalesFromStart] = useState("0");

  const { getAllOrder, getAllUser } = useContext(OpulentSips);

  const getOrderData = async () => {
    let data = await getAllOrder();
    if (data) {
      // const firstFiveOrders = data.slice(0, 5);
      setProduct(data);
      setError(false);
    } else {
      setError(true);
      console.log("nope");
    }
  };

  const getUserData = async () => {
    let data = await getAllUser();
    if (data) {
      // const firstFiveOrders = data.slice(0, 5);
      setUsers(data);
      setError(false);
    } else {
      setError(true);
      console.log("nope");
    }
  };

  const getTodaysSale = () => {
    const today = new Date().toISOString().split("T")[0];

    let totalSales = 0;
    let totalSalesFromStart = 0;

    for (const order of product) {
      totalSalesFromStart += order.price * order.quantity;
      const orderDate = order.deliveryTime.split("T")[0];
      if (orderDate === today) {
        totalSales += order.price * order.quantity;
      }
    }
    setTodaySalesFromStart(totalSalesFromStart.toFixed(2));
    setTodaySales(totalSales.toFixed(2));
  };

  useEffect(() => {
    getUserData();
    getOrderData();
  }, []);

  useEffect(() => {
    getTodaysSale();
  }, [product]);

  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="widgets">
          <Widget type="user" info={users?.length} />
          <Widget type="order" info={product?.length} />
          <Widget type="earning" info={todaySaleFromStart} />
          <Widget type="balance" info={4000} />
        </div>
        <div className="charts">
          <Featured todaySale={todaySale} />
          <Chart title="Last 6 Months (Revenue)" aspect={2 / 1} />
        </div>
        <div className="listContainer">
          <div className="listTitle">Latest Orders</div>
          <Table product={product} setProduct={setProduct} />
        </div>
      </div>
    </div>
  );
};

export default Home;
