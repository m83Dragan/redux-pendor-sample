import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as counterActions from "./modules/counter";
import * as postActions from "./modules/post";

class App extends Component {
  componentDidMount() {
    const { number } = this.props;
    this.getPost(number);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.number !== nextProps.number) {
      this.getPost(nextProps.number);
    }
  }

  getPost = async postId => {
    const { PostActions } = this.props;

    try {
      await PostActions.getPost(postId);
    } catch (e) {
      console.log("Error!");
    }
  };

  render() {
    const { CounterActions, number, post, error, loading } = this.props;

    return (
      <div>
        <p>{number}</p>
        <button onClick={CounterActions.increment}>+</button>
        <button onClick={CounterActions.decrement}>-</button>
        {loading && <h2>Loading...</h2>}
        {error ? (
          <h1>Error!</h1>
        ) : (
          <div>
            <h1>{post.title}</h1>
            <p>{post.title}</p>
          </div>
        )}
      </div>
    );
  }
}

export default connect(
  state => ({
    number: state.counter,
    loading: state.pender.pending["GET_POST"],
    error: state.pender.failure["GET_POST"],
    post: state.post.data
  }),
  dispatch => ({
    CounterActions: bindActionCreators(counterActions, dispatch),
    PostActions: bindActionCreators(postActions, dispatch)
  })
)(App);
