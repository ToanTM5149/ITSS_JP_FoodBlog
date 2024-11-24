



export const fakePost = {
    title: "Exploring the Great Outdoors",
    imageUrl: "image/image.png", // make sure you place an image in the 'public/images' folder
    content: `
      <p>There's something magical about the great outdoors. Whether it's the fresh air, the beauty of nature, or the sense of adventure, exploring the wilderness has a special charm. In this blog post, we'll take a closer look at the joys of hiking, camping, and simply getting away from the hustle and bustle of daily life.</p>
      <p>The great outdoors offers a chance to reconnect with nature, breathe fresh air, and clear your mind. Whether you're a seasoned adventurer or just starting out, there's something for everyone.</p>
      <p>Make sure to bring the right gear and prepare for your trip, whether you're planning a weekend getaway or a week-long hike through the mountains.</p>`,
    tags: ["Nature", "Hiking", "Adventure", "Camping"],
    date: "2024-11-23",  // Example date
  };

  export function fetchPost() {
    return fakePost;
  }
  