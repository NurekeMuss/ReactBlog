import React, { useState, useEffect } from 'react';
import { List, Button, Modal, Pagination, Spin, notification, Form, Input } from 'antd';
import axios from 'axios';

interface Post {
  id: number;
  title: string;
  body: string;
}

const FakeApiPage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
        setTimeout(() => {
          setPosts(response.data);
          setLoading(false);
          notification.success({
            message: 'Data Loaded Successfully',
            description: 'Posts data has been loaded successfully.',
          });
        }, 500); // Имитация задержки загрузки данных
      } catch (error) {
        setLoading(false);
        notification.error({
          message: 'Data Load Failed',
          description: 'Failed to load posts data.',
        });
      }
    };
    fetchPosts();
  }, []);

  const handleViewPost = (id: number) => {
    const post = posts.find((p) => p.id === id);
    if (post) {
      setSelectedPost(post);
      setIsModalVisible(true);
      setIsEditMode(false);
    }
  };

  const handleEditPost = (id: number) => {
    const post = posts.find((p) => p.id === id);
    if (post) {
      setSelectedPost(post);
      setIsModalVisible(true);
      setIsEditMode(true);
      form.setFieldsValue({
        title: post.title,
        body: post.body,
      });
    }
  };

  const handleDeletePost = async (id: number) => {
    try {
      setLoading(true);
      await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
      setTimeout(() => {
        setPosts(posts.filter((p) => p.id !== id));
        setLoading(false);
        notification.success({
          message: 'Post Deleted Successfully',
          description: `Post with id ${id} has been deleted.`,
        });
      }, 500);
    } catch (error) {
      setLoading(false);
      notification.error({
        message: 'Delete Failed',
        description: `Failed to delete post with id ${id}.`,
      });
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleEditSubmit = async (values: { title: string; body: string }) => {
    if (selectedPost) {
      try {
        setLoading(true);
        await axios.put(`https://jsonplaceholder.typicode.com/posts/${selectedPost.id}`, {
          title: values.title,
          body: values.body,
        });
        setTimeout(() => {
          setPosts(
            posts.map((post) =>
              post.id === selectedPost.id
                ? { ...post, title: values.title, body: values.body }
                : post
            )
          );
          setLoading(false);
          setIsModalVisible(false);
          notification.success({
            message: 'Post Updated Successfully',
            description: `Post with id ${selectedPost.id} has been updated.`,
          });
        }, 500);
      } catch (error) {
        setLoading(false);
        notification.error({
          message: 'Update Failed',
          description: `Failed to update post with id ${selectedPost.id}.`,
        });
      }
    }
  };

  const indexOfLastPost = currentPage * pageSize;
  const indexOfFirstPost = indexOfLastPost - pageSize;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <div className="page-container">
      <h1>Fake API Page</h1>
      {loading ? (
        <Spin size="large" />
      ) : (
        <>
          <List
            itemLayout="horizontal"
            dataSource={currentPosts}
            renderItem={(item) => (
              <List.Item
                actions={[
                  <Button onClick={() => handleViewPost(item.id)}>View</Button>,
                  <Button onClick={() => handleEditPost(item.id)}>Edit</Button>,
                  <Button danger onClick={() => handleDeletePost(item.id)}>Delete</Button>,
                ]}
              >
                <List.Item.Meta
                  title={item.title}
                  description={item.body.slice(0, 100)} // Показываем первые 100 символов текста
                />
              </List.Item>
            )}
          />
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={posts.length}
            onChange={handlePageChange}
          />
        </>
      )}
      <Modal
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        {selectedPost && (
          isEditMode ? (
            <Form
              form={form}
              layout="vertical"
              onFinish={handleEditSubmit}
              initialValues={{
                title: selectedPost.title,
                body: selectedPost.body,
              }}
            >
              <Form.Item
                name="title"
                label="Title"
                rules={[{ required: true, message: 'Please input the title!' }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="body"
                label="Body"
                rules={[{ required: true, message: 'Please input the body!' }]}
              >
                <Input.TextArea rows={4} />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          ) : (
            <div>
              <h2>{selectedPost.title}</h2>
              <p>{selectedPost.body}</p>
            </div>
          )
        )}
      </Modal>
    </div>
  );
};

export default FakeApiPage;
