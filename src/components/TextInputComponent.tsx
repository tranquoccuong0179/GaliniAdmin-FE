import { Form, Input } from "antd";
import React from "react";

interface TextInputProps {
  label?: string;
  type?: string;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  icon?: React.ReactNode;
  size?: "small" | "middle" | "large";
  placeholder?: string;
  style?: React.CSSProperties
}

export const TextInputComponent: React.FC<TextInputProps> = ({
  label,
  type = "text",
  value,
  onChange,
  icon,
  size = "large",
  placeholder,
  style
}) => {
  return (
    <Form.Item
      label={label}
      labelAlign="left"
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 18 }}
      className="w-full"
      style={{ width: "420px", ...style}}
    >
      <Input
        size={size}
        type={type}
        value={value}
        onChange={onChange}
        prefix={icon}
        placeholder={placeholder}
        className="rounded-lg w-full"
      />
    </Form.Item>
  );
};
