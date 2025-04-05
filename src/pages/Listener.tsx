import React, { useEffect, useState } from "react";
import { GetListenerResponse, ListenerTypeEnum } from "../dtos/typeListener";
import { listener } from "../services/listenerService";
import { Table, message, Alert, Select, Checkbox, Button, TablePaginationConfig } from "antd"; // Import TablePaginationConfig
import Column from "antd/es/table/Column";
import { ButtonComponent } from "../components/ButtonComponent";
import { useNavigate } from "react-router-dom";
import { DeleteOutlined, ReloadOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import { TextInputComponent } from "../components/TextInputComponent";

export const Listener: React.FC = () => {
  const [listeners, setListeners] = useState<GetListenerResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const [name, setName] = useState<string | undefined>();
  const [listenerTypeEnum, setListenerTypeEnum] = useState<
    ListenerTypeEnum | undefined
  >();
  const [sortByName, setSortByName] = useState<boolean | undefined>();
  const [sortByPrice, setSortByPrice] = useState<boolean | undefined>();
  const [sortByStar, setSortByStar] = useState<boolean | undefined>();
  
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [total, setTotal] = useState<number>(0);

  const fetchListeners = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await listener.getListeners({
        name,
        listenerTypeEnum,
        sortByName,
        sortByPrice,
        sortByStar,
        page: page,
        size,
      });
      console.log("API Response:", response);

      if (response?.data?.items && Array.isArray(response.data.items)) {
        setListeners(response.data.items);
        setTotal(response.data.total || 0);
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

  useEffect(() => {
    fetchListeners();
  }, [page, size, name, listenerTypeEnum, sortByName, sortByPrice, sortByStar]);

  const handleButton = async () => navigate("/listener/add");

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm(
      "Bạn có chắc chắn muốn xóa người nghe này không"
    );
    if (!confirmDelete) return;
    const result = await listener.deleteListener(id);
    if (result.data) {
      toast.success("Xóa người dùng thành công");
      fetchListeners();
    } else {
      toast.error(result.message || "Xóa người dùng thất bại");
    }
  };

  // Update handleTableChange to use TablePaginationConfig
  const handleTableChange = (pagination: TablePaginationConfig) => {
    setPage(pagination.current || 1);
    setSize(pagination.pageSize || 10); 
  };

  return (
    <>
      <div>
        <TextInputComponent
          label="Tên"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Select
          placeholder="Loại người nghe"
          onChange={(value) => setListenerTypeEnum(value)}
          style={{ width: 200, marginRight: 8 }}
        >
          <Select.Option value="Tarot">Tarot</Select.Option>
          <Select.Option value="Share">Chia sẻ</Select.Option>
        </Select>

        <Checkbox
          checked={sortByName}
          onChange={(e) => setSortByName(e.target.checked)}
        >
          Sắp xếp theo tên
        </Checkbox>
        <Checkbox
          checked={sortByPrice}
          onChange={(e) => setSortByPrice(e.target.checked)}
        >
          Sắp xếp theo giá
        </Checkbox>
        <Checkbox
          checked={sortByStar}
          onChange={(e) => setSortByStar(e.target.checked)}
        >
          Sắp xếp theo sao
        </Checkbox>
        <Button
          shape="circle"
          icon={<ReloadOutlined />}
          onClick={fetchListeners}
          style={{ backgroundColor: "#F7DCFF", color: "#9255BE" }}
        />
      </div>
      <div style={{ marginBottom: 16, textAlign: "right" }}>
        <ButtonComponent text="Thêm người nghe" onClick={handleButton} />
      </div>
      {error && <Alert message={error} type="error" showIcon />}
      <Table<GetListenerResponse>
        dataSource={listeners}
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
        <Column title="Mô tả" dataIndex="description" key="description" />
        <Column title="Số sao" dataIndex="star" key="star" />
        <Column
          title="Giá"
          dataIndex="price"
          key="price"
          render={(price) =>
            price.toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            })
          }
        />
        <Column title="Avatar" dataIndex="avatar" key="avatar" />
        <Column title="Giới tính" dataIndex="gender" key="gender" />
        <Column
          title="Hành động"
          key="actions"
          render={(_, record: GetListenerResponse) => (
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