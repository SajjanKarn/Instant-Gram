import { Routes, Route } from "react-router-dom";

import Layout from "components/Layout";

import { AuthContextProvider } from "context/AuthContext";
import { ToastProvider } from "context/ToastProvider";

import Login from "pages/Login";
import Register from "pages/Register";
import Home from "pages/Home";
import Profile from "pages/Profile";
import CreatePost from "pages/CreatePost";
import UserProfile from "pages/UserProfile";
import FollowingPost from "pages/FollowingPost";
import ChangePassword from "pages/ChangePassword";

import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <AuthContextProvider>
      <ToastProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/create" element={<CreatePost />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/followingpost" element={<FollowingPost />} />
            <Route path="/changepassword" element={<ChangePassword />} />
            <Route path="/profile/:userId" element={<UserProfile />} />
          </Routes>
        </Layout>
      </ToastProvider>
    </AuthContextProvider>
  );
};

export default App;
