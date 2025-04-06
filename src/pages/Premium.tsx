import React, { useEffect, useState } from "react";
import { Table, message, Alert, Select, Checkbox, Button, TablePaginationConfig, Form } from "antd";
import Column from "antd/es/table/Column";
import { ButtonComponent } from "../components/ButtonComponent";
import { useNavigate } from "react-router-dom";
import { ReloadOutlined } from "@ant-design/icons";
import { TextInputComponent } from "../components/TextInputComponent";
import { PremiumData } from "../dtos/typePremium";
import { premiumService } from "../services/premiumService";

export const Premium: React.FC = () => {
  const [premiums, setPremiums] = useState<PremiumData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const [friend, setFriend] = useState<number | undefined>();
  const [timelimit, setTimelimit] = useState<boolean | undefined>();
  const [match, setMatch] = useState<number | undefined>();
  const [minPrice, setMinPrice] = useState<number | undefined>();
  const [maxPrice, setMaxPrice] = useState<number | undefined>();

  const [sortByFriend, setSortByFriend] = useState<boolean | undefined>();
  const [sortByMatch, setSortByMatch] = useState<boolean | undefined>();
  const [sortByPrice, setSortByPrice] = useState<boolean | undefined>();
  const [sortByTimelimit, setSortByTimelimit] = useState<boolean | undefined>();

  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [total, setTotal] = useState<number>(0);

  const fetchPremiums = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await premiumService.getPremiums({
        page,
        size,
        friend,
        timelimit,
        match,
        minPrice,
        maxPrice,
        sortByFriend,
        sortByMatch,
        sortByPrice,
        sortByTimelimit,
      });

      console.log("API Response:", response);

      if (response?.data?.items && Array.isArray(response.data.items)) {
        setPremiums(response.data.items);
        setTotal(response.data.total || 0);
      } else {
        console.error("Dữ liệu không phải mảng:", response.data);
        setError("Dữ liệu trả về không hợp lệ.");
      }
    } catch (error) {
      console.error("Lỗi khi lấy danh sách premium:", error);
      setError("Không thể tải danh sách premium.");
      message.error("Lỗi khi tải danh sách premium!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPremiums();
  }, [page, size, friend, timelimit, match, minPrice, maxPrice, sortByFriend, sortByMatch, sortByPrice, sortByTimelimit]);

  const handleButton = () => navigate("/premium/add");

  const handleTableChange = (pagination: TablePaginationConfig) => {
    setPage(pagination.current || 1);
    setSize(pagination.pageSize || 10);
  };

  return (
    <>
      <div>
        <TextInputComponent
          style={{width: "30%"}}
          label="Số bạn bè"
          value={friend?.toString()}
          onChange={(e) => setFriend(e.target.value ? parseInt(e.target.value) : undefined)}
        />
        <Form
            labelCol={{ span: 1.5 }} 
            wrapperCol={{ span: 1 }} 
            >
            <Form.Item label="Giới hạn thời gian">
                <Select
                placeholder="Chọn giới hạn thời gian"
                onChange={(value) =>
                    setTimelimit(value === "true" ? true : value === "false" ? false : undefined)
                }
                style={{ width: 360, height: 40 }}
                >
                <Select.Option value="true">Có</Select.Option>
                <Select.Option value="false">Không</Select.Option>
                <Select.Option value="">Không xác định</Select.Option>
                </Select>
            </Form.Item>
        </Form>
        <TextInputComponent
          style={{width: "30%"}}
          label="Số trận"
          value={match?.toString()}
          onChange={(e) => setMatch(e.target.value ? parseInt(e.target.value) : undefined)}
        />
        <TextInputComponent
          style={{width: "30%"}}
          label="Giá tối thiểu"
          value={minPrice?.toString()}
          onChange={(e) => setMinPrice(e.target.value ? parseFloat(e.target.value) : undefined)}
        />
        <TextInputComponent
          style={{width: "30%"}}
          label="Giá tối đa"
          value={maxPrice?.toString()}
          onChange={(e) => setMaxPrice(e.target.value ? parseFloat(e.target.value) : undefined)}
        />

        <Checkbox
          checked={sortByFriend}
          onChange={(e) => setSortByFriend(e.target.checked)}
        >
          Sắp xếp theo số bạn bè
        </Checkbox>
        <Checkbox
          checked={sortByMatch}
          onChange={(e) => setSortByMatch(e.target.checked)}
        >
          Sắp xếp theo số trận
        </Checkbox>
        <Checkbox
          checked={sortByPrice}
          onChange={(e) => setSortByPrice(e.target.checked)}
        >
          Sắp xếp theo giá
        </Checkbox>
        <Checkbox
          checked={sortByTimelimit}
          onChange={(e) => setSortByTimelimit(e.target.checked)}
        >
          Sắp xếp theo giới hạn thời gian
        </Checkbox>

        <Button
          shape="circle"
          icon={<ReloadOutlined />}
          onClick={fetchPremiums}
          style={{ backgroundColor: "#F7DCFF", color: "#9255BE" }}
        />
      </div>

      <div style={{ marginBottom: 16, textAlign: "right" }}>
        <ButtonComponent text="Thêm gói Premium" onClick={handleButton} />
      </div>

      {error && <Alert message={error} type="error" showIcon />}

      <Table<PremiumData>
        dataSource={premiums}
        rowKey="id"
        loading={loading}
        bordered
        pagination={{
            current: page,
            pageSize: size,
            total: total,
            pageSizeOptions: [5, 10, 20, 50],
            showSizeChanger: true,
            showTotal: (total) => `Tổng ${total} gói premium`,
        }}
        onChange={handleTableChange}
        >
        <Column title="ID" dataIndex="id" key="id" />
        <Column title="Loại" dataIndex="type" key="type" /> {/* Thay Type thành type */}
        <Column title="Số bạn bè" dataIndex="friend" key="friend" /> {/* Thay Friend thành friend */}
        <Column
            title="Giới hạn thời gian"
            dataIndex="timelimit" // Thay Timelimit thành timelimit
            key="timelimit"
            render={(timelimit?: boolean) => (timelimit ? "Có" : "Không")}
        />
        <Column title="Số trận" dataIndex="match" key="match" /> {/* Thay Match thành match */}
        <Column
            title="Giá"
            dataIndex="price" // Thay Price thành price
            key="price"
            render={(price?: number) =>
            price?.toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
            }) || "Chưa xác định"
            }
        />
        </Table>
    </>
  );
};