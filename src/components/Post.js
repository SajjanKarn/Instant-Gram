import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import moment from "moment";

import AuthContext from "context/AuthContext";
import ToastContext from "context/ToastProvider";
import "styles/Post.component.css";

const Post = ({ post, posts, setPosts }) => {
  const { user } = useContext(AuthContext);
  const { toast } = useContext(ToastContext);
  const [commentInput, setCommentInput] = useState("");

  // like tweet
  const likePost = async (id) => {
    try {
      const res = await fetch(
        `https://instant-gram-backend.onrender.com/like`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ postId: id }),
        }
      );
      const result = await res.json();

      // generate new post data.
      const newPostData = posts.map((postItem) => {
        if (postItem._id === result._id) {
          return result;
        } else {
          return postItem;
        }
      });

      // re-render post data.
      setPosts(newPostData);
    } catch (err) {
      console.log(err);
    }
  };

  // post comment
  const postComment = async (comment, postId) => {
    try {
      const res = await fetch(
        `https://instant-gram-backend.onrender.com/comment`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ comment, postId }),
        }
      );
      const result = await res.json();

      if (!result.error) {
        // generate new post data.
        const newPostData = posts.map((postItem) => {
          if (postItem._id === result._id) {
            return result;
          } else {
            return postItem;
          }
        });

        // re-render post data.
        setPosts(newPostData);
        setCommentInput("");
      } else {
        toast.error(result.error);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // delete post
  const deletePost = async (postId) => {
    const confirmAction = window.confirm(
      "Are you sure you want to delete this post?"
    );
    if (confirmAction) {
      if (!postId) {
        toast.error("PostID is required to delete a post!");
        return;
      }

      try {
        const res = await fetch(
          `https://instant-gram-backend.onrender.com/delete/${postId}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const result = await res.json();

        if (!result.error) {
          const newPostData = posts.filter((postItem) => {
            return postItem._id !== result._id;
          });
          setPosts(newPostData);
          toast.success("Deleted Post 💀");
        } else {
          toast.error(result.error);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  // delete comment
  const deleteComment = async (postId, comment) => {
    if (!window.confirm("are you sure you want to delete this comment ?")) {
      return;
    }

    try {
      const res = await fetch(
        `https://instant-gram-backend.onrender.com/comment`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ commentId: comment._id, postId }),
        }
      );
      const result = await res.json();
      if (!result.error) {
        setPosts(result.posts.reverse());
      } else {
        toast.error(result.error);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="post-card">
        <div
          className="post-card-user d-flex my-2"
          style={{ justifyContent: "space-between", alignItems: "center" }}
        >
          <h3>
            <Link
              to={
                post.postedBy._id === user?._id
                  ? `/profile`
                  : `/profile/${post.postedBy._id}`
              }
            >
              {post.postedBy.name}
            </Link>
          </h3>
          {user?._id === post.postedBy._id && (
            <button
              className="btn btn-danger btn-sm"
              onClick={() => deletePost(post._id)}
            >
              <i className="fa fa-trash" aria-hidden="true"></i>
            </button>
          )}
        </div>
        <div className="postedAt">
          <p>Posted {moment(post.createdAt).fromNow()}</p>
        </div>
        <div className="img-wrapper text-center">
          <img
            src={post.imageURL}
            className="img-fluid d-block mx-auto"
            alt="user-post"
            onClick={(e) => {
              switch (e.detail) {
                case 2:
                  likePost(post._id);
                  break;
                default:
                  break;
              }
            }}
          />
        </div>
        <div className="likes">
          {!post.likes.includes(user?._id) ? (
            <i
              className="fa fa-heart-o animate__animated"
              aria-hidden="true"
              onClick={() => likePost(post._id)}
            ></i>
          ) : (
            <i
              className="fa fa-heart liked"
              aria-hidden="true"
              onClick={() => likePost(post._id)}
            ></i>
          )}
        </div>
        <p>{post.likes.length} likes</p>
        <div className="post-card-title my-2">
          <h4>{post.title}</h4>
        </div>
        <div className="post-card-body">{post.body}</div>
        <h5 className="my-2">Comments</h5>
        {!post.comments.length && <p>No comments!</p>}
        {post.comments && (
          <div className="comment my-2">
            {post.comments.map((comment) => (
              <div className="comment-box animate__animated animate__fadeInDown">
                <p key={comment._id} className="text-black">
                  <strong>{comment.postedBy.name}</strong>: {comment.comment}
                </p>
                {user?._id === comment.postedBy._id && (
                  <i
                    className="fa fa-trash comment-delete"
                    onClick={() => deleteComment(post._id, comment)}
                    aria-hidden="true"
                  ></i>
                )}
              </div>
            ))}
          </div>
        )}
        <form
          onSubmit={(event) => {
            event.preventDefault();

            const comment = commentInput;
            if (!comment) {
              toast.error("Please enter a comment!");
              return;
            }

            // post comment.
            postComment(comment, post._id);
          }}
        >
          <div className="input-group mt-2">
            <input
              className="form-control"
              placeholder="Add Comment.."
              value={commentInput}
              onChange={(e) => setCommentInput(e.target.value)}
            />
            <button type="submit" className="btn btn-info">
              <i className="fa fa-paper-plane" aria-hidden="true"></i>
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

Post.defaultProps = {
  name: "Maximilian Doe",
  title: "Amazing title",
  body: "lorem ipsum dolor sit amet consecutor",
};

export default Post;
