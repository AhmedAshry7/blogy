'use client'
import { useState, useEffect } from "react";
import { TailSpin } from "react-loader-spinner";

import styles from "../../home/page.module.css";
import Toolbar from "../../components/Toolbar";
import Post from "../../components/Post";

interface HomeProps {
    params: {
        postId: number;
    };
}

interface Post {
    id: number;
    title: string;
    body: string;
}

const Home: React.FC<HomeProps> = ({ params: { postId } }) => {
    const [post, setPost] = useState<Post | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`);
                const fetchedPost = await response.json();
                console.log(fetchedPost);
                setPost(fetchedPost);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching post:', error);
            }
        };
        fetchPost();
    }, [postId]);

    return (
        <div className={styles.page}>
            <Toolbar isCreate={false} homeClicked={() => {}} />
            {!loading && post &&(
                <div className={styles.postContainer}>
                 <Post title={post.title} body={post.body} />
                 </div>
                 )}
            {loading && (
                <TailSpin
                    visible={true}
                    height="80"
                    width="80"
                    color="#000000"
                    ariaLabel="tail-spin-loading"
                    radius="0.5"
                    wrapperStyle={{
                        display: "flex",
                        width: "100%",
                        alignItems: "center",
                        justifyContent: "center",
                        marginBottom: "40px",
                    }}
                    wrapperClass=""
                />
            )}
        </div>
    );
};

export default Home;
