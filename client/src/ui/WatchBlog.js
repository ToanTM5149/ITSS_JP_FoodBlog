import React from "react";
import Header from "../components/watchblog/Header";
import UserInfo from "../components/watchblog/UserInfo";
import MainContent from "../components/watchblog/MainContent";
import Sidebar from "../components/watchblog/Sidebar";
import RecommendedPosts from "../components/watchblog/RecommendedPosts";
import "./WatchBlog.css";
/*Update cho icon react: npm install react-icons */
function App() {
  return (
    <div className="container">
      <Header />
      <UserInfo />
      {/* Flex container for MainContent and Sidebar */}
      <div className="main-wrapper">
        <MainContent />
        <Sidebar />
      </div>
      <RecommendedPosts />
    </div>
  );
}

export default App;
