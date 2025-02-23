import { useState, useEffect } from "react";
import axios from "axios";


const initialFormData = {
    title: "",
    content: "",
    image: "",
    tags: [],

};


const PostsForm = () => {
    const [posts, setPosts] = useState([]);
    const [formData, setFormData] = useState(initialFormData);

    function handleFormData(e) {
        const value = e.target.name === "tags" ? e.target.value.split(",") : e.target.value;

        setFormData((currentFormData) => ({
            ...currentFormData, [e.target.name]: value,

        }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        axios.post("http://localhost:3000/posts", formData)
            .then((res) => {
                setPosts((currentPosts) => [...currentPosts, res.data]);
                setFormData(initialFormData); // Reset del form
            })
            .catch((err) => {
                console.error("Errore nell'aggiunta del post:", err);
            });
    }
    // Funzione per ottenere i post dal backend
    function fetchPosts() {
        axios.get("http://localhost:3000/posts/")
            .then((res) => {
                console.log(res);
                setPosts(res.data);

            })
    }

    useEffect(fetchPosts, []);

    const removePost = (id) => {
        axios.delete(`http://localhost:3000/posts/${id}`)
            .then(() => {
                setPosts(posts.filter(post => post.id !== id));
            })
    };


    return (
        <>
            <h1>form dei posts</h1>

            <form id='formpost' action="#" onSubmit={handleSubmit} >
                <input
                    type="text"
                    name="title"
                    onChange={handleFormData}
                    value={formData.title}
                    placeholder='Nome post'
                />

                <textarea
                    name="content"
                    onChange={handleFormData}
                    value={formData.content}
                    placeholder='contenuto post'
                ></textarea>

                <input
                    type="text"
                    name="image"
                    onChange={handleFormData}
                    value={formData.image}
                    placeholder="image post"
                />

                <input
                    type="text"
                    name="tags"
                    onChange={handleFormData}
                    value={formData.tags}
                    placeholder='tags dei post'
                />
                <button>Aggiungi post</button>
            </form>

            {posts.length === 0 ? (
                <h1>Non ci sono posts</h1>
            ) : (
                posts.map((post) => (
                    <div key={post.id}>
                        <h2>{post.title}</h2>
                        <img src={post.image} />
                        <p>{post.content}</p>
                        <p>{post.tags.join(', ')}</p>
                        <button onClick={() => removePost(post.id)}>Cancella Post</button>
                    </div>
                ))
            )}
        </>
    );
}

export default PostsForm;
