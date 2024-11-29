import React from 'react';
// import DetailsBlog from "./DetailsBlog" (đường dẫn đến file đó)
import Homepage from "./ui/homepage";
function App() {
  return (
    <div className="App">
      <Homepage/>
      {/* <DetailsBlog /> */} 
      {/* hoặc như này khi có 1 component được export với tên như vậy, và mình muốn hiển thị ở đây*/}
    </div>
  );
}

export default App;
