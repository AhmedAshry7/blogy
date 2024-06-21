import React from "react";
import { useRouter } from "next/navigation";

import styles from "./BreifPost.module.css";

interface BreifPostProps {
    title: string;
    body: string;
    postId: number
}

const BreifPost: React.FC<BreifPostProps> = ({ title, body, postId }) => {
    const router = useRouter();
    return (
        <div className={styles.post} onClick={() => { router.push(`/singlePost/${postId}`); }} >
            <p className={styles.title}>{title}</p>
            <p className={styles.body}>{body}</p>
        </div>
    );
}

export default BreifPost;
