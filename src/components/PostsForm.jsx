import { useState, useEffect } from "react";
import axios from "axios";


const initialFormData = {
    titolo: "",
    autore: "",
    contenuto: "",
    categoria: "",

};


const PostsForm = () => {
    const [posts, setPosts] = useState([]);
    const [formData, setFormData] = useState(initialFormData);

    function handleFormData(e) {
        const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;

        setFormData((currentFormData) => ({
            ...currentFormData, [e.target.name]: value,

        }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        setPosts((currentPosts) => [...currentPosts, {
            id: currentPosts.length > 0 ? currentPosts[currentPosts.length - 1].id + 1 : 1,
            ...formData
        }]);

        // Reset del form
        setFormData(initialFormData);
    }
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
            <h1>form dei posts</h1>

            <form id='formpost' action="#" onSubmit={handleSubmit} >
                <input
                    type="text"
                    name="titolo"
                    onChange={handleFormData}
                    value={formData.titolo}
                    placeholder='Nome post'
                />

                <input
                    type="text"
                    name="autore"
                    onChange={handleFormData}
                    value={formData.autore}
                    placeholder='autore post'
                />

                <textarea
                    type="text"
                    name="contenuto"
                    onChange={handleFormData}
                    value={formData.contenuto}
                    placeholder='contenuto post'
                ></textarea>

                <input
                    type="text"
                    name="categoria"
                    onChange={handleFormData}
                    value={formData.categoria}
                    placeholder='categoria post'
                />
                <button>Aggiungi post</button>
            </form>
            {
                posts.map((post) => (
                    <div key={post.id}>
                        <h2>{post.titolo}</h2>
                        <h3>{post.autore}</h3>
                        <p>{post.contenuto}</p>
                        <div>{post.categoria}</div>

                    </div>
                ))

            }
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
