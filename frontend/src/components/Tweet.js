import React, { Component } from "react";

import like from "../like.svg";
import "./Tweet.css";

import TweetService from "../services/TweetService";

export default class Tweet extends Component {
  
  state = {
    service : new TweetService()
  }

  handleLike = async () => {
    const { _id } = this.props.tweet;

    await this.state.service.addLike(_id);

  };

  render() {
    const { content, author, likes } = this.props.tweet;

    return (
      <li className="tweet">
        <strong>{author}</strong>
        <p>{content}</p>
        <button type="button" onClick={this.handleLike}>
          <img src={like} alt="like" />
          {likes}
        </button>
      </li>
    );
  }
}
