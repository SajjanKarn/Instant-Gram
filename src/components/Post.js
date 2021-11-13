import AuthContext from "context/AuthContext";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "styles/Post.component.css";

const Post = ({ post, posts, setPosts }) => {
  const { user } = useContext(AuthContext);
  const [commentInput, setCommentInput] = useState("");

  // like tweet
  const likeTweet = async (id) => {
    try {
      const res = await fetch(`http://localhost:8000/like`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ postId: id }),
      });
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
      const res = await fetch(`http://localhost:8000/comment`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ comment, postId }),
      });
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
        const res = await fetch(`http://localhost:8000/delete/${postId}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
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

  return (
    <>
      <ToastContainer autoClose={2300} />
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
        <div className="img-wrapper text-center">
          <img
            src={post.imageURL}
            className="img-fluid d-block mx-auto"
            alt="user-post"
          />
        </div>
        <div className="likes">
          {!post.likes.includes(user?._id) ? (
            <i
              className="fa fa-heart-o"
              aria-hidden="true"
              onClick={() => likeTweet(post._id)}
            ></i>
          ) : (
            <i
              className="fa fa-heart liked"
              aria-hidden="true"
              onClick={() => likeTweet(post._id)}
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
              <p key={comment._id} className="text-black">
                <strong>{comment.postedBy.name}</strong>: {comment.comment}
              </p>
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
