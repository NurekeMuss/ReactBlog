import React, { useState, useEffect } from 'react';
import { Button, Form, Input } from 'antd';

interface BlogFormProps {
  onSubmit: (title: string, text: string) => void;
  initialData?: { title: string; text: string };
}

const BlogForm: React.FC<BlogFormProps> = ({ onSubmit, initialData }) => {
  const [title, setTitle] = useState(initialData?.title || '');
  const [text, setText] = useState(initialData?.text || '');

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setText(initialData.text);
    }
  }, [initialData]);

  const handleSubmit = () => {
    onSubmit(title, text);
    setTitle('');
    setText('');
  };

  return (
    <Form layout="vertical">
      <Form.Item label="Title">
        <Input value={title} onChange={(e) => setTitle(e.target.value)} />
      </Form.Item>
      <Form.Item label="Text">
        <Input.TextArea value={text} onChange={(e) => setText(e.target.value)} />
      </Form.Item>
      <Button type="primary" onClick={handleSubmit}>
        Submit
      </Button>
    </Form>
  );
};

export default BlogForm;
