import React, { useEffect, useState } from "react";
import { BlogData } from "../dtos/typeBlog";
import { blog } from "../services/blogService";
import { Alert, Spin } from "antd";
import styled from "styled-components";
import DOMPurify from "dompurify"; // Bảo vệ khỏi XSS

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

const BlogMeta = styled.p`
  text-align: center;
  font-size: 14px;
  color: gray;
  margin-bottom: 20px;
`;

// const BlogImage = styled.img`
//   max-width: 100%;
//   max-height: 400px; /* Giới hạn chiều cao */
//   height: auto;
//   display: block;
//   margin: 10px auto; /* Căn giữa ảnh */
//   border-radius: 8px;
//   object-fit: contain; /* Giữ nguyên tỷ lệ ảnh */
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

// const ReadMoreButton = styled(Button)`
//   display: block;
//   margin: 20px auto;
//   text-align: center;
// `;

const Blog: React.FC = () => {
  const [blogs, setBlogs] = useState<BlogData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  // const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      setError("");

      const response = await blog.getBlogs();

      if (response.data?.items && Array.isArray(response.data.items)) {
        setBlogs(response.data.items);
      } else {
        setError("Không thể tải danh sách blog.");
      }

      setLoading(false);
    };

    fetchBlogs();
  }, []);

  // const handleReadMore = (id: string) => {
  //   navigate(`/blog/${id}`);
  // };

  return (
    <BlogContainer>
      {loading && <Spin size="large" />}
      {error && <Alert message={error} type="error" showIcon />}

      {blogs.map((blog) => (
        <BlogItem key={blog.id}>
          <BlogTitle>{blog.title}</BlogTitle>
          <BlogMeta>Published on {new Date().toLocaleDateString()} by Author</BlogMeta>
          {/* {blog.content.includes("<img") && (
            <BlogImage
              src={blog.content.match(/<img.*?src="(.*?)".*?>/)?.[1]}
              alt="Blog Cover"
            />
          )} */}

          <BlogContent dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(blog.content) }} />

          {/* <ReadMoreButton type="primary" onClick={() => handleReadMore(blog.id)}>
            Read More
          </ReadMoreButton> */}
        </BlogItem>
      ))}
    </BlogContainer>
  );
};

export default Blog;
