import "antd/dist/antd.min.css";
import { Avatar, Button, Comment, Form, Input, List } from 'antd';
import moment from'moment';
import React, { useState, useRef, useEffect } from'react';
import axios from 'axios';

const { TextArea } = Input;

// 评论列表
const CommentList = ({ comments, replyClick }) => (
    <List
        dataSource={comments}
        // header={`${comments.length} ${'条评论'}`}
        itemLayout="horizontal"
        // renderItem={(props) => <NestedComment {...props} />}
        renderItem={item => (
            <List.Item>
                <NestedComment comment={item} replyClick={replyClick}></NestedComment>
            </List.Item>
        )}
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

const NestedComment = ({ comment, replyClick }) => {
    return (
        <Comment
            actions={[<span key="comment-nested-reply-to" onClick={() => replyClick(comment.id)}>Reply to</span>]}
            author={<a>{comment.userName || '测试用户'}</a>}
            avatar={<Avatar src='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png' alt="Han Solo" />}
            content={
                <p>
                    {comment.content}
                </p>
            }
        >{comment.children && comment.children.length > 0? (
            <div >
                {/* 递归调用 Comment 组件渲染子评论 */}
                {comment.children.map((childComment) => (
                    <NestedComment key={childComment.id} comment={childComment} replyClick={replyClick} />
                ))}
            </div>
        ) : null}</Comment>
    );
};

const mockData = {
    "commentList": [
        {
            "userName": "张三",
            "headImg": "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
            "content": "一条评论",
            "children": [
                {
                    "userName": "李四",
                    "headImg": "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
                    "content": "李四评论张三一条评论",
                    "children": [
                        {
                            "userName": "六",
                            "headImg": "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
                            "content": "六评论李四一条评论",
                        }
                    ]
                },
                {
                    "userName": "王五",
                    "headImg": "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
                    "content": "王五评论张三一条评论",
                }
            ]
        }
    ]
};


const CommentsPage = () => {
    // 评论列表更新
    const [comments, setComments] = useState([]);
    // 提交状态更新
    const [submitting, setSubmitting] = useState(false);
    const [currentComment, setCommentValue] = useState('');
    const [parentCommentId, setParentCommentId] = useState('');

    // 焦点
    const inputRef = useRef(null);
    const sharedProps = {
        ref: inputRef
    };

    const queryList = async () => {
        try {
            return await axios.get('https://127.0.0.1:443/comments/list', {
                withCredentials: true
            });

        } catch (error) {
            return [];
        }
    }

    const submitData = async () => {
        try {
            return await axios.post('https://127.0.0.1:443/comments/create', {
                content: currentComment,
                parentCommentId: parentCommentId
            }, {
                withCredentials: true
            });
        } catch (error) {
            return [];
        }
    }

    useEffect(() => {
        console.log('------')
        queryList().then(res => {
            console.info('xxxx', res);
            const { data = {} } = res || {}
            const { data: realData = [] } = data || {}
            console.log('queryListxxxx', realData)
            setComments(realData)
        });
    }, []);

    // 提交触发
    const handleSubmit = () => {
        if (!currentComment) return;

        submitData().then(res => {
            const { data = {} } = res
            const { success } = data || {}

            if (success) {
                console.log('suc')
            }

            setSubmitting(false);
            setCommentValue('')

            queryList().then(res => {
                console.info('xxxx', res);
                const { data = {} } = res || {}
                const { data: realData = [] } = data || {}
                console.log('queryListxxxx', realData)
                setComments(realData)
            });
        });

        setSubmitting(true);
        // setTimeout(() => {
        //     setSubmitting(false);
        //     setCommentValue('');
        //     setComments([
        //         ...comments,
        //         {
        //             author: 'Han Solo',
        //             avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        //             content: <p>{currentComment}</p>,
        //             datetime: moment('2016-11-22').fromNow(),
        //             actions: [<span key="comment-list-reply-to-0" onClick={onReplyClick}>Reply to</span>],
        //         },
        //     ]);
        // }, 1000);
    };

    const handleChange = (e) => {
        setCommentValue(e.target.value);
    };

    // reply点击监听
    const onReplyClick = (commentId) => {
        console.log('-------click', commentId);
        inputRef.current.focus({
            cursor: 'start',
        });
        setParentCommentId(commentId);
    }

    return (
        <>
            {comments.length > 0 && <CommentList comments={comments} replyClick={onReplyClick} />}
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