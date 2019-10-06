import React, { Component } from "react";

import twitterLogo from "../twitter.svg";
import "./Timeline.css";

import TweetService from "../services/TweetService";
import socket from 'socket.io-client';

import Tweet from "../components/Tweet";

export default class pages extends Component {
  state = {
    tweets: [],
    newTweet: "",
    service: new TweetService()
  };

  async componentDidMount() {

    this.subscribeToEvents();

    const response = await this.state.service.getAllTweets();

    this.setState({ tweets: response });
  }

  handleInputChange = e => {
    this.setState({ newTweet: e.target.value });
  };

  handleNewTweet = async e => {
    if (e.keyCode !== 13) return;

    const content = this.state.newTweet;
    const author = localStorage.getItem("@GoTwitter:username");

    await this.state.service.newTweet(author, content);

    this.setState({ newTweet: "" });
  };

  subscribeToEvents = () => {
    
    const io  = socket('http://localhost:3000');

    io.on('tweet', data => {
        
        
        this.setState( { tweets : [data, ...this.state.tweets]});

    });

    io.on('like', data => {
        
        this.setState( { tweets : this.state.tweets.map( tweet => 
            tweet._id === data._id ? data : tweet
        )});
    });
  }

  render() {
    return (
      <div className="timeline-wrapper">
        <img height={24} src={twitterLogo} alt="GoTwiiter" />

        <form>
          <textarea
            value={this.state.newTweet}
            onChange={this.handleInputChange}
            onKeyDown={this.handleNewTweet}
            placeholder="o que está acontencendo?"
          ></textarea>
        </form>

        <ul className="tweet-list">
          {this.state.tweets.map(tweet => (
            <Tweet key={tweet._id} tweet={tweet} />
          ))}
        </ul>
      </div>
    );
  }
}
