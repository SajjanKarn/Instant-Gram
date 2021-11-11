import AuthContext from "context/AuthContext";
import { useContext } from "react";
import "styles/Post.component.css";

const Post = ({ post, posts, setPosts }) => {
  const { user } = useContext(AuthContext);

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
  return (
    <div className="post-card">
      <div className="post-card-user">
        <h3>{post.postedBy.name}</h3>
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
      <div className="input-group mt-2">
        <input className="form-control" placeholder="Add Comment" />
      </div>
    </div>
  );
};

Post.defaultProps = {
  name: "Maximilian Doe",
  title: "Amazing title",
  body: "lorem ipsum dolor sit amet consecutor",
};

export default Post;
