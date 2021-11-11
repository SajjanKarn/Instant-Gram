import "styles/Post.component.css";

const Post = ({ post }) => {
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
        <i className="fa fa-heart liked" aria-hidden="true"></i>
      </div>
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
