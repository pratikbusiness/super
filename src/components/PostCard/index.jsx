const PostCard = ({ postTime, postContent }) => {
  return (
    <div className="px-2 py-3 border border-grey-200 bg-gray-100 rounded-md mb-4">
      <p>{postTime}</p>
      <p className="mt-4">{postContent}</p>
    </div>
  );
};

export default PostCard;
