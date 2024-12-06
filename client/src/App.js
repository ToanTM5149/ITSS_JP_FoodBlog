import React from 'react';
// import DetailsBlog from "./DetailsBlog" (đường dẫn đến file đó)
import WatchBlog from "./ui/WatchBlog";
import Blog from "./ui/Blog";
function App() {
  return (
    <div className="App">
    
      {/* <DetailsBlog /> */} 
      {/* hoặc như này khi có 1 component được export với tên như vậy, và mình muốn hiển thị ở đây*/}
      <Blog/>
    </div>
  );
}

export default App;
