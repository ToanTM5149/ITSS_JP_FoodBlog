const blogpageHandle = {
    handleNavigate: (navigate, id) => {
      navigate(`/blog-details/${id}`);
    },
  };

  export default blogpageHandle;

  const renderMedia = (media) => {
    if (Array.isArray(media) && media.length > 0) {
      const firstMedia = media[0];

      if (firstMedia.type === "image") {
        return <img
                src={firstMedia.url} alt="Media Content"
                style={{
                  width: "100%",
                  height: "200px",
                  objectFit: "cover",
                  borderRadius: "8px",
                }} />;
      } else if (firstMedia.type === "video") {
        return (
          <video controls>
            <source src={firstMedia.url} type="video/mp4" />
            Your browser does not support the video tag.
            style={{
                  width: "100%",
                  height: "200px",
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
          </video>
        );
      }
    }

    return <img src="https://via.placeholder.com/400" alt="Placeholder" style={{height: "400px"}} />;
  };