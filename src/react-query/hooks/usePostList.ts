import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface Post {
    id: number;
    title: string;
    body: string;
    userId: number;
  }
  interface Props {
    page: number;
    pageSize: number
  }
const usePostList = ({page, pageSize}: Props) => {
	const fetchPostList = () =>
		axios
      .get<Post[]>("https://jsonplaceholder.typicode.com/posts", {
        params: {
          _start: (page - 1) * pageSize,
          _limit: pageSize
        }
      })
			.then((res) => res.data)

	return useQuery<Post[], Error>({
		queryKey: ['posts', page],
		queryFn: fetchPostList,
    staleTime: 10 * 1000,
    keepPreviousData: true
	});
}

export default usePostList;