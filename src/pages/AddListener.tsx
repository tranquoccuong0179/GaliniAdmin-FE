import React, { useState } from "react";
import {
  CreateListenerInfoModel,
  GenderEnum,
  ListenerTypeEnum,
} from "../dtos/typeListener";
import { Col, Form, Row, Select } from "antd";
import { TextInputComponent } from "../components/TextInputComponent";
import { ButtonComponent } from "../components/ButtonComponent";
import { KeyOutlined, MailOutlined, PhoneOutlined, UserOutlined } from "@ant-design/icons";
import { listener } from "../services/listenerService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const AddListener: React.FC = () => {
  const [listenerData, setListenerData] = useState<CreateListenerInfoModel>({
    registerRequest: {
      userName: "",
      password: "",
      fullName: "",
      email: "",
      phone: "",
      dateOfBirth: "",
      gender: GenderEnum.Male,
      avatarUrl: "",
      weight: 0,
    },
    listenerRequest: {
      description: "",
      listenerType: ListenerTypeEnum.Share,
      price: 0,
    },
  });

  const navigate = useNavigate();

  const handleChange = (field: string, value: string | number | ListenerTypeEnum | GenderEnum, isListenerField = false) => {
    setListenerData((prev) => ({
      ...prev,
      [isListenerField ? "listenerRequest" : "registerRequest"]: {
        ...prev[isListenerField ? "listenerRequest" : "registerRequest"],
        [field]: value,
      },
    }));
  };

  const handleSubmit = async () => {
    try {
      const result = await listener.createListener(listenerData);
  
      if (result.status === "200") {  
        toast.success("Thêm người nghe thành công");
        navigate("/listener");
      } else {
        toast.error("Thêm người nghe thất bại");
      }
    } catch (error) {
      toast.error("Thêm người nghe thất bại");
      console.error("Error:", error);
    }
  };
  

  return (
    <div
      style={{
        backgroundColor: "#DECFFF",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      <h1 style={{ color: "#6a0dad", fontWeight: "bold", fontSize: "2rem" }}>
        Tạo Người Nghe
      </h1>
      {/* Thông tin tài khoản */}
      <Form layout="vertical" className="w-96 space-y-2">
  <Row gutter={16}>
    <Col span={12}>
      <TextInputComponent label="Username" value={listenerData.registerRequest.userName} onChange={(e) => handleChange("userName", e.target.value)} icon={<UserOutlined />} />
    </Col>
    <Col span={12}>
      <TextInputComponent label="Mật khẩu" type="password" value={listenerData.registerRequest.password} onChange={(e) => handleChange("password", e.target.value)} icon={<KeyOutlined />} />
    </Col>
  </Row>

  <Row gutter={16}>
    <Col span={12}>
      <TextInputComponent label="Họ và tên" value={listenerData.registerRequest.fullName} onChange={(e) => handleChange("fullName", e.target.value)} />
    </Col>
    <Col span={12}>
      <TextInputComponent label="Email" type="email" value={listenerData.registerRequest.email} onChange={(e) => handleChange("email", e.target.value)} icon={<MailOutlined />} />
    </Col>
  </Row>

  <Row gutter={16}>
    <Col span={12}>
      <TextInputComponent label="Số điện thoại" value={listenerData.registerRequest.phone} onChange={(e) => handleChange("phone", e.target.value)} icon={<PhoneOutlined />} />
    </Col>
    <Col span={12}>
      <TextInputComponent label="Ngày sinh" type="date" value={listenerData.registerRequest.dateOfBirth} onChange={(e) => handleChange("dateOfBirth", e.target.value)} />
    </Col>
  </Row>

  <Row gutter={16}>
    <Col span={12}>
      <Form.Item label="Giới tính">
        <Select value={listenerData.registerRequest.gender} onChange={(value) => handleChange("gender", value)}>
          {Object.values(GenderEnum).map((gender) => (
            <Select.Option key={gender} value={gender}>
              {gender}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
    </Col>
    <Col span={12}>
      <TextInputComponent label="Avatar URL" value={listenerData.registerRequest.avatarUrl} onChange={(e) => handleChange("avatarUrl", e.target.value)} />
    </Col>
  </Row>

  <Row gutter={16}>
    <Col span={12}>
      <TextInputComponent label="Cân nặng (kg)" type="number" value={listenerData.registerRequest.weight.toString()} onChange={(e) => handleChange("weight", parseFloat(e.target.value))} />
    </Col>

    {/* Thông tin người nghe */}
    <Col span={12}>
      <TextInputComponent label="Mô tả" value={listenerData.listenerRequest.description} onChange={(e) => handleChange("description", e.target.value, true)} />
    </Col>
  </Row>

  <Row gutter={16}>
    <Col span={12}>
      <Form.Item label="Loại người nghe">
        <Select value={listenerData.listenerRequest.listenerType} onChange={(value) => handleChange("listenerType", value, true)}>
          {Object.values(ListenerTypeEnum).map((type) => (
            <Select.Option key={type} value={type}>
              {type}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
    </Col>
    <Col span={12}>
      <TextInputComponent label="Giá" type="number" value={listenerData.listenerRequest.price.toString()} onChange={(e) => handleChange("price", parseFloat(e.target.value), true)} />
    </Col>
  </Row>

  <div style={{ marginTop: "20px", textAlign: "center" }}>
    <ButtonComponent text="Tạo Người Nghe" onClick={handleSubmit} />
  </div>
</Form>
    </div>
  );
};
