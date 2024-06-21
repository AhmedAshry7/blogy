'use client'
import { useState, useEffect } from "react";
import { TailSpin } from "react-loader-spinner";

import styles from "./page.module.css";
import Toolbar from "../components/Toolbar";
import BreifPost from "../components/BreifPost";

interface Post {
    id: number;
    title: string;
    body: string;
}

const Home: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function getPosts() {
            try {
                const response = await fetch("https://jsonplaceholder.typicode.com/posts");
                const fetchedPosts = await response.json();
                console.log(fetchedPosts);
                setPosts(fetchedPosts);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        getPosts();
    }, []);

    return (
        <div className={styles.page}>
            <Toolbar isCreate={false} homeClicked={() => {}} />
            <div className={styles.posts}>
                {!loading && (
                    <>
                        {posts.map((post) => (
                            <BreifPost key={post.id} title={post.title} body={post.body} postId={post.id} />
                        ))}
                    </>
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
        </div>
    );
}

export default Home;
