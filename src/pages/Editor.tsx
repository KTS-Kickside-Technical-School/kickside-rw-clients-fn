import React, { useState, useEffect } from 'react';
import axiosInstance from '../utils/axios/axiosInstance';

const Editor = () => {
    const [articles, setArticles] = useState([]);
    const [newArticle, setNewArticle] = useState({
        title: '',
        content: '',
        coverImage: '',
        category: ''
    });

    useEffect(() => {
        fetchArticles();
    }, []);

    const fetchArticles = async () => {
        try {
            const response = await axiosInstance.get('/api/articles');
            setArticles(response.data);
        } catch (error) {
            console.error('Error fetching articles:', error);
        }
    };

    const handleCreateArticle = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosInstance.post('/api/articles', newArticle);
            alert('Article created successfully!');
            setNewArticle({ title: '', content: '', coverImage: '', category: '' });
            fetchArticles();
        } catch (error) {
            console.error('Error creating article:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewArticle((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <div className="editor-container">
            <h1 className="text-2xl font-bold mb-4">Article Editor</h1>

            {/* Form to create a new article */}
            <form onSubmit={handleCreateArticle} className="mb-8">
                <div className="mb-4">
                    <label className="block text-gray-700">Title:</label>
                    <input
                        type="text"
                        name="title"
                        value={newArticle.title}
                        onChange={handleInputChange}
                        className="w-full border px-3 py-2 rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Content:</label>
                    <textarea
                        name="content"
                        value={newArticle.content}
                        onChange={handleInputChange}
                        className="w-full border px-3 py-2 rounded"
                        rows="5"
                        required
                    ></textarea>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Cover Image URL:</label>
                    <input
                        type="text"
                        name="coverImage"
                        value={newArticle.coverImage}
                        onChange={handleInputChange}
                        className="w-full border px-3 py-2 rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Category:</label>
                    <input
                        type="text"
                        name="category"
                        value={newArticle.category}
                        onChange={handleInputChange}
                        className="w-full border px-3 py-2 rounded"
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Create Article
                </button>
            </form>

            {/* List of articles */}
            <h2 className="text-xl font-bold mb-4">Articles</h2>
            <ul className="space-y-4">
                {articles.map((article: any) => (
                    <li key={article?._id} className="p-4 border rounded">
                        <h3 className="text-lg font-bold">{article?.title}</h3>
                        <p className="text-gray-700">{article?.content}</p>
                        {article?.coverImage && (
                            <img
                                src={article.coverImage}
                                alt={article.title}
                                className="mt-2 max-h-48 object-cover"
                            />
                        )}
                        <p className="text-sm text-gray-500">Category: {article.category}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Editor;