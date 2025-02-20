import { useState, useEffect } from 'react';
import axios from "axios";

const PostsForm = () => {
    const [post, setPost] = useState(initialPostData);
    const [formData, setFormData] = useState(initialFormData);

    //funzione di gestione chiamate API
    function fetchPosts() {
        axios.get("http://localhost:3000/posts/")
            .then((res) => {
                console.log(res);
            }


            )
    }

    return (
        <button></button>
    )


}
