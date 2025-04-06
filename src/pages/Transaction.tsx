import React, { useEffect, useState } from "react";
import { Table, message, Alert, Select, Checkbox, Button, TablePaginationConfig, Form } from "antd";
import Column from "antd/es/table/Column";
import { ReloadOutlined } from "@ant-design/icons";
import { TextInputComponent } from "../components/TextInputComponent";
import { TransactionData } from "../dtos/typeTransaction"; // Giả sử đây là file chứa interface
import { transactionService } from "../services/transactionService";

export const Transaction: React.FC = () => {
  const [transactions, setTransactions] = useState<TransactionData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [name, setName] = useState<string | undefined>();
  const [email, setEmail] = useState<string | undefined>();
  const [phone, setPhone] = useState<string | undefined>();
  const [status, setStatus] = useState<"SUCCESS" | "PENDING" | "FAILED" | undefined>();
  const [type, setType] = useState<"DEPOSIT" | "BOOKING" | "PREMIUM" | undefined>();
  const [sortByPrice, setSortByPrice] = useState<boolean | undefined>();
  const [daysAgo, setDaysAgo] = useState<number | undefined>();
  const [weeksAgo, setWeeksAgo] = useState<number | undefined>();
  const [monthsAgo, setMonthsAgo] = useState<number | undefined>();

  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [total, setTotal] = useState<number>(0);

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await transactionService.getTransactions({
        page,
        size,
        name,
        email,
        phone,
        status,
        type,
        sortByPrice,
        daysAgo,
        weeksAgo,
        monthsAgo,
      });

      console.log("API Response:", response);

      if (response?.data?.items && Array.isArray(response.data.items)) {
        setTransactions(response.data.items);
        setTotal(response.data.total || 0);
      } else {
        console.error("Dữ liệu không phải mảng:", response.data);
        setError("Dữ liệu trả về không hợp lệ.");
      }
    } catch (error) {
      console.error("Lỗi khi lấy danh sách giao dịch:", error);
      setError("Không thể tải danh sách giao dịch.");
      message.error("Lỗi khi tải danh sách giao dịch!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [page, size, name, email, phone, status, type, sortByPrice, daysAgo, weeksAgo, monthsAgo]);

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
          onChange={(e) => setName(e.target.value || undefined)}
        />
        <TextInputComponent
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value || undefined)}
        />
        <TextInputComponent
          label="Số điện thoại"
          value={phone}
          onChange={(e) => setPhone(e.target.value || undefined)}
        />
        <Form labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
          <Form.Item label="Trạng thái">
            <Select
              placeholder="Chọn trạng thái"
              onChange={(value) =>
                setStatus(
                  value === "SUCCESS" || value === "PENDING" || value === "FAILED"
                    ? value
                    : undefined
                )
              }
              style={{ width: 200 }}
            >
              <Select.Option value="SUCCESS">Thành công</Select.Option>
              <Select.Option value="PENDING">Đang chờ</Select.Option>
              <Select.Option value="FAILED">Thất bại</Select.Option>
              <Select.Option value="">Không xác định</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Loại giao dịch">
            <Select
              placeholder="Chọn loại giao dịch"
              onChange={(value) =>
                setType(
                  value === "DEPOSIT" || value === "BOOKING" || value === "PREMIUM"
                    ? value
                    : undefined
                )
              }
              style={{ width: 200 }}
            >
              <Select.Option value="DEPOSIT">Nạp tiền</Select.Option>
              <Select.Option value="BOOKING">Đặt chỗ</Select.Option>
              <Select.Option value="PREMIUM">Gói Premium</Select.Option>
              <Select.Option value="">Không xác định</Select.Option>
            </Select>
          </Form.Item>
        </Form>
        <TextInputComponent
          label="Số ngày trước"
          value={daysAgo?.toString()}
          onChange={(e) => setDaysAgo(e.target.value ? parseInt(e.target.value) : undefined)}
        />
        <TextInputComponent
          label="Số tuần trước"
          value={weeksAgo?.toString()}
          onChange={(e) => setWeeksAgo(e.target.value ? parseInt(e.target.value) : undefined)}
        />
        <TextInputComponent
          label="Số tháng trước"
          value={monthsAgo?.toString()}
          onChange={(e) => setMonthsAgo(e.target.value ? parseInt(e.target.value) : undefined)}
        />
        <Checkbox
          checked={sortByPrice}
          onChange={(e) => setSortByPrice(e.target.checked)}
        >
          Sắp xếp theo giá
        </Checkbox>

        <Button
          shape="circle"
          icon={<ReloadOutlined />}
          onClick={fetchTransactions}
          style={{ backgroundColor: "#F7DCFF", color: "#9255BE" }}
        />
      </div>

      {error && <Alert message={error} type="error" showIcon />}

      <Table<TransactionData>
        dataSource={transactions}
        rowKey="id"
        loading={loading}
        bordered
        pagination={{
          current: page,
          pageSize: size,
          total: total,
          pageSizeOptions: [5, 10, 20, 50],
          showSizeChanger: true,
          showTotal: (total) => `Tổng ${total} giao dịch`,
        }}
        onChange={handleTableChange}
      >
        <Column title="ID" dataIndex="id" key="id" />
        <Column
          title="Số tiền"
          dataIndex="amount"
          key="amount"
          render={(amount: number) =>
            amount.toLocaleString("vi-VN", { style: "currency", currency: "VND" })
          }
        />
        <Column title="Mã đơn hàng" dataIndex="orderCode" key="orderCode" />
        <Column
          title="Trạng thái"
          dataIndex="status"
          key="status"
          render={(status: "SUCCESS" | "PENDING" | "FAILED") => {
            let color = "";
            switch (status) {
              case "SUCCESS":
                color = "#52c41a";
                break;
              case "PENDING":
                color = "#faad14";
                break;
              case "FAILED":
                color = "#ff4d4f";
                break;
              default:
                color = "#000";
            }
            return <span style={{ color }}>{status}</span>;
          }}
        />
        <Column title="Loại" dataIndex="type" key="type" />
        <Column
          title="Tên khách hàng"
          dataIndex="getAccountResponse"
          key="fullName"
          render={(getAccountResponse) => getAccountResponse.fullName}
        />
        <Column
          title="Email"
          dataIndex="getAccountResponse"
          key="email"
          render={(getAccountResponse) => getAccountResponse.email}
        />
      </Table>
    </>
  );
};