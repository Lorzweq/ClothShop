import React, { useState, useEffect } from 'react';
import supabase from '../../supabaseClient';

const MarketingPost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw new Error('Failed to fetch posts');
      }

      setPosts(data);
    } catch (err) {
      setErrorMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!title || !content) {
        setErrorMessage('Title and content are required.');
        return;
      }

      const { data, error } = await supabase.from('posts').insert([
        {
          title,
          content,
          image_url: imageUrl,
          created_at: new Date().toISOString(),
        },
      ]);

      if (error) {
        throw new Error(error.message);
      }

      setSuccessMessage('Post created successfully!');
      setTitle('');
      setContent('');
      setImageUrl('');
      setErrorMessage('');
      fetchPosts(); // Refresh posts after adding a new one
    } catch (err) {
      setErrorMessage(err.message);
    }
  };

  const deletePost = async (postId) => {
    try {
      const { error } = await supabase.from('posts').delete().eq('id', postId);

      if (error) {
        throw new Error('Failed to delete post');
      }

      setSuccessMessage('Post deleted successfully!');
      fetchPosts(); // Refresh posts after deletion
    } catch (err) {
      setErrorMessage(err.message);
    }
  };

  const hidePost = async (postId) => {
    try {
      const { error } = await supabase
        .from('posts')
        .update({ hidden: true })
        .eq('id', postId);

      if (error) {
        throw new Error('Failed to hide post');
      }

      setSuccessMessage('Post hidden successfully!');
      fetchPosts(); // Refresh posts after hiding
    } catch (err) {
      setErrorMessage(err.message);
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-lg">
      <h1 className="text-2xl font-bold mb-4">Create a Marketing Post</h1>
      {successMessage && (
        <div className="bg-green-100 text-green-700 p-4 rounded mb-4">
          {successMessage}
        </div>
      )}
      {errorMessage && (
        <div className="bg-red-100 text-red-700 p-4 rounded mb-4">
          {errorMessage}
        </div>
      )}
      <form onSubmit={handlePostSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Content:</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            rows="5"
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Image URL (optional):</label>
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Submit Post
        </button>
      </form>

      <h2 className="text-xl font-bold mt-8 mb-4">Existing Posts</h2>
      {loading ? (
        <p>Loading posts...</p>
      ) : posts.length === 0 ? (
        <p>No posts available.</p>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <div key={post.id} className="bg-white border border-gray-200 p-4 rounded shadow-lg">
              <h3 className="text-lg font-bold">{post.title}</h3>
              <p className="text-gray-700">{post.content}</p>
              {post.image_url && (
                <img
                  src={post.image_url}
                  alt={post.title}
                  className="w-full h-48 object-cover rounded mt-2"
                />
              )}
              <div className="flex space-x-4 mt-4">
                <button
                  onClick={() => deletePost(post.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MarketingPost;