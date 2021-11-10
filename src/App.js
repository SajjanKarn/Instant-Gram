import { Routes, Route } from "react-router-dom";

import Layout from "components/Layout";

import Login from "pages/Login";
import Register from "pages/Register";
import Home from "pages/Home";
import Profile from "pages/Profile";
import CreatePost from "pages/CreatePost";

import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/create" element={<CreatePost />} />
      </Routes>
    </Layout>
  );
};

export default App;
