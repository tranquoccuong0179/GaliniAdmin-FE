import React, { useEffect, useState } from "react";
import { BlogData } from "../dtos/typeBlog";
import { blog } from "../services/blogService";
import { Alert, Spin } from "antd";
import styled from "styled-components";
import DOMPurify from "dompurify";
import { useParams } from "react-router-dom";

// Styled Components
const BlogContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const BlogItem = styled.div`
  margin-bottom: 40px;
  border-bottom: 1px solid #ddd;
  padding-bottom: 20px;
`;

const BlogTitle = styled.h1`
  font-size: 28px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 10px;
`;

// const BlogMeta = styled.p`
//   text-align: center;
//   font-size: 14px;
//   color: gray;
//   margin-bottom: 20px;
// `;

const BlogContent = styled.div`
  font-size: 16px;
  line-height: 1.8;
  color: #333;
  margin-top: 20px;

  p {
    margin: 10px 0;
  }

  img {
    max-width: 100%;
    height: auto;
    display: block;
    margin: 10px auto;
    border-radius: 5px;
  }
`;

const BlogDetail: React.FC = () => {
  const [blogDetail, setBlogDetail] = useState<BlogData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const { id } = useParams(); // Lấy ID từ URL

  useEffect(() => {
    const fetchBlog = async () => {
      if (id) {
        setLoading(true);
        setError("");

        try {
          const response = await blog.getBlog(id); // Gọi API để lấy blog theo ID
          setBlogDetail(response.data); // Lưu blog chi tiết vào state
        } catch (error) {
          setError("Không thể tải bài viết.");
          console.log(error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchBlog();
  }, [id]);

  if (loading) return <Spin size="large" />;
  if (error) return <Alert message={error} type="error" showIcon />;
  if (!blog)
    return <Alert message="Bài viết không tồn tại." type="error" showIcon />;

  return (
    <BlogContainer>
      <BlogItem>
        <BlogTitle>{blogDetail?.title}</BlogTitle>
        {/* <BlogMeta>
          Published on {new Date().toLocaleDateString()} by {blog.author}
        </BlogMeta> */}

        <BlogContent
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(blogDetail?.content || ""),
          }}
        />
      </BlogItem>
    </BlogContainer>
  );
};

export default BlogDetail;
