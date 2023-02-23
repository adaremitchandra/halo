/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { Table, Button, Input, Space } from "antd";
import axios from "axios";
import { SearchOutlined } from "@ant-design/icons";
import { useRef, useState } from "react";
import PageLayout from "../../components/organism/PageLayout";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSm9obiBEb2UiLCJ1c2VySWQiOjEsInJvbGUiOiJhZG1pbiIsImVtYWlsIjoiYWRtaW5AZ21haWwuY29tIiwiaWF0IjoxNjc2OTk1OTg0LCJleHAiOjE2NzY5OTk1ODR9.mqjsXSpyT0WUq2wAxKLnX8_UKUmndsm_5fjmms3YtqA";

const Books = ({ bookList }) => {
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
  };
  const handleReset = (clearFilters) => {
    clearFilters();
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1890ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
  });
  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",

      ...getColumnSearchProps("title"),
    },
    {
      title: "Cover",
      dataIndex: "image",
      key: "cover",
    },
    {
      title: "Category",
      dataIndex: "Category",
      key: "category",
      render: (category) => category?.name,
    },
    {
      title: "Author",
      dataIndex: "author",
      key: "author",
    },
    {
      title: "Published",
      dataIndex: "published",
      key: "published",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Stock",
      dataIndex: "stock",
      key: "stock",
    },
  ];

  return (
    <PageLayout>
      <Table dataSource={bookList} columns={columns} />
    </PageLayout>
  );
};

export default Books;

export async function getServerSideProps() {
  // Fetch data from external API
  const res = await axios.get(
    `https://tokobooks-production-4868.up.railway.app/api/v1/books`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const bookList = res.data.data;
  // Pass data to the page via props
  return { props: { bookList } };
}
