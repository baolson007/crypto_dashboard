import React from "react";
import Card from "../UI/Card";
import classes from "./Post.module.css";

const Post = (props) => {
  const link = `https://www.reddit.com/${props.postURL}`;
  const authorURL = `https://www.reddit.com/user/${props.author}`;

  //   <div className="content">
  //   <span>{props.postURL}</span>
  // </div>

  return (
    <Card className={classes.post}>
      <a className="post" href={link}>
        <div className={classes.title}> {props.title} </div>
      </a>
      {props.author && (
        <div>
          <a className={classes.author} href={authorURL}>
            Post created by {props.author}{" "}
          </a>
        </div>
      )}
    </Card>
  );
};

export default Post;
