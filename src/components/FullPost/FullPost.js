import React, { Component } from "react";
import axios from "axios";

import "./FullPost.css";

class FullPost extends Component {
  state = {
    loaded: null
  };

  componentDidUpdate() {
    if (this.props.id) {
      if (
        !this.state.loaded ||
        (this.state.loaded && this.state.loaded.id !== this.props.id)
      ) {
        axios
          .get(`https://jsonplaceholder.typicode.com/posts/${this.props.id}`)
          .then(response => {
            this.setState({ loaded: response.data });
          });
      }
    }
  }

  render() {
    let post = <p style={{ textAlign: "center" }}>Please select a Post!</p>;
    if (this.props.id) {
      post = <p style={{ textAlign: "center" }}>Loading...!</p>;
    }
    if (this.state.loaded) {
      post = (
        <div className="FullPost">
          <h1>{this.state.loaded.title}</h1>
          <p>{this.state.loaded.body}</p>
          <div className="Edit">
            <button className="Delete">Delete</button>
          </div>
        </div>
      );
    }
    return post;
  }
}

export default FullPost;
