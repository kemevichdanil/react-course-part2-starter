import { useState } from "react";
import usePostList from "./hooks/usePostList";
import React from "react";

const PostList = () => {
  const pageSize = 15;
  const {
    data: postList,
    error,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
  } = usePostList({ pageSize });
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;

  return (
    <>
      <ul className="list-group">
        {postList.pages.map((page, index) => (
          <React.Fragment key={index}>
            {page.map((post) => (
              <li key={post.id} className="list-group-item">
                {post.title}
              </li>
            ))}
          </React.Fragment>
        ))}
      </ul>
      <button disabled={isFetchingNextPage} onClick={() => fetchNextPage()}>
        Load more..
      </button>
    </>
  );
};

export default PostList;
