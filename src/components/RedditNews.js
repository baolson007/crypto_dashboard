import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import Card from "../UI/Card";
import Post from "./Post";
import classes from "./RedditNews.module.css";

const RedditNews = (props) => {
  const [posts, setPosts] = useState([]);
  let url = `https://www.reddit.com/r/${props.subreddit}.json`;

  useEffect(() => {
    const getPosts = async () => {
      const response = await axios.get(url);
      setPosts(response.data.data.children.map((post) => post.data));
    };
    getPosts();
    //console.log(posts);
  }, [url, setPosts]);

  return (
    <Card className={classes.card}>
      <h2>Reddit r/{props.subreddit} News</h2>
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
    </Card>
  );
};

export default RedditNews;
