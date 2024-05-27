import React, { useEffect, useRef, useState } from "react";
import {
  formatEpochToCustomDate,
  isDateSmallerThanCurrent,
} from "../../utils/date";

function PostForm({ setPostData, postData }) {
  const timeRef = useRef(null);
  const contentRef = useRef(null);
  const errorStates = useState({ timeRef: false, contentRef: false });

  useEffect(() => {
    const intervalId = setInterval(() => {
      let isStateModified = false;
      const newPostData = postData.map((el) => {
        if (!el.isVisible && isDateSmallerThanCurrent(el.postTime)) {
          isStateModified = true;
          return { ...el, isVisible: true };
        }
        return el;
      });
      if (isStateModified) setPostData(newPostData);
    }, 100);
    return () => {
      clearInterval(intervalId);
    };
  }, [postData, setPostData]);

  const onSubmit = (e) => {
    e.preventDefault();
    if (!timeRef.current.value) {
      errorStates.timeRef = false;
    } else {
      errorStates.timeRef = true;
    }
    if (!contentRef.current.value) {
      errorStates.contentRef = false;
    } else {
      errorStates.contentRef = true;
    }
    const postTime = new Date(timeRef.current.value).getTime();
    const contentTime = contentRef.current.value;
    const data = {
      postTimeFormatted: formatEpochToCustomDate(postTime),
      postTime: postTime,
      postContent: contentTime,
      isVisible: false,
    };
    setPostData((prev) => [data, ...prev]);
    e.target.reset();
  };

  return (
    <form className="m-auto p-8" onSubmit={onSubmit}>
      <div className="mt-10">
        <label className="block" htmlFor="post-content">
          What's on your mind
        </label>
        <textarea
          className="border border-gray-200 w-full mt-3 h-32 p-1 rounded-md"
          placeholder="Write your content here!"
          ref={contentRef}
          name="post-content"
          id="post-content"
        />
        {errorStates.contentRef && <p>Content type is required</p>}
      </div>
      <div className="mt-10 mb-10">
        <label className="inline-block" htmlFor="post-time">
          Post By:&nbsp;
        </label>
        <input
          className="border border-gray-200 mt-3 rounded-md p-1"
          ref={timeRef}
          type="datetime-local"
          id="post-time"
        />
        {errorStates.timeRef && <p>Post time is required</p>}
      </div>
      <div className="text-center">
        <button
          className="bg-gray-500 border-transparent text-white px-3 py-1 rounded-md w-24 border hover:text-black hover:border-gray-500 hover:bg-transparent focus:text-black focus:border-gray-500 focus:bg-transparent outline-none focus:ring-1"
          type="submit"
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export default PostForm;
