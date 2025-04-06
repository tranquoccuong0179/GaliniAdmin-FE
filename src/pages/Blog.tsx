import React, { useEffect, useState } from "react";
import { BlogData } from "../dtos/typeBlog";
import { blog } from "../services/blogService";
import { Alert, Pagination, Spin } from "antd";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import BlogCard from "../components/BlogCard"; // Import component mới
import { ButtonComponent } from "../components/ButtonComponent";

// Styled Components (Giữ nguyên style cũ)
const BlogContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  justify-content: flex-start;
`;

const BlogItem = styled.div`
  flex: 1 1 calc(33.33% - 20px);
  max-width: calc(33.33% - 20px);
  display: flex;
  justify-content: center;
`;

const PaginationContainer = styled.div`
  margin-top: 20px;
  text-align: center;
`;

const Blog: React.FC = () => {
  const [blogs, setBlogs] = useState<BlogData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(9);
  const [total, setTotal] = useState<number>(0)
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      setError("");

      const response = await blog.getBlogs({
        page, size,
      });

      if (response.data?.items && Array.isArray(response.data.items)) {
        setBlogs(response.data.items);
        setTotal(response.data.total || 0)
      } else {
        setError("Không thể tải danh sách blog.");
      }

      setLoading(false);
    };

    fetchBlogs();
  }, [page, size]);

  // Hàm lấy tấm hình đầu tiên trong content
  const extractFirstImage = (content: string) => {
    const match = content.match(/<img.*?src="(.*?)".*?>/);
    return match ? match[1] : "";
  };
  const handleLike = async (id: string) => {
    try {
      const response = await blog.likeBlog(id);
      setBlogs((prevBlogs) =>
        prevBlogs.map((blog) =>
          blog.id === id ? { ...blog, likes: response.data.likes } : blog
        )
      );
    } catch (err) {
      console.error("Lỗi khi like bài viết:", err);
    }
  };

  const handlePaginationChange = (newPage: number, newPageSize: number) => {
    setPage(newPage);
    setSize(newPageSize);
  };

  const handleButton = () => navigate("/blog/add");

  return (
    <div>
      <div style={{ marginBottom: 16, textAlign: "right" }}>
        <ButtonComponent text="Thêm gói Premium" onClick={handleButton} />
      </div>
      <BlogContainer>
        {loading && <Spin size="large" />}
        {error && <Alert message={error} type="error" showIcon />}

        {blogs.map((blog) => (
          <BlogItem key={blog.id}>
            <BlogCard
              id={blog.id}
              title={blog.title}
              content={blog.content.substring(0, 100) + "..."}
              likes={blog.likes || 0}
              views={blog.views || 0}
              imageUrl={extractFirstImage(blog.content)}
              onClick={() => navigate(`/blog/${blog.id}`)}
              onLike={handleLike}
            />
          </BlogItem>
        ))}
      </BlogContainer>

      {!loading && !error && blogs.length > 0 && (
        <PaginationContainer>
          <Pagination
            current={page}
            pageSize={size}
            total={total}
            pageSizeOptions={[3, 6, 9, 12]} 
            showSizeChanger
            showTotal={(total) => `Tổng ${total} bài viết`}
            onChange={handlePaginationChange}
          />
        </PaginationContainer>
      )}
    </div>
  );
};

export default Blog;
