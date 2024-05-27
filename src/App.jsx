import { useState } from "react";
import { PostCard } from "./components";
import PostForm from "./components/PostForm/index.jsx";

export default function App() {
  const [postData, setPostData] = useState([]);

  return (
    <div className="flex h-screen">
      <div className="w-1/2 flex">
        <PostForm setPostData={setPostData} postData={postData} />
      </div>
      <div className="border-l border-grey-200 h-auto my-16 w-1"></div>
      <div className="w-1/2 flex flex-col my-16 px-6">
        <h1 className="text-2xl mb-6">Your Posts</h1>
        <div className="max-h-full overflow-auto">
          {postData.map((singlePost, index) => {
            if (!singlePost.isVisible) return null;
            return (
              <PostCard
                key={singlePost.postTime + index}
                postTime={singlePost.postTimeFormatted}
                postContent={singlePost.postContent}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
