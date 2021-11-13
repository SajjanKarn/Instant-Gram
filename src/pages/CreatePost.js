import Spinner from "components/Spinner";
import ToastContext from "context/ToastProvider";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";

const CreatePost = () => {
  const { toast } = useContext(ToastContext);
  const navigate = useNavigate();
  const [post, setPost] = useState({
    title: "",
    body: "",
  });
  const [file, setFile] = useState();
  const [imageURL, setImageURL] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (imageURL) {
      // now send request to the backend.
      fetch(`https://instant-gram-backend.herokuapp.com/createpost`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ ...post, imageURL }),
      })
        .then((res) => res.json())
        .then((result) => {
          if (!result.error) {
            toast.success("You post has been posted 😊");
            setLoading(false);

            navigate("/");
          } else {
            toast.error(result.error);
            setLoading(false);
          }
        })
        .catch((err) => console.log(err));
    }
  }, [imageURL]);

  // handle input change.
  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setPost({ ...post, [name]: value });
  };

  // handle form submit.
  const handleSubmit = (event) => {
    event.preventDefault();

    if (!file.type.includes("image/")) {
      toast.error("File must be a image file!");
      return;
    }
    if (file.size > 8388608) {
      // bytes.
      toast.error("Image must be less than 8mb");
      return;
    }

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "instant-gram-clone");
    data.append("cloud_name", "dvhdpzlkq");

    setLoading(true);
    fetch(`https://api.cloudinary.com/v1_1/dvhdpzlkq/image/upload`, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((result) => {
        if (!result.error) {
          setImageURL(result.secure_url);
        } else {
          toast.error("cannot upload photo at the moment");
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="create-post">
      {loading ? (
        <Spinner splash="Posting..." />
      ) : (
        <>
          <h3>Create Post</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="titleInput" className="form-label mt-4">
                Title
              </label>
              <input
                type="text"
                className="form-control"
                id="titleInput"
                placeholder="Enter title"
                name="title"
                value={post.title}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="bodyInput" className="form-label mt-4">
                Body
              </label>
              <textarea
                rows={6}
                className="form-control"
                id="bodyInput"
                placeholder="Enter Body"
                name="body"
                value={post.body}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="custom-file my-2">
              <label className="custom-file-label mx-2" htmlFor="photoInput">
                Choose Photo
              </label>
              <input
                type="file"
                className="custom-file-input btn btn-success"
                id="photoInput"
                accept="image/*"
                onChange={(e) => setFile(e.target.files[0])}
                required
              />
            </div>

            <input
              type="submit"
              value="Submit Post"
              className="btn btn-success my-3"
            />
          </form>
        </>
      )}
    </div>
  );
};

export default CreatePost;
