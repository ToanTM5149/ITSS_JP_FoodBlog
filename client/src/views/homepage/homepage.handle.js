const homepageHandle = {
    // Hàm điều hướng
    handleNavigate: (navigate, id) => {
      navigate(`/blog-details/${id}`);
    },
  
    // Hàm phân trang dữ liệu
    paginateData: (data, page) => {
      const startIndex = (page - 1) * 6;
      const endIndex = startIndex + 6;
      return data.slice(startIndex, endIndex);
    },
  
    // Hàm xử lý thay đổi trang
    handlePageChange: (page, setCurrentPage) => {
      setCurrentPage(page);
    },
  };
  
  export default homepageHandle;
  