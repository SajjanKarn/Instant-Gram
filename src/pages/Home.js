import "styles/Home.style.css";

import Post from "components/Post";
import { useEffect, useState } from "react";
import Spinner from "components/Spinner";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:8000/allpost`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setLoading(false);
        setPosts(result.posts.reverse());
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="home-page">
      {loading && <Spinner splash="Loading posts...." />}
      {posts.map((post) => (
        <Post key={post._id} post={post} />
      ))}
    </div>
  );
};

export default Home;
