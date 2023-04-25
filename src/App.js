import Home from "./Home";
import NewPost from "./NewPost";
import PostPage from "./PostPage";
import About from "./About";
import NoMatch from "./NoMatch";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { format } from "date-fns";
import Pagelayout from "./Pagelayout";

function App() {
	const [posts, setPosts] = useState([
		{
			id: 1,
			title: "My First Post",
			datetime: "July 01, 2021 11:17:36 AM",
			body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis consequatur expedita, assumenda similique non optio! Modi nesciunt excepturi corrupti atque blanditiis quo nobis, non optio quae possimus illum exercitationem ipsa!",
		},
		{
			id: 2,
			title: "My 2nd Post",
			datetime: "July 01, 2021 11:17:36 AM",
			body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis consequatur expedita, assumenda similique non optio! Modi nesciunt excepturi corrupti atque blanditiis quo nobis, non optio quae possimus illum exercitationem ipsa!",
		},
		{
			id: 3,
			title: "My 3rd Post",
			datetime: "July 01, 2021 11:17:36 AM",
			body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis consequatur expedita, assumenda similique non optio! Modi nesciunt excepturi corrupti atque blanditiis quo nobis, non optio quae possimus illum exercitationem ipsa!",
		},
		{
			id: 4,
			title: "My Fourth Post",
			datetime: "July 01, 2021 11:17:36 AM",
			body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis consequatur expedita, assumenda similique non optio! Modi nesciunt excepturi corrupti atque blanditiis quo nobis, non optio quae possimus illum exercitationem ipsa!",
		},
	]);
	const [search, setSearch] = useState("");
	const [searchResults, setSearchResults] = useState([]);

	const [postTitle, setPostTitle] = useState("");
	const [postBody, setPostBody] = useState("");

	const navigate = useNavigate();

	useEffect(() => {
		const filteredResults = posts.filter(
			(post) =>
				post.body.toLowerCase().includes(search.toLowerCase()) ||
				post.title.toLowerCase().includes(search.toLowerCase())
		);

		setSearchResults(filteredResults.reverse());
	}, [posts, search]);

	const handleDelete = (id) => {
		// eslint-disable-next-line
		const list = posts.filter((item) => item.id != id);
		setPosts(list);
		navigate("/");
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
		const datetime = format(new Date(), "MMMM dd, yyyy pp");

		const newPost = { id, datetime, title: postTitle, body: postBody };

		const list = [...posts, newPost];
		setPosts(list);
		setPostTitle("");
		setPostBody("");
		navigate("/");
	};

	return (
		<Routes>
			<Route
				path="/"
				element={<Pagelayout search={search} setSearch={setSearch} />}
			>
				<Route index element={<Home posts={searchResults} />} />
				<Route
					path="post"
					element={
						<NewPost
							postTitle={postTitle}
							postBody={postBody}
							setPostTitle={setPostTitle}
							setPostBody={setPostBody}
							handleSubmit={handleSubmit}
						/>
					}
				/>
				<Route
					path="post/:id"
					element={
						<PostPage posts={posts} handleDelete={handleDelete} />
					}
				/>
				<Route path="about" element={<About />} />
				<Route path="*" element={<NoMatch />} />
			</Route>
		</Routes>
	);
}

export default App;
