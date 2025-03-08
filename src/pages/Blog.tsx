import React, { useEffect, useState } from "react";
import { BlogData } from "../dtos/typeBlog";
import { blog } from "../services/blogService";
import { Alert, Button, Spin } from "antd";
import styled from "styled-components";
import DOMPurify from "dompurify";
import { useNavigate } from "react-router-dom";

// Styled Components(Content)
const BlogContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const BlogItem = styled.div`
  margin-bottom: 40px;
  border-bottom: 1px solid #ddd;
  padding-bottom: 20px;
  display: flex;
  align-items: center;
`;

const BlogImage = styled.img`
  max-width: 100px;
  height: auto;
  margin-right: 20px;
  border-radius: 8px;
`;

const BlogContentContainer = styled.div`
  flex: 1;
`;

const BlogTitle = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin: 10px 0;
`;

const BlogMeta = styled.p`
  font-size: 14px;
  color: gray;
  margin: 5px 0;
`;

const BlogStats = styled.div`
  font-size: 14px;
  color: #555;
  margin: 5px 0;
`;

const BlogContentPreview = styled.div`
  font-size: 16px;
  line-height: 1.8;
  color: #333;
  margin-top: 10px;
  max-height: 100px;
  overflow: hidden;
`;

const BlogContentFull = styled.div`
  font-size: 16px;
  line-height: 1.8;
  color: #333;
  margin-top: 10px;
`;

const ReadMoreButton = styled(Button)`
  display: block;
  margin: 20px auto;
  text-align: center;
`;

const Blog: React.FC = () => {
  const [blogs, setBlogs] = useState<BlogData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [expandedBlogId, setExpandedBlogId] = useState<string | null>(null);
  const navigate = useNavigate();

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

  const handleReadMore = (id: string) => {
    setExpandedBlogId(id);
    navigate(`/blog/${id}`);
  };

  // Hàm lấy tấm hình đầu tiên
  const extractFirstImage = (content: string) => {
    const match = content.match(/<img.*?src="(.*?)".*?>/);
    return match ? match[1] : "";
  };

  return (
    <BlogContainer>
      {loading && <Spin size="large" />}
      {error && <Alert message={error} type="error" showIcon />}

      {blogs.map((blog) => (
        <BlogItem key={blog.id}>
          {/** Image extraction */}
          <BlogImage
            src={extractFirstImage(blog.content)}
            alt="Blog Thumbnail"
          />

          <BlogContentContainer>
            <BlogTitle>{blog.title}</BlogTitle>
            <BlogMeta>
              Published on {new Date().toLocaleDateString()} by Author
            </BlogMeta>
            {
              <BlogStats>
                {blog.like} Likes | {blog.view} Views
              </BlogStats>
            }

            <BlogContentPreview
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(blog.content.substring(0, 200)),
              }}
            />

            {expandedBlogId === blog.id && (
              <BlogContentFull
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(blog.content),
                }}
              />
            )}

            <ReadMoreButton
              type="primary"
              onClick={() => handleReadMore(blog.id)}
            >
              {expandedBlogId === blog.id ? "Show Less" : "Read More"}
            </ReadMoreButton>
          </BlogContentContainer>
        </BlogItem>
      ))}
    </BlogContainer>
  );
};

export default Blog;
