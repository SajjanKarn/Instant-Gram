import { Link } from "react-router-dom";

const CreatePost = () => {
  return (
    <div className="create-post">
      <h3>Create Post</h3>
      <form>
        <div className="form-group">
          <label htmlFor="titleInput" className="form-label mt-4">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="titleInput"
            placeholder="Enter title"
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
            required
          />
        </div>
        <div class="custom-file my-2">
          <label class="custom-file-label mx-2" htmlFor="photoInput">
            Choose Photo
          </label>
          <input
            type="file"
            class="custom-file-input btn btn-success"
            id="photoInput"
          />
        </div>

        <input
          type="submit"
          value="Submit Post"
          className="btn btn-success my-3"
        />
      </form>
    </div>
  );
};

export default CreatePost;
