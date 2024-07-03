import React, { useState } from 'react';
import {Modal, notification } from 'antd';
import BlogForm from '../components/BlogForm';
import BlogList from '../components/BlogList';

interface Blog {
  id: number;
  title: string;
  text: string;
}

const BlogPage: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isViewMode, setIsViewMode] = useState(false);

  const handleAddBlog = (title: string, text: string) => {
    const newBlog = { id: Date.now(), title, text };
    setBlogs([...blogs, newBlog]);
    notification.success({ message: 'Blog added successfully' });
  };

  const handleViewBlog = (id: number) => {
    const blog = blogs.find((b) => b.id === id);
    if (blog) {
      setSelectedBlog(blog);
      setIsViewMode(true);
      setIsModalVisible(true);
    }
  };

  const handleDeleteBlog = (id: number) => {
    setBlogs(blogs.filter((b) => b.id !== id));
    notification.success({ message: 'Blog deleted successfully' });
  };

  const handleEditBlog = (title: string, text: string) => {
    if (selectedBlog) {
      const updatedBlogs = blogs.map((b) =>
        b.id === selectedBlog.id ? { ...b, title, text } : b
      );
      setBlogs(updatedBlogs);
      setIsModalVisible(false);
      notification.success({ message: 'Blog updated successfully' });
    }
  };

  return (
    <div className="page-container">
      <h1>Blog Page</h1>
      <div className="blog-form-container">
        <BlogForm onSubmit={handleAddBlog} />
      </div>
      <BlogList blogs={blogs} onView={handleViewBlog} onDelete={handleDeleteBlog} />
      <Modal
        visible={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
          setIsViewMode(false);
        }}
        footer={null}
      >
        {isViewMode && selectedBlog ? (
          <div>
            <h2>{selectedBlog.title}</h2>
            <p>{selectedBlog.text}</p>
          </div>
        ) : (
          selectedBlog && (
            <BlogForm
              onSubmit={handleEditBlog}
              initialData={{ title: selectedBlog.title, text: selectedBlog.text }}
            />
          )
        )}
      </Modal>
    </div>
  );
};

export default BlogPage;
