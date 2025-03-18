import "antd/dist/antd.min.css";
import { Avatar, Button, Comment, Form, Input, List } from 'antd';
import moment from 'moment';
import React, { useState, useRef } from 'react';
const { TextArea } = Input;

/**
 * 评论列表
 * @param {*} param0 
 * @returns 
 */
const CommentList = ({ comments }) => (
    <List
        dataSource={comments}
        header={`${comments.length} ${'条评论'}`}
        itemLayout="horizontal"
        renderItem={(props) => <Comment {...props} />}
    />
);

// 评论提交
const Editor = ({ onChange, onSubmit, submitting, value, sharedProps }) => (
    <>
        <Form.Item>
            <TextArea rows={4} onChange={onChange} value={value} {...sharedProps} />
        </Form.Item>
        <Form.Item>
            <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
                评论发布
            </Button>
        </Form.Item>
    </>
);


const CommentsPage = () => {
    // 评论列表更新
    const [comments, setComments] = useState([]);
    // 提交状态更新
    const [submitting, setSubmitting] = useState(false);
    const [currentComment, setCommentValue] = useState('');

    // 焦点
    const inputRef = useRef(null);

    const sharedProps = {
        ref: inputRef,
        // rows:4,
        //  onChange={onChange} value={value} 
    };


    // 提交触发
    const handleSubmit = () => {
        if (!currentComment) return;

        setSubmitting(true);
        setTimeout(() => {
            setSubmitting(false);
            setCommentValue('');
            setComments([
                ...comments,
                {
                    author: 'Han Solo',
                    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                    content: <p>{currentComment}</p>,
                    datetime: moment('2016-11-22').fromNow(),
                    actions: [<span key="comment-list-reply-to-0" onClick={onReplyClick}>Reply to</span>],
                },
            ]);
        }, 1000);
    };

    const handleChange = (e) => {
        setCommentValue(e.target.value);
    };

    // reply点击监听
    const onReplyClick = () => {
        inputRef.current.focus({
            cursor: 'start',
        });
    }

    return (
        <>
            {comments.length > 0 && <CommentList comments={comments} />}
            <Comment
                avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" alt="Han Solo" />}
                content={
                    <Editor
                        onChange={handleChange}
                        onSubmit={handleSubmit}
                        submitting={submitting}
                        value={currentComment}
                        sharedProps={sharedProps}
                    />
                }
            />
        </>
    );
};

export default CommentsPage;