
import axios from 'axios';

// 1. Hàm xử lý tìm kiếm blog
export const searchBlogs = async (keyword) => {
    try {
        console.log(`Gửi yêu cầu tìm kiếm blog với từ khóa: ${keyword}`);
        const response = await axios.get(`/api/blogs/search?keyword=${keyword}`);
        return response.data; // Trả về dữ liệu blog
    } catch (error) {
        console.error("Lỗi khi tìm kiếm blog:", error);
        return []; // Trả về danh sách rỗng nếu có lỗi
    }
};

// 2. Hàm xử lý lấy thông báo
export const getNotifications = async () => {
    try {
        console.log("Gửi yêu cầu lấy danh sách thông báo...");
        const response = await axios.get('/api/notifications');
        return response.data; // Trả về danh sách thông báo
    } catch (error) {
        console.error("Lỗi khi lấy thông báo:", error);
        return []; // Trả về danh sách rỗng nếu có lỗi
    }
};

// 3. Hàm xử lý tạo blog mới
export const createNewBlog = async (blogData) => {
    try {
        console.log("Gửi yêu cầu tạo blog mới với dữ liệu:", blogData);
        const response = await axios.post('/api/blogs', blogData);
        return response.data; // Trả về blog mới vừa được tạo
    } catch (error) {
        console.error("Lỗi khi tạo blog mới:", error);
    }
};

// 4. Hàm xử lý lấy tất cả blog
export const getAllBlogs = async () => {
    try {
        console.log("Gửi yêu cầu lấy danh sách tất cả blog...");
        const response = await axios.get('/api/blogs');
        return response.data; // Trả về danh sách blog
    } catch (error) {
        console.error("Lỗi khi lấy tất cả blog:", error);
        return [];
    }
};

// 5. Hàm xử lý lấy blog mới nhất
export const getLatestBlogs = async () => {
    try {
        console.log("Gửi yêu cầu lấy blog mới nhất...");
        const response = await axios.get('/api/blogs/latest');
        return response.data; // Trả về danh sách blog mới nhất
    } catch (error) {
        console.error("Lỗi khi lấy blog mới nhất:", error);
        return [];
    }
};

// 6. Hàm tải thông tin người dùng
export const loadUserProfile = async () => {
    try {
        console.log("Gửi yêu cầu tải thông tin cá nhân người dùng...");
        const response = await axios.get('/api/user/profile');
        return response.data; // Trả về thông tin người dùng
    } catch (error) {
        console.error("Lỗi khi tải thông tin người dùng:", error);
    }
};

// 7. Hàm cập nhật thông tin người dùng
export const updateUserProfile = async (profileData) => {
    try {
        console.log("Gửi yêu cầu cập nhật thông tin người dùng với dữ liệu:", profileData);
        const response = await axios.put('/api/user/profile', profileData);
        return response.data; // Trả về thông tin đã cập nhật
    } catch (error) {
        console.error("Lỗi khi cập nhật thông tin người dùng:", error);
    }
};

// 8. Hàm xử lý đăng xuất người dùng
export const logoutUser = async () => {
    try {
        console.log("Gửi yêu cầu đăng xuất người dùng...");
        await axios.post('/api/user/logout');
    } catch (error) {
        console.error("Lỗi khi đăng xuất người dùng:", error);
    }
};

// 9. Hàm xử lý tải thêm blog
export const loadMoreBlogs = async () => {
    try {
        console.log("Gửi yêu cầu tải thêm blog...");
        const response = await axios.get('/api/blogs/load-more');
        return response.data; // Trả về danh sách blog mới tải thêm
    } catch (error) {
        console.error("Lỗi khi tải thêm blog:", error);
        return [];
    }
};
