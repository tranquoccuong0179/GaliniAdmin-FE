import React, { useEffect, useState } from "react";
import { GetListenerResponse } from "../dtos/typeListener";
import { listener } from "../services/listenerService";
import { Table, message, Alert } from "antd";
import Column from "antd/es/table/Column";

export const Listener: React.FC = () => {
  const [listeners, setListeners] = useState<GetListenerResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchListeners = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await listener.getListeners();
        console.log("API Response:", response);

        if (response?.data?.items && Array.isArray(response.data.items)) {
          setListeners(response.data.items);
        } else {
          console.error("Dữ liệu không phải mảng:", response.data);
          setError("Dữ liệu trả về không hợp lệ.");
        }
      } catch (error) {
        console.error("Lỗi khi lấy danh sách listener:", error);
        setError("Không thể tải danh sách listener.");
        message.error("Lỗi khi tải danh sách listener!");
      } finally {
        setLoading(false);
      }
    };

    fetchListeners();
  }, []);

  return (
    <>
      {error && <Alert message={error} type="error" showIcon />}
      <Table<GetListenerResponse>
        dataSource={listeners}
        rowKey="id"
        loading={loading}
        bordered
        pagination={{ pageSize: 5 }}
      >
        <Column title="ID" dataIndex="id" key="id" />
        <Column title="Tên đầy đủ" dataIndex="fullName" key="fullName" />
        <Column title="Mô tả" dataIndex="description" key="description" />
        <Column title="Số sao" dataIndex="star" key="star" />
        <Column title="Giá" dataIndex="price" key="price" />
      </Table>
    </>
  );
};
