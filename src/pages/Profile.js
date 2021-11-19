import Spinner from "components/Spinner";
import AuthContext from "context/AuthContext";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "styles/Profile.style.css";

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [userPost, setUserPost] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUserPosts = () => {
      fetch(`https://instant-gram-backend.herokuapp.com/mypost`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((res) => res.json())
        .then((result) => {
          setLoading(false);
          setUserPost(result.posts.reverse());
        })
        .catch((err) => console.log(err));
    };
    setLoading(true);
    fetchUserPosts();
  }, []);
  return (
    <div className="profile-page py-5">
      {loading ? (
        <Spinner splash="Loading Profile..." />
      ) : (
        <>
          <div className="profile">
            <img
              className="img-fluid rounded-circle profile-image"
              alt="profile"
              src={
                user?.profileImage ||
                "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg"
              }
            />

            <div className="user-info">
              <h3>{!user ? "" : user.name}</h3>

              <div className="user-followers">
                <p className="font-weight-bold">{userPost.length} Posts</p>
                <p className="font-weight-bold">
                  {user?.followers.length} Follower
                </p>
                <p className="font-weight-bold">
                  {user?.following.length} Following
                </p>
              </div>

              <Link className="btn btn-info" to="/changepassword">
                Change Password
              </Link>
            </div>
          </div>
          <hr />

          <div className="user-posts row">
            {userPost.map((post) => (
              <div
                key={post._id}
                className="col-sm-12 col-md-6 col-lg-4 my-3 d-block text-center"
              >
                <img
                  className="img-fluid user-posts-image"
                  alt="user-posts"
                  src={post.imageURL}
                />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;
