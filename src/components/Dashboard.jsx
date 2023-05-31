import React, { useState } from "react";
import { Table, Button, Input, Form } from "antd";
import {
  EditOutlined,
  CheckOutlined,
  CloseOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import data from "../data.js";

const Dashboard = () => {
  const [form] = Form.useForm();
  const [dataSource, setDataSource] = useState(data);
  const [editingKey, setEditingKey] = useState("");
  const [searchText, setSearchText] = useState("");

  const isEditing = (record) => record.key === editingKey;

  const edit = (record) => {
    form.setFieldsValue({ ...record });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey("");
  };

  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...dataSource];
      const index = newData.findIndex((item) => key === item.key);

      if (index > -1) {
        const item = newData[index];
        const updatedItem = { ...item, ...row };
        newData.splice(index, 1, updatedItem);
        setDataSource(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const handleSearch = (value) => {
    setSearchText(value);
  };

  const filteredDataSource = dataSource.filter((item) =>
    item.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns = [
    {
      dataIndex: "logo",
      render: (logo) => <img src={logo} alt="Logo" style={{ width: "70px" }} />,
    },
    {
      title: (
        <Input
          prefix={<SearchOutlined />}
          placeholder="Search names"
          value={searchText}
          onChange={(e) => handleSearch(e.target.value)}
        />
      ),
      dataIndex: "name",
      editable: true,
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <Form.Item
            name="name"
            style={{ margin: 0 }}
            rules={[{ required: true, message: "Please input name" }]}
          >
            <Input />
          </Form.Item>
        ) : (
          <>
            <div style={{ fontWeight: "bold" }}>{record.name}</div>
            <div style={{ fontSize: "12px", color: "#888" }}>
              {record.sub_name}
            </div>
          </>
        );
      },
    },
    {
      title: "Active Orders",
      dataIndex: "active_orders",
      editable: true,
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <Form.Item
            name="active_orders"
            style={{ margin: 0 }}
            rules={[{ required: true, message: "Please input active orders" }]}
          >
            <Input />
          </Form.Item>
        ) : (
          record.active_orders
        );
      },
      sorter: (a, b) => a.active_orders - b.active_orders,
    },
    {
      title: "Amount",
      dataIndex: "quantity",
      editable: true,
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <Form.Item
            name="quantity"
            style={{ margin: 0 }}
            rules={[{ required: true, message: "Please input amount" }]}
          >
            <Input />
          </Form.Item>
        ) : (
          record.quantity
        );
      },
      sorter: (a, b) => a.quantity - b.quantity,
    },
    {
      title: "Placed On",
      dataIndex: "placed_on",
      sorter: (a, b) => new Date(a.placed_on) - new Date(b.placed_on),
    },
    {
      title: "Status",
      dataIndex: "status",
      defaultSortOrder: "descend",
      filters: [
        { text: "Confirmed", value: "Confirmed" },
        { text: "Delivered", value: "Delivered" },
        { text: "Refund Completed (30d)", value: "Refund Completed (30d)" },
        { text: "Pending", value: "Pending" },
      ],
      onFilter: (value, record) => record.status.indexOf(value) === 0,
      sorter: (a, b) => a.status.localeCompare(b.status),
    },
    {
      title: "Options",
      dataIndex: "options",
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Button
              type="link"
              icon={<CheckOutlined />}
              style={{ color: "green" }}
              onClick={() => save(record.key)}
            />
            <Button
              type="link"
              icon={<CloseOutlined />}
              style={{ color: "red" }}
              onClick={cancel}
            />
          </span>
        ) : (
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => edit(record)}
          />
        );
      },
    },
  ];

  return (
    <>
      <Form form={form} component={false}>
        <Table
          dataSource={filteredDataSource}
          columns={columns}
          rowKey="key"
          pagination={false}
        />
      </Form>
    </>
  );
};

export default Dashboard;
