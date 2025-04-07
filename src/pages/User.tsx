import React, { useEffect, useState } from "react";
import { user } from "../services/userService";
import { Table, message, Alert, Button, TablePaginationConfig } from "antd";
import Column from "antd/es/table/Column";
import { ButtonComponent } from "../components/ButtonComponent";
import { useNavigate } from "react-router-dom";
import { DeleteOutlined, ReloadOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import { TextInputComponent } from "../components/TextInputComponent";
import { UserData } from "../dtos/typeUser";

export const User: React.FC = () => {
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const [fullName, setFullName] = useState<string | undefined>();
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [total, setTotal] = useState<number>(0);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await user.getUsers({
        page: page,
        size: size,
      });
      console.log("API Response:", response);

      if (response?.data?.items && Array.isArray(response.data.items)) {
        setUsers(response.data.items);
        setTotal(response.data.total || 0);
      } else {
        console.error("Dữ liệu không phải mảng:", response.data);
        setError("Dữ liệu trả về không hợp lệ.");
      }
    } catch (error) {
      console.error("Lỗi khi lấy danh sách user:", error);
      setError("Không thể tải danh sách user.");
      message.error("Lỗi khi tải danh sách user!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page, size, fullName]);

  const handleButton = async () => navigate("/user/add");

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm(
      "Bạn có chắc chắn muốn xóa người dùng này không?"
    );
    if (!confirmDelete) return;

    try {
      const response = await user.deleteUser(id); 
      if (response.status === "200") { 
        toast.success("Xóa người dùng thành công");
        fetchUsers();
      } else {
        toast.error(response.message || "Xóa người dùng thất bại");
      }
    } catch (error) {
      console.log(error);
      toast.error("Xóa người dùng thất bại");
    }
  };

  const handleTableChange = (pagination: TablePaginationConfig) => {
    setPage(pagination.current || 1);
    setSize(pagination.pageSize || 10);
  };

  return (
    <>
      <div>
        <TextInputComponent
          label="Tên đầy đủ"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
        <Button
          shape="circle"
          icon={<ReloadOutlined />}
          onClick={fetchUsers}
          style={{ backgroundColor: "#F7DCFF", color: "#9255BE" }}
        />
      </div>
      <div style={{ marginBottom: 16, textAlign: "right" }}>
        <ButtonComponent text="Thêm người dùng" onClick={handleButton} />
      </div>
      {error && <Alert message={error} type="error" showIcon />}
      <Table<UserData>
        dataSource={users}
        rowKey="id"
        loading={loading}
        bordered
        pagination={{
          current: page,
          pageSize: size,
          total: total,
          pageSizeOptions: [5, 10, 20, 50],
          showSizeChanger: true,
          showTotal: (total) => `Tổng ${total} bản ghi`,
        }}
        onChange={handleTableChange}
      >
        <Column title="ID" dataIndex="id" key="id" />
        <Column title="Tên đầy đủ" dataIndex="fullName" key="fullName" />
        <Column title="Email" dataIndex="email" key="email" />
        <Column title="Số điện thoại" dataIndex="phone" key="phone" />
        <Column
          title="Hành động"
          key="actions"
          render={(_, record: UserData) => (
            <ButtonComponent
              text="Xóa"
              icon={<DeleteOutlined />}
              onClick={() => handleDelete(record.id)}
            />
          )}
        />
      </Table>
    </>
  );
};