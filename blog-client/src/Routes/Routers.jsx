import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../Components/Home";
import SignUp from "../Components/Auth/SignUp";
import SignIn from "../Components/Auth/SignIn";
import Posts from "../Components/Post/Posts";
import PostDetails from "../Components/Post/PostDetails";
import Profile from "../Components/User/Profile";
import Dashboard from "../Components/Admin/Dashboard";
import AdminUserProfile from "../Components/Admin/AdminUserProfile";
import ErrorPage from "../Components/ErrorPage";
import CreatePost from "../Components/Post/CreatePost";
import UpdatePost from "../Components/Post/UpdatePost";
import Logout from "../Components/Auth/Logout";
import UserDashboard from "../Components/User/UserDashboard";

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/auth/sign-up" element={<SignUp />} />
      <Route path="/auth/sign-in" element={<SignIn />} />
      <Route path="/auth/logout" element={<Logout />} />
      <Route path="/posts" element={<Posts />} />
      <Route path="/posts/:postId" element={<PostDetails />} />
      <Route path="/posts/create-post" element={<CreatePost />} />
      <Route path="/posts/:postId/update-post" element={<UpdatePost />} />
      <Route path="/users/profile" element={<UserDashboard />} />
      <Route path="/admin/dashboard" element={<Dashboard />} />
      <Route
        path="/admin/dashboard/:userId/user-profile"
        element={<AdminUserProfile />}
      />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};

export default Routers;
