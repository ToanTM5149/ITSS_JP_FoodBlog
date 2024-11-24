import React from 'react';
// import DetailsBlog from "./DetailsBlog" (đường dẫn đến file đó)
import WatchBlog from "./ui/WatchBlog";
function App() {
  return (
    <div className="App">
      <h1>Hello, React is working!</h1> {/* có thể thêm nội dung vào như này  */}
      {/* <DetailsBlog /> */} 
      {/* hoặc như này khi có 1 component được export với tên như vậy, và mình muốn hiển thị ở đây*/}
      <WatchBlog/>
    </div>
  );
}

export default App;
