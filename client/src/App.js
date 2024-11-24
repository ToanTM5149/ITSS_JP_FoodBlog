import React from 'react';
import UserDisplay from './Homepage/UserDisplay'; // Import đúng đường dẫn đến UserDisplay
import SearchBar from './Homepage/SearchBar'; // Import đúng đường dẫn đến SearchBar
import NotificationIcon from './Homepage/NotificationIcon'; // Import đúng đường dẫn đến NotificationIcon
import BlogList from './Homepage/BlogList'; // Import đúng đường dẫn đến BlogList
import ActionButtons from './Homepage/ActionButtons'; // Import đúng đường dẫn đến ActionButtons

function App() {
  return (
    <div className="App">
      <h1>Hello, React is working!</h1> 
      <UserDisplay /> {/* Hiển thị component UserDisplay */}
      <SearchBar /> {/* Hiển thị component SearchBar */}
      <NotificationIcon /> {/* Hiển thị component NotificationIcon */}
      <BlogList /> {/* Hiển thị component BlogList */}
      <ActionButtons /> {/* Hiển thị component ActionButtons */}
    </div>
  );
}

export default App;
