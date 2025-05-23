import React from "react";
import {
  HeartOutlined,
  EllipsisOutlined,
  FundViewOutlined,
} from "@ant-design/icons";
import { Avatar, Card } from "antd";

const { Meta } = Card;

interface BlogProps {
  id: string;
  title: string;
  content: string;
  likes: number;
  views: number;
  imageUrl?: string;
  onLike: (id: string) => void;
  onClick?: () => void;
}

const BlogCard: React.FC<BlogProps> = ({
  id,
  title,
  content,
  likes,
  views,
  imageUrl,
  onClick,
  onLike,
}) => {
  return (
    <Card
      style={{
        width: "100%",
        maxWidth: 360,
        height: "100%", // Đảm bảo card có chiều cao đồng nhất
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between", // Giúp phần actions luôn ở dưới cùng
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        cursor: "pointer",
      }}
      onClick={onClick}
      cover={
        <img
          alt="blog cover"
          src={imageUrl || "https://via.placeholder.com/300"}
          style={{ height: 200, objectFit: "cover" }}
        />
      }
      actions={[
        <span key="like" onClick={(e) => {
          e.stopPropagation();
          onLike(id);
        }} 
        style={{ cursor: "pointer" }}>
          <HeartOutlined style={{ color: "red", marginRight: 5 }} />
          {likes}
        </span>,
        <span key="view" onClick={(e) => e.stopPropagation()}>
          <FundViewOutlined style={{ marginRight: 5 }} />
          {views}
        </span>,
        <EllipsisOutlined key="ellipsis" onClick={onClick} />,
      ]}
    >
      <Meta
        avatar={
          <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />
        }
        title={title}
        description={<div dangerouslySetInnerHTML={{ __html: content }} />} // Hiển thị đúng HTML
      />
    </Card>
  );
};

export default BlogCard;
