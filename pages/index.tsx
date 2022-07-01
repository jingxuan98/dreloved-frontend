import styles from "../styles/Home.module.css";
import { api, UserContext } from "../pages/_app";
import React, { useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import ItemSmallCard from "../component/itemSmallCard";
import { MenuProps, Pagination } from "antd";
import { Input, Form, Dropdown, Button, Space, Menu } from "antd";
import { DownOutlined, SearchOutlined } from "@ant-design/icons";
import { catogeries } from "../helper/CreatePostSettings";

const { Search } = Input;

export default function Home() {
  const { user, setUser } = useContext(UserContext);
  const [itemData, setItemData] = useState([]);
  const [sortCase, setSortCase] = useState("");
  const [catogery, setCatogery] = useState("");
  const [search, setSearch] = useState("");
  const [sortOpt, setSortOpt] = useState("");
  const [sortOrder, setSortOrder] = useState(0);
  const [page, setPage] = useState(0);
  const [totalItems, setTotalItems] = useState(100);
  const [sortDisplay, setSortDisplay] = useState("By Popularity");

  useEffect(() => {
    setItemData([]);

    if (search) {
      fetchSearchItems(search);
    } else {
      fetchAllItemsSort();
    }
  }, [sortCase, catogery, page]);

  useEffect(() => {
    fetchAllItemsSort();
  }, []);

  const onSearch = (value: string) => {
    setItemData([]);
    setSearch(value);
    fetchSearchItems(value);
  };

  const fetchAllItemsSort = () => {
    fetch(`${api}allItemsSort?p=${page}`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        order: sortOrder,
        field: sortOpt,
        catogery: catogery,
      }),
    })
      .then((res) => res.json())
      .then((results) => {
        setItemData(results.items);
        setTotalItems(results.total);
      });
  };

  const fetchSearchItems = (query) => {
    if (query != "") {
      fetch(`${api}search?p=${page}`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query,
          order: sortOrder,
          field: sortOpt,
          catogery: catogery,
        }),
      })
        .then((res) => res.json())
        .then((results) => {
          setItemData(results.item);
          setTotalItems(results.total);
        });
    } else {
      fetchAllItemsSort();
    }
  };

  const onPagination = (page, pageSize) => {
    // console.log(page);
    setPage(page - 1);
  };

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    const { key } = e;
    setSortCase(key);

    switch (key) {
      case "1":
        setSortOpt("");
        setSortDisplay("By Popularity");
        break;
      case "2":
        setSortOpt("price");
        setSortOrder(1);
        setSortDisplay("Price Low to High");
        break;
      case "3":
        setSortOpt("price");
        setSortOrder(-1);
        setSortDisplay("Price High to Low");
        break;
      case "4":
        setSortOpt("date");
        setSortOrder(-1);
        setSortDisplay("Latest");
        break;
      case "5":
        setSortOpt("date");
        setSortOrder(1);
        setSortDisplay("Oldest");
        break;
    }
  };

  const menu = (
    <Menu
      onClick={handleMenuClick}
      selectable
      defaultSelectedKeys={["1"]}
      items={[
        {
          label: "By Popularity",
          key: "1",
        },
        {
          label: "Price Low to High",
          key: "2",
        },
        {
          label: "Price High to Low",
          key: "3",
        },
        {
          label: "Latest",
          key: "4",
        },
        {
          label: "Oldest",
          key: "5",
        },
      ]}
    />
  );

  return (
    <div className={styles.container}>
      <div className={styles.catoContainer}>
        <Button className={styles.catogeryBtn} onClick={() => setCatogery("")}>
          Featured
        </Button>
        {catogeries.map((catogery) => {
          return (
            <Button
              className={styles.catogeryBtn}
              key={catogery.label}
              onClick={() => setCatogery(catogery.value)}
            >
              {catogery.label}
            </Button>
          );
        })}
      </div>
      <h1 style={{ fontSize: 42 }} className={styles.header1}>
        Dreloved Items
      </h1>
      <div style={{ width: "100%", textAlign: "center" }}>
        <Search
          className={styles.searchBar}
          style={{ marginBottom: 24 }}
          type="text"
          placeholder="Search Items..."
          onSearch={onSearch}
        />
        <Dropdown overlay={menu}>
          <Button>
            <Space>
              {sortDisplay}
              <DownOutlined />
            </Space>
          </Button>
        </Dropdown>
      </div>
      <div className={styles.innerContainer}>
        {itemData &&
          itemData.map((item) => {
            return <ItemSmallCard key={item?._id} data={item} />;
          })}
      </div>
      <Pagination
        style={{ marginBottom: "3rem" }}
        defaultCurrent={1}
        pageSize={8}
        total={totalItems}
        onChange={onPagination}
      />
    </div>
  );
}
