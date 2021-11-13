import Spinner from "components/Spinner";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { toast } from "react-toastify";
import "styles/Profile.style.css";

const UserProfile = () => {
  const { userId } = useParams();
  const [userProfile, setUserProfile] = useState(null);
  const [userPost, setUserPost] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    try {
      const fetchUserPosts = async () => {
        setLoading(true);
        const res = await fetch(`http://localhost:8000/user/${userId}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const result = await res.json();

        setLoading(false);
        if (!result.error) {
          setUserProfile(result.user);
          setUserPost(result.posts.reverse());
        } else {
          toast.error(result.error);
        }
      };
      fetchUserPosts();
    } catch (err) {
      console.log(err);
    }
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
              src={userPost[0]?.imageURL}
            />

            <div className="user-info">
              <h3>{!userProfile ? "" : userProfile.name}</h3>

              <div className="user-followers">
                <p className="font-weight-bold">{userPost.length} Posts</p>
                <p className="font-weight-bold">0 Follower</p>
                <p className="font-weight-bold">0 Following</p>
              </div>
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

export default UserProfile;
