import { useState } from "react";
import usePostList from "./hooks/usePostList";

const PostList = () => {
  const pageSize = 15;
  const [page, setPage] = useState<number>(1);
  const { data: postList, error, isLoading } = usePostList({ page, pageSize });
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;

  return (
    <>
      <ul className="list-group">
        {postList?.map((post) => (
          <li key={post.id} className="list-group-item">
            {post.title}
          </li>
        ))}
      </ul>
      <button disabled={page === 1} onClick={() => setPage(page - 1)}>
        Previous
      </button>
      <button onClick={() => setPage(page + 1)}>Next</button>
    </>
  );
};

export default PostList;
