import React, { Component } from "react";
import Posts from "./Posts/Posts";
import { Route, NavLink, Switch, Redirect } from "react-router-dom";
// import NewPost from "./NewPost/NewPost";
// import FullPost from "./FullPost/FullPost";
import asyncComponent from "../../hoc/asyncComponent";

const AsyncNewPost = asyncComponent(() => {
  //This is the way we load components Asynchronously.
  return import("./NewPost/NewPost");
});

import "./Blog.css";

class Blog extends Component {
  state = {
    auth: true
  };

  render() {
    return (
      <div className="Blog">
        <header>
          <nav>
            <ul>
              <li>
                <NavLink to="/posts/" exact>
                  Posts
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={{
                    pathname: "/new-post"
                    // hash: "#submit",
                    // search: "?quick-submit=true"
                  }}
                >
                  New Post
                </NavLink>
              </li>
            </ul>
          </nav>
        </header>
        {/* <Route
          path="/"
          exact
          render={() => (
            <h1>
              <Posts />
            </h1>
          )}
        /> */}
        <Switch>
          {this.state.auth ? (
            <Route path="/new-post" component={<AsyncNewPost />} />
          ) : null}
          <Route path="/posts/" component={Posts} />
          {/* <Route render={() => <h1>NotFound</h1>} /> HANDLING 404 Route */}
          <Redirect from="/" to="/posts" />
        </Switch>
      </div>
    );
  }
}

export default Blog;
