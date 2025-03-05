import React, { useState, useRef, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios"; // To make the POST request

interface BlogEditorProps {
  value: string;
  onChange: (content: string) => void;
}

const BlogEditor: React.FC<BlogEditorProps> = ({ value, onChange }) => {
  const [isUploading, setIsUploading] = useState(false); // State to track upload process
  const quillRef = useRef<ReactQuill>(null); // Ref to get Quill editor instance

  // Handle image upload when image button is clicked
  const handleImageUpload = async (file: File) => {
    setIsUploading(true); // Start uploading

    const formData = new FormData();
    formData.append("formFile", file);

    try {
      const response = await axios.post(
        "https://harmon.love/api/v1/upload-img", // Your API endpoint
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Make sure the request is form data
          },
        }
      );

      const imageUrl = response.data.data; // Get the uploaded image URL from the response

      if (response.data.status === "200") {
        // Insert the image URL into the Quill editor at the current cursor position
        if (quillRef.current) {
          const editor = quillRef.current.getEditor();
          const range = editor.getSelection();
          if (range) {
            editor.insertEmbed(range.index, "image", imageUrl); // Insert image at cursor
          }
        }
        alert("Image uploaded successfully!");
      } else {
        console.error(response.data.message);
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Image upload failed", error);
      alert("Failed to upload the image.");
    } finally {
      setIsUploading(false); // Reset upload state
    }
  };

  // Custom image handler
  const imageHandler = () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = () => {
      const file = input.files?.[0];
      if (file) {
        handleImageUpload(file); // Upload the selected image
      }
    };
  };

  useEffect(() => {
    // Override the default image handler of ReactQuill's toolbar
    if (quillRef.current) {
      const quill = quillRef.current.getEditor();
      const toolbar = quill.getModule("toolbar");

      // Add custom image handler
      toolbar.addHandler("image", imageHandler);
    }
  }, []);

  return (
    <div>
      <ReactQuill
        ref={quillRef} // Attach the Quill instance
        theme="snow"
        value={value}
        onChange={onChange}
        modules={{
          toolbar: [
            [{ header: [1, 2, 3, false] }],
            ["bold", "italic", "underline"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link", "image"], // Image button in toolbar
            ["clean"],
          ],
        }}
        formats={[
          "header",
          "bold",
          "italic",
          "underline",
          "list",
          "bullet",
          "link",
          "image",
        ]}
      />
      <h3>Post content:</h3>
      <div
        className="content-preview"
        dangerouslySetInnerHTML={{ __html: value }}
      />

      {/* Handle uploading state */}
      {isUploading && <p>Uploading image...</p>}
    </div>
  );
};

export default BlogEditor;
