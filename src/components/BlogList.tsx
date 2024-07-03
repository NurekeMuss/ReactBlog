import React from 'react';
import { List, Button } from 'antd';

interface Blog {
  id: number;
  title: string;
  text: string;
}

interface BlogListProps {
  blogs: Blog[];
  onView: (id: number) => void;
  onDelete: (id: number) => void;
}

const BlogList: React.FC<BlogListProps> = ({ blogs, onView, onDelete }) => (
  <List
    itemLayout="horizontal"
    dataSource={blogs}
    renderItem={(item) => (
      <List.Item
        actions={[
          <Button onClick={() => onView(item.id)}>View</Button>,
          <Button danger onClick={() => onDelete(item.id)}>Delete</Button>,
        ]}
      >
        <List.Item.Meta
          title={item.title}
          description={item.text.slice(0, 100)} // Показываем первые 100 символов текста
        />
      </List.Item>
    )}
  />
);

export default BlogList;
