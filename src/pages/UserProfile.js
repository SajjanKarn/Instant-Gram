import Spinner from "components/Spinner";
import AuthContext from "context/AuthContext";
import ToastContext from "context/ToastProvider";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import "styles/Profile.style.css";

const UserProfile = () => {
  const { user } = useContext(AuthContext);
  const { toast } = useContext(ToastContext);

  const { userId } = useParams();
  const [userProfile, setUserProfile] = useState(null);
  const [userPost, setUserPost] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    try {
      const fetchUserPosts = async () => {
        setLoading(true);
        const res = await fetch(
          `https://instant-gram-backend.herokuapp.com/user/${userId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
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

  const followUser = async (userId) => {
    try {
      const res = await fetch(
        `https://instant-gram-backend.herokuapp.com/follow`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ userId }),
        }
      );
      const result = await res.json();
      if (!result.error) {
        setUserProfile(result);
      } else {
        toast.error(result.error);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="profile-page py-5">
      {loading ? (
        <Spinner splash="Loading Profile..." />
      ) : (
        <>
          {!userProfile ? (
            <h3>No user found!</h3>
          ) : (
            <>
              <div className="profile">
                <img
                  className="img-fluid rounded-circle profile-image"
                  alt="profile"
                  src={userProfile?.profileImage || userPost[0]?.imageURL}
                />

                <div className="user-info">
                  <h3>{!userProfile ? "" : userProfile.name}</h3>

                  <div className="user-followers">
                    <p className="font-weight-bold">{userPost.length} Posts</p>
                    <p className="font-weight-bold">
                      {userProfile.followers.length} Follower
                    </p>
                    <p className="font-weight-bold">
                      {userProfile.following.length} Following
                    </p>
                  </div>

                  {userProfile._id !== user?._id && (
                    <>
                      {" "}
                      {userProfile.followers.includes(user?._id) ? (
                        <button
                          className="btn btn-danger btn-md"
                          onClick={() => {
                            followUser(userProfile._id);
                          }}
                        >
                          Unfollow{" "}
                          <i
                            className="fa fa-user-times mx-2"
                            aria-hidden="true"
                          ></i>
                        </button>
                      ) : (
                        <button
                          className="btn btn-info btn-md"
                          onClick={() => {
                            followUser(userProfile._id);
                            toast.success(`Followed ${userProfile.name}`);
                          }}
                        >
                          Follow{" "}
                          <i
                            className="fa fa-user-plus mx-2"
                            aria-hidden="true"
                          ></i>
                        </button>
                      )}
                    </>
                  )}
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
        </>
      )}
    </div>
  );
};

export default UserProfile;
