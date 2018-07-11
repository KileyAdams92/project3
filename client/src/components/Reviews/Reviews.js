import React, { Component } from "react";
import "./Reviews.css";
import API from "../../utils/API";

class Reviews extends React.Component {
  constructor() {
    super();

    this.state = {
      showComments: false,
      comments: []
    };
  }

  render() {
    const comments = this._getComments();
    let commentNodes;
    let buttonText = "Read Reviews";

    if (this.state.showComments) {
      buttonText = "Close Reviews";
      commentNodes = <div className="comment-list">{comments}</div>;
    }

    return (
      <div className="comment-box">
        <h2>Tell us what you think!</h2>
        <CommentForm addComment={this._addComment.bind(this)} />
        <button id="comment-reveal" onClick={this._handleClick.bind(this)}>
          {buttonText}
        </button>
        <h3>Reviews</h3>
        <h4 className="comment-count">
          {this._getCommentsTitle(comments.length)}
        </h4>
        {commentNodes}
      </div>
    );
  } // end render

  _addComment(reviewer, review) {
    const comment = {
      id: this.state.comments.length + 1,
      reviewer,
      review
    };
    API.review({ reviewer: reviewer, review: review }).then(response => {
      console.log(response);
    });

    this.setState({ comments: this.state.comments.concat([comment]) }); // *new array references help React stay fast, so concat works better than push here.
  }

  _handleClick() {
    this.setState({
      showComments: !this.state.showComments
    });
  }

  _getComments() {
    return this.state.comments.map(comment => {
      return (
        <Comment
          reviewer={comment.reviewer}
          review={comment.review}
          key={comment.id}
        />
      );
    });
  }

  _getCommentsTitle(commentCount) {
    if (commentCount === 0) {
      return "No reviews yet";
    } else if (commentCount === 1) {
      return "1 review";
    } else {
      return `${commentCount} reviews`;
    }
  }
} // end CommentBox component

class CommentForm extends React.Component {
  render() {
    return (
      <form className="comment-form" onSubmit={this._handleSubmit.bind(this)}>
        <div className="comment-form-fields">
          <input
            className="reviewName"
            placeholder=" Users Name"
            required
            ref={input => (this._author = input)}
          />
          <br />
          <textarea
            id="reviewText"
            placeholder="Review"
            rows="4"
            required
            ref={textarea => (this._review = textarea)}
          />
        </div>
        <div className="comment-form-actions">
          <button className="postReviewBtn" type="submit">
            Post Review
          </button>
        </div>
      </form>
    );
  } // end render

  _handleSubmit(event) {
    event.preventDefault(); // prevents page from reloading on submit
    let reviewer = this._author;
    let review = this._review;
    this.props.addComment(reviewer.value, review.value);
  }
} // end CommentForm component

class Comment extends React.Component {
  render() {
    return (
      <div className="comment">
        <p className="comment-header">{this.props.reviewer}</p>
        <p className="comment-body">- {this.props.review}</p>
        <div className="comment-footer" />
      </div>
    );
  }
}

export default Reviews;
