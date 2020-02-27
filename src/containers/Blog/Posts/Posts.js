import React, { Component } from "react";
import axios from "axios";
import Post from "../../../components/Post/Post";
import { Route } from "react-router-dom";
import FullPost from "../FullPost/FullPost";
// import { Link } from "react-router-dom";

import "./Posts.css";

class Posts extends Component {
  state = {
    posts: []
  };

  postClicked = id => {
    // this.setState({ selectedPostId: id });
    this.props.history.push({ pathname: "/posts/" + id });
    // this.props.history.push({ "/" + id });
  };

  componentDidMount() {
    axios.get("https://jsonplaceholder.typicode.com/posts").then(response => {
      const posts = response.data.slice(0, 4);
      const updatedPosts = posts.map(post => {
        return {
          ...post,
          author: "Max"
        };
      });
      this.setState({ posts: updatedPosts });
      //console.log(response);
    });
  }

  render() {
    const posts = this.state.posts.map(post => {
      return (
        // <Link to={"/" + post.id} key={post.id}>
        <Post
          title={post.title}
          author={post.author}
          clicked={() => this.postClicked(post.id)}
        />
        // </Link>
      );
    });
    return (
      <div>
        <section className="Posts">{posts}</section>
        <Route
          path={this.props.match.url + "/:id"}
          exact
          component={FullPost}
        />
      </div>
    );
  }
}

export default Posts;
