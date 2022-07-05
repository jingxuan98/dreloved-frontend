import styles from "../styles/Home.module.css";
import { api, UserContext } from "./_app";
import { Button, Collapse, Tabs } from "antd";
import React, { useContext, useState, useEffect } from "react";
import OrderCard from "../component/orderCard";
import OrderForm from "../component/orderForm";
const { Panel } = Collapse;
const { TabPane } = Tabs;

export default function Orders() {
  const { user, setUser } = useContext(UserContext);
  const [orderData, setOrderData] = useState([]);
  const [soldData, setSoldData] = useState([]);
  const [orderStatus, setOrderStatus] = useState("PROCESSING");
  const [soldStatus, setSoldStatus] = useState("PROCESSING");
  const [busdRevenue, setBusdRevenue] = useState(0);
  const [usmtRevenue, setUsmtRevenue] = useState(0);

  useEffect(() => {
    const ordersFetch = async () => {
      await fetch(`${api}myOrders`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _id: user?.data?._id,
        }),
      })
        .then((res) => res.json())
        .then((result) => {
          setOrderData(result.order);
        });
    };
    const soldOrdersFetch = async () => {
      await fetch(`${api}mySold`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _id: user?.data?._id,
        }),
      })
        .then((res) => res.json())
        .then((result) => {
          setSoldData(result.order);
        });
    };
    if (user?.data?._id) {
      ordersFetch();
      soldOrdersFetch();
    }
    setOrderData([]);
  }, [user]);

  useEffect(() => {
    let busdSum = 0;
    let usmtSum = 0;

    soldData.forEach((order) => {
      if (order?.token == "BUSD") {
        if (order?.price > 0) busdSum += order?.price;
      } else if (order?.token == "USMT") {
        if (order?.price > 0) usmtSum += order?.price;
      }
    });
    setBusdRevenue(busdSum);
    setUsmtRevenue(usmtSum);
  }, [soldData]);

  useEffect(() => {
    if (orderData) renderBoughtList(orderData);
    if (orderData) renderBoughtList(soldData);
  }, [orderStatus, soldStatus]);

  const onChange = (key: string) => {};

  const renderBoughtList = (data: any) => {
    let listArr = [];
    data.map((order, index) => {
      if (order.status == orderStatus) {
        listArr.push(
          <Panel header={`OrderID: ${order?._id}`} key={index.toString()}>
            <OrderForm mode="view" data={order} />
          </Panel>
        );
      }
    });
    return listArr;
  };

  const renderSoldList = (data: any) => {
    let listArr = [];
    data.map((order, index) => {
      if (order.status == soldStatus) {
        listArr.push(
          <Panel header={`OrderID: ${order?._id}`} key={index.toString()}>
            <OrderForm mode="view" data={order} />
          </Panel>
        );
      }
    });
    return listArr;
  };

  const renderBoughtStatusButton = () => {
    return (
      <div className={styles.orderStatusContainer}>
        <Button
          className={styles.orderStatusBtn}
          onClick={() => setOrderStatus("PROCESSING")}
        >
          Processing
        </Button>
        <Button
          className={styles.orderStatusBtn}
          onClick={() => setOrderStatus("SHIPPED")}
        >
          Shipped
        </Button>
      </div>
    );
  };

  const renderSoldStatusButton = () => {
    return (
      <div className={styles.orderStatusContainer}>
        <Button
          className={styles.orderStatusBtn}
          onClick={() => setSoldStatus("PROCESSING")}
        >
          Processing
        </Button>
        <Button
          className={styles.orderStatusBtn}
          onClick={() => setSoldStatus("SHIPPED")}
        >
          Shipped
        </Button>
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.header1}>My Orders</h1>
      {!user?.data ? (
        <h2
          className={styles.header1}
          style={{ fontWeight: 300, fontSize: 28 }}
        >
          Please Connect Your Wallet....
        </h2>
      ) : (
        <>
          <div className={styles.revenueCard}>
            <h4 className={styles.revenueTitle}>
              <img
                alt="busdlogo"
                style={{ height: 40, marginRight: 8 }}
                src="/busd.png"
              />
              Total BUSD Revenue :{" "}
              <span className={styles.revenueBalanceDisplay}>
                {busdRevenue || 0} BUSD
              </span>
            </h4>
            <h4 className={styles.revenueTitle} style={{ marginBottom: "0em" }}>
              <img
                alt="usmtlogo"
                style={{ height: 40, marginRight: 8 }}
                src="/usmt.png"
              />
              Total USMT Revenue :{" "}
              <span className={styles.revenueBalanceDisplay}>
                {usmtRevenue || 0} USMT
              </span>
            </h4>
          </div>
          <Tabs centered defaultActiveKey="1" onChange={onChange}>
            <TabPane tab="Bought Orders" key="1">
              {renderBoughtStatusButton()}
              <Collapse style={{ margin: 10 }} defaultActiveKey={["0"]}>
                {orderData ? (
                  renderBoughtList(orderData)
                ) : (
                  <p>No Buy Orders At the Moment</p>
                )}
              </Collapse>
            </TabPane>

            <TabPane tab="Sold Orders" key="2">
              {renderSoldStatusButton()}
              <Collapse style={{ margin: 10 }} defaultActiveKey={["0"]}>
                {soldData ? (
                  renderSoldList(soldData)
                ) : (
                  <p>No Sold Orders At the Moment</p>
                )}
              </Collapse>
            </TabPane>
          </Tabs>
        </>
      )}
    </div>
  );
}
