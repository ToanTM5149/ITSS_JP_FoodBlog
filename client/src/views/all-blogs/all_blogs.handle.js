const allBlogsHandle = {
    // Hàm phân trang
    paginateData: (data, page, pageSize) => {
      const startIndex = (page - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      return data.slice(startIndex, endIndex);
    },
  
    // Hàm sắp xếp dữ liệu theo ngày giảm dần
    sortBlogsByDate: (blogs) => {
      return [...blogs].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    },
  
    // Hàm xử lý chuyển hướng
    handleNavigate: (navigate, blogId) => {
      navigate(`/blog-details/${blogId}`);
    }
  };
  
  export default allBlogsHandle;
  