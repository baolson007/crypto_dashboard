import React from "react";

import classes from "./Post.module.css";

const Post = (props) => {
  const link = `https://www.reddit.com/${props.postURL}`;
  const authorURL = `https://www.reddit.com/user/${props.author}`;

  //   <div className="content">
  //   <span>{props.postURL}</span>
  // </div>

  return (
    <div className={classes.post}>
      <a className="post" href={link}>
        <div className="title"> {props.title} </div>
      </a>
      {props.author && (
        <div className={classes.author}>
          <a href={authorURL}>Post created by {props.author} </a>
        </div>
      )}
    </div>
  );
};

export default Post;
