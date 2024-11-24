import React from "react";
import UserDisplay from "./components/UserDisplay";
import SearchBar from "./components/SearchBar";
import NotificationIcon from "./components/NotificationIcon";
import BlogList from "./components/BlogList";
import ActionButtons from "./components/ActionButtons";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="header">
        <UserDisplay username="4本足のサメ" />
        <SearchBar />
        <NotificationIcon hasNotifications={true} />
      </header>
      <ActionButtons />
      <main>
        <BlogList type="latest" />
        <BlogList type="all" />
      </main>
    </div>
  );
}

export default App;
