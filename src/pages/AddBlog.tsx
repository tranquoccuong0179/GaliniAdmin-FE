import { Form } from "antd";
import React, { useState } from "react";
import { TextInputComponent } from "../components/TextInputComponent";
import BlogEditor from "../components/BlogEditor";
import { ButtonComponent } from "../components/ButtonComponent";
import { blog } from "../services/blogService";
import { BlogRequest } from "../dtos/typeBlog";

export const AddBlog: React.FC = () => {
  const [blogData, setBlogData] = useState<{ title: string; content: string }>({
    title: "",
    content: "",
  });

  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBlogData((prev) => ({ ...prev, title: e.target.value }));
  };

  const handleChange = (value: string) => {
    setBlogData((prev) => ({ ...prev, content: value }));
  };

  const handleCreate = async () => {
    const token = localStorage.getItem("token") || "";
    if (!token) {
      console.error("Token không tồn tại!");
      return;
    }
    const blogRequest: BlogRequest = {
      title: blogData.title,
      content: blogData.content,
    };
    const result = await blog.createBlog(blogRequest, token);
    console.log(result);
  };

  return (
    <Form layout="horizontal" className="w-96 space-y-2">
      <TextInputComponent
        label="Title"
        value={blogData.title}
        onChange={handleChangeTitle}
      />
      <BlogEditor value={blogData.content} onChange={handleChange} />
      <div style={{ marginTop: "50px" }}>
        <ButtonComponent text="Tạo blog" onClick={handleCreate} />
      </div>
    </Form>
  );
};
