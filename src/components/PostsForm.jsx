import { useState, useEffect } from "react";
import axios from "axios";

const PostsForm = () => {
    const [posts, setPosts] = useState([]);

    // Funzione per ottenere i post dal backend
    function fetchPosts() {
        axios.get("http://localhost:3000/posts/")
            .then((res) => {
                console.log(res);
                setPosts(res.data);

            })
    }

    useEffect(() => {
        fetchPosts();
    }, []);

    const removePost = (id) => {
        axios.delete(`http://localhost:3000/posts/${id}`)
            .then(() => {
                setPosts(posts.filter(post => post.id !== id));
            })
    };


    return (
        <>
            {posts.length === 0 ? (
                <h1>Non ci sono posts</h1>
            ) : (
                posts.map((post) => (
                    <div key={post.id}>
                        <h2>{post.title}</h2>
                        <img src={post.image} alt={post.title} />
                        <h4>{post.autore}</h4>
                        <p>{post.content}</p>
                        <p>{post.tags.join(", ")}</p>
                        <button onClick={() => removePost(post.id)}>Cancella Post</button>
                    </div>
                ))
            )}
        </>
    );
}

export default PostsForm;
