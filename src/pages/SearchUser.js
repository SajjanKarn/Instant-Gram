import { Link } from "react-router-dom";
import { useContext, useState } from "react";

import Spinner from "components/Spinner";
import ToastContext from "context/ToastProvider";
// import moment from "moment";

const SearchUser = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [result, setResult] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [loading, setLoading] = useState(false);

  const { toast } = useContext(ToastContext);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!searchInput) {
      toast.error("Please enter a name");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(
        `https://instant-gram-backend.herokuapp.com/search`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            query: searchInput,
          }),
        }
      );
      const result = await res.json();

      if (!result.error) {
        setSearchResults(result.users);
        setResult(null);
        if (!result.users.length) {
          setResult("No Results found!");
        }
        setLoading(false);
      } else {
        toast.error(result.error);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="search-page">
      <Link to="/allusers" className="btn btn-info my-2">
        See All Users
      </Link>

      <h3>Search User By Names </h3>
      <form className="d-flex" onSubmit={handleSubmit}>
        <input
          type="text"
          className="form-control"
          placeholder="John Doe*"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          required
        />
        <input type="submit" value="Search" className="btn btn-primary" />
      </form>

      {searchResults.length > 0 && (
        <h3 className="my-3">Search Results for "{searchInput}"</h3>
      )}

      {loading ? (
        <Spinner splash="Searching User..." />
      ) : (
        <div className="search-results my-5">
          {result && (
            <h3 className="my-3">No Result found for {searchInput}</h3>
          )}
          {searchResults.map((user) => (
            <div class="card text-white bg-primary mb-3" key={user._id}>
              <div class="card-body">
                {/* Joined {moment(user.createdAt).fromNow()} */}
                <h4 class="card-title">{user.name}</h4>
                <div>
                  {user.profileImage && (
                    <img
                      src={user.profileImage}
                      alt={user.name}
                      className="img-fluid my-2 search-profile-image"
                      width={100}
                      height={100}
                    />
                  )}
                </div>
                <Link to={`/profile/${user._id}`} className="btn btn-info">
                  Visit Profile
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchUser;
