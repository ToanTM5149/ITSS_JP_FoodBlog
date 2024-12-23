// import { message } from 'antd';

// const headerHandle = {
//   handleLogout: (navigate, setIsLoggedIn) => {
//     localStorage.removeItem('loggedInUser'); // Xóa thông tin đăng nhập
//     setIsLoggedIn(false); // Chuyển trạng thái sang chưa đăng nhập
//     message.success('Đã đăng xuất thành công!');
//     navigate('/');
//   },

//   handleLoginRedirect: (navigate) => {
//     navigate('/login');
//   },

//   handleSearch: (searchValue) => {
//     console.log("Tìm kiếm:", searchValue);
//   },

//   navigateToCreateBlog: (navigate) => {
//     navigate('/createblog');
//   },

//   navigateToAllBlog: (navigate) => {
//     navigate('/all-blogs');
//   },

//   navigateToProfile: (navigate) => {
//     navigate('/profile');
//   },

//   navigateToHome: (navigate) => {
//     navigate('/');
//   },

//   isLoggedIn: () => {
//     return localStorage.getItem('loggedInUser') !== null; // Kiểm tra trạng thái đăng nhập
//   },
// };

// export default headerHandle;