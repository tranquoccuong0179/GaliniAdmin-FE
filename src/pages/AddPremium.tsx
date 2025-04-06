import { Form, Select, message } from "antd";
import React, { useState } from "react";
import { TextInputComponent } from "../components/TextInputComponent";
import { ButtonComponent } from "../components/ButtonComponent";
import { premiumService } from "../services/premiumService";
import { PremiumRequest } from "../dtos/typePremium";
import { useNavigate } from "react-router-dom";

export const AddPremium: React.FC = () => {
  const [premiumData, setPremiumData] = useState<{
    type: string;
    friend: string;
    timelimit?: boolean;
    match: string;
    price: string;
  }>({
    type: "",
    friend: "",
    timelimit: undefined,
    match: "",
    price: "",
  });
//   const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleChangeType = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPremiumData((prev) => ({ ...prev, type: e.target.value }));
  };

  const handleChangeFriend = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPremiumData((prev) => ({ ...prev, friend: e.target.value }));
  };

  const handleChangeTimelimit = (value: string) => {
    setPremiumData((prev) => ({
      ...prev,
      timelimit: value === "true" ? true : value === "false" ? false : undefined,
    }));
  };

  const handleChangeMatch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPremiumData((prev) => ({ ...prev, match: e.target.value }));
  };

  const handleChangePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPremiumData((prev) => ({ ...prev, price: e.target.value }));
  };

  const handleCreate = async () => {
    const token = localStorage.getItem("token") || "";
    if (!token) {
      message.error("Token không tồn tại! Vui lòng đăng nhập lại.");
      return;
    }

    if (!premiumData.type) {
      message.error("Vui lòng nhập loại gói (Type)!");
      return;
    }

    const premiumRequest: PremiumRequest = {
      Type: premiumData.type,
      Friend: premiumData.friend,
      Timelimit: premiumData.timelimit,
      Match: premiumData.match ? parseInt(premiumData.match) : undefined,
      Price: premiumData.price ? parseFloat(premiumData.price) : undefined,
    };

    try {
    //   setLoading(true);
      const result = await premiumService.createPremium(premiumRequest);
      if (result.status === "200") {
        message.success(result.message || "Tạo gói Premium thành công!");
        navigate("/premium");
      } else {
        message.error(result.message || "Có lỗi xảy ra khi tạo gói Premium.");
      }
    } catch (error) {
      console.error("Lỗi khi tạo gói Premium:", error);
      message.error("Không thể tạo gói Premium. Vui lòng thử lại!");
    } finally {
    //   setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/premium");
  };

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "40px auto",
        padding: "24px",
        backgroundColor: "#fff",
        borderRadius: "8px",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          marginBottom: "24px",
          color: "#9255BE",
          fontWeight: "bold",
        }}
      >
        Tạo gói Premium mới
      </h2>
      <Form layout="vertical" className="space-y-4">
        <TextInputComponent
          label="Loại gói (Type)"
          value={premiumData.type}
          onChange={handleChangeType}
          placeholder="Nhập loại gói (VD: VIP, Standard)"
          style={{ width: "100%" }}
        />
        <TextInputComponent
          label="Số bạn bè (Friend)"
          value={premiumData.friend}
          onChange={handleChangeFriend}
          placeholder="Nhập số bạn bè (VD: 5)"
          style={{ width: "100%" }}
        />
        <Form.Item label="Giới hạn thời gian (Timelimit)">
          <Select
            placeholder="Chọn giới hạn thời gian"
            value={
              premiumData.timelimit === undefined
                ? undefined
                : premiumData.timelimit.toString()
            }
            onChange={handleChangeTimelimit}
            style={{ width: "100%" }}
          >
            <Select.Option value="true">Có</Select.Option>
            <Select.Option value="false">Không</Select.Option>
            <Select.Option value="">Không xác định</Select.Option>
          </Select>
        </Form.Item>
        <TextInputComponent
          label="Số trận (Match)"
          value={premiumData.match}
          onChange={handleChangeMatch}
          placeholder="Nhập số trận (VD: 10)"
          style={{ width: "100%" }}
        />
        <TextInputComponent
          label="Giá (Price)"
          value={premiumData.price}
          onChange={handleChangePrice}
          placeholder="Nhập giá (VD: 50000)"
          style={{ width: "100%" }}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "16px",
            marginTop: "24px",
          }}
        >
          <ButtonComponent
            text="Tạo gói Premium"
            onClick={handleCreate}
            // disabled={loading}
            style={{
              backgroundColor: "#9255BE",
              color: "#fff",
              borderRadius: "20px",
              padding: "0 24px",
            }}
          />
          <ButtonComponent
            text="Hủy"
            onClick={handleCancel}
            style={{
              backgroundColor: "#f5f5f5",
              color: "#9255BE",
              borderRadius: "20px",
              padding: "0 24px",
            }}
          />
        </div>
      </Form>
    </div>
  );
};