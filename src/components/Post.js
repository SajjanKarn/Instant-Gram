import "styles/Post.component.css";

const Post = ({ name, title, body, ...extra }) => {
  return (
    <div className="post-card" {...extra}>
      <div className="post-card-user">
        <h3>{name}</h3>
      </div>
      <div className="img-wrapper text-center">
        <img
          src="https://images.pexels.com/photos/3826410/pexels-photo-3826410.jpeg"
          className="img-fluid d-block mx-auto"
          alt="user-post"
        />
      </div>
      <div className="likes">
        <i className="fa fa-heart liked" aria-hidden="true"></i>
      </div>
      <div className="post-card-title my-2">
        <h4>{title}</h4>
      </div>
      <div className="post-card-body">{body}</div>
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
