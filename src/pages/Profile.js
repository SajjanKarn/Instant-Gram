import "styles/Profile.style.css";

const Profile = () => {
  return (
    <div className="profile-page py-5">
      <div className="profile">
        <img
          className="img-fluid rounded-circle profile-image"
          alt="profile"
          src="https://images.pexels.com/photos/3826410/pexels-photo-3826410.jpeg"
        />

        <div className="user-info">
          <h3>Maximilian Doe</h3>

          <div className="user-followers">
            <p className="font-weight-bold">40 Posts</p>
            <p className="font-weight-bold">469 Follower</p>
            <p className="font-weight-bold">65 Following</p>
          </div>
        </div>
      </div>
      <hr />

      <div className="user-posts row">
        <div className="col-sm-12 col-md-6 col-lg-4 my-3 d-block text-center">
          <img
            className="img-fluid user-posts-image"
            alt="user-posts"
            src="https://images.pexels.com/photos/8090137/pexels-photo-8090137.jpeg?"
          />
        </div>
        <div className="col-sm-12 col-md-6 col-lg-4 my-3 d-block text-center">
          <img
            className="img-fluid user-posts-image"
            alt="user-posts"
            src="https://images.pexels.com/photos/8090137/pexels-photo-8090137.jpeg?"
          />
        </div>
        <div className="col-sm-12 col-md-6 col-lg-4 my-3 d-block text-center">
          <img
            className="img-fluid user-posts-image"
            alt="user-posts"
            src="https://images.pexels.com/photos/3826410/pexels-photo-3826410.jpeg"
          />
        </div>
        <div className="col-sm-12 col-md-6 col-lg-4 my-3 d-block text-center">
          <img
            className="img-fluid user-posts-image"
            alt="user-posts"
            src="https://images.pexels.com/photos/3826410/pexels-photo-3826410.jpeg"
          />
        </div>
        <div className="col-sm-12 col-md-6 col-lg-4 my-3 d-block text-center">
          <img
            className="img-fluid user-posts-image"
            alt="user-posts"
            src="https://images.pexels.com/photos/3826410/pexels-photo-3826410.jpeg"
          />
        </div>
        <div className="col-sm-12 col-md-6 col-lg-4 my-3 d-block text-center">
          <img
            className="img-fluid user-posts-image"
            alt="user-posts"
            src="https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg"
          />
        </div>
        <div className="col-sm-12 col-md-6 col-lg-4 my-3 d-block text-center">
          <img
            className="img-fluid user-posts-image"
            alt="user-posts"
            src="https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg"
          />
        </div>
        <div className="col-sm-12 col-md-6 col-lg-4 my-3 d-block text-center">
          <img
            className="img-fluid user-posts-image"
            alt="user-posts"
            src="https://images.pexels.com/photos/3826410/pexels-photo-3826410.jpeg"
          />
        </div>
        <div className="col-sm-12 col-md-6 col-lg-4 my-3 d-block text-center">
          <img
            className="img-fluid user-posts-image"
            alt="user-posts"
            src="https://images.pexels.com/photos/3826410/pexels-photo-3826410.jpeg"
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;
