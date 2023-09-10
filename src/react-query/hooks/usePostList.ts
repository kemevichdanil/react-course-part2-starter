import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import axios from "axios";

interface Post {
    id: number;
    title: string;
    body: string;
    userId: number;
  }
  interface Props {
    pageSize: number
  }
const usePostList = ({pageSize}: Props) => {
	const fetchPostList = ({pageParam = 1}) =>
		axios
      .get<Post[]>("https://jsonplaceholder.typicode.com/posts", {
        params: {
          _start: (pageParam - 1) * pageSize,
          _limit: pageSize
        }
      })
			.then((res) => res.data)

	return useInfiniteQuery<Post[], Error>({
		queryKey: ['posts', pageSize],
		queryFn: fetchPostList,
    staleTime: 10 * 1000,
    keepPreviousData: true,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length > 0 ? allPages.length + 1 : undefined
    }
	});
}

export default usePostList;