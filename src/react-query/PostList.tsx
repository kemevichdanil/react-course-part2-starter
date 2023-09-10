import { useState } from "react";
import usePostList from "./hooks/usePostList";

const PostList = () => {
  const [userId, setUserId] = useState<number>();
  const { data: postList, error, isLoading } = usePostList(userId);
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;

  return (
    <>
      <select
        onChange={(event) =>
          setUserId(
            event.target.value !== "" ? parseInt(event.target.value) : undefined
          )
        }
        value={userId}
      >
        <option value=""></option>
        <option value="1">User 1</option>
        <option value="2">User 2</option>
        <option value="3">User 3</option>
      </select>
      <ul className="list-group">
        {postList?.map((post) => (
          <li key={post.id} className="list-group-item">
            {post.title}
          </li>
        ))}
      </ul>
    </>
  );
};

export default PostList;
