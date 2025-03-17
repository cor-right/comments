import { Avatar, Button, Comment, Form, Input, List } from 'antd';
import "antd/dist/antd.min.css";
import moment from 'moment';
import React, { useState } from 'react';
const { TextArea } = Input;
const ExampleComment = ({ children }) => (
    <Comment
        actions={[<span key="comment-nested-reply-to">Reply to</span>]}
        author={<a>Han Solo</a>}
        avatar={<Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />}
        content={
            <p>
                We supply a series of design principles, practical patterns and high quality design
                resources (Sketch and Axure).
            </p>
        }
    >
        {children}
    </Comment>
);

const Editor = ({ onChange, onSubmit, submitting, value }) => (
    <>
        <Form.Item>
            <TextArea rows={4} onChange={onChange} value={value} />
        </Form.Item>
        <Form.Item>
            <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
                Add Comment
            </Button>
        </Form.Item>
    </>
);

const CommentsPage = () => {
    const [comments, setComments] = useState([]);
    const [submitting, setSubmitting] = useState(false);
    const [value, setValue] = useState('');
    const handleSubmit = () => {
        if (!value) return;
        setSubmitting(true);
        setTimeout(() => {
            setSubmitting(false);
            setValue('');
            setComments([
                ...comments,
                {
                    author: 'Han Solo',
                    avatar: 'https://joeschmoe.io/api/v1/random',
                    content: <p>{value}</p>,
                    datetime: moment('2016-11-22').fromNow(),
                },
            ]);
        }, 1000);
    };
    const handleChange = (e) => {
        setValue(e.target.value);
    };


    return (
        <ExampleComment
            content={
                <Editor
                    onChange={handleChange}
                    onSubmit={handleSubmit}
                    submitting={submitting}
                    value={value}
                />
            }>
            <ExampleComment>
                <ExampleComment />
                <ExampleComment />
            </ExampleComment>
        </ExampleComment>
    );
};

export default CommentsPage;