import React from "react";

import styles from "./Post.module.css";

interface PostProps {
    title: string;
    body: string;
}

const Post: React.FC<PostProps> = ({ title, body }) => {
    return (
        <div className={styles.post}>
            <p className={styles.title}>{title}</p>
            <p className={styles.body}>{body}</p>
        </div>
    );
}

export default Post;
