import React, { useState, useEffect } from "react";
import axios from "axios";

import Post from "./Post";

const RedditNews = (props) => {
  const [posts, setPosts] = useState([]);
  let url = `https://www.reddit.com/r/${props.subreddit}.json`;

  useEffect(() => {
    const getPosts = async () => {
      const response = await axios.get(url);
      //console.log(response);
      setPosts(response.data.data.children.map((post) => post.data));
    };
    getPosts();
  }, [url, setPosts]);

  //   <li key={post.id}>
  //   <a href={`https://www.reddit.com/${post.permalink}`}>{post.title}</a>
  // </li>

  return (
    <ul>
      {posts.map((post) => (
        <Post
          key={post.id}
          postURL={post.permalink}
          title={post.title}
          author={post.author}
        />
      ))}
    </ul>
  );
};

export default RedditNews;
