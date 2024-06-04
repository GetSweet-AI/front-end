import {dateUpdate} from '../partials/Time'; 

const groupPostsByDate = (posts) => {
  return posts.reduce((grouped, post) => {
    const date = dateUpdate(post.unixTimestamp); // Convert timestamp to readable date
    if (!grouped[date]) {
      grouped[date] = [];
    }
    grouped[date].push(post);
    return grouped;
  }, {});
};

export default groupPostsByDate;
