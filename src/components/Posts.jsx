import React, { useState, useEffect } from 'react';
import supabase from '../../supabaseClient';

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // Fetch posts and join with user data
        const { data, error } = await supabase
          .from('posts')
          .select('id, title, content, image_url, created_at');

        if (error) {
          throw new Error('Failed to fetch posts');
        }

        setPosts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <p>Loading posts...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Posts</h1>
      {posts.length === 0 ? (
        <p>No posts available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <div key={post.id} className="bg-white border border-gray-200 p-6 rounded shadow-lg">
              <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
              <p className="text-gray-700 mb-4">{post.content}</p>
              {post.image_url && (
                <img
                  src={post.image_url}
                  alt={post.title}
                  className="w-full h-48 object-cover rounded mb-4"
                />
              )}
              <p className="text-sm text-gray-500">
                Posted by: <span className="font-semibold">{post.users?.name || 'Unknown'}</span>
              </p>
              <p className="text-sm text-gray-500">
                Date: {new Date(post.created_at).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Posts;