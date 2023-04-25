import Home from "./Home";
import NewPost from "./NewPost";
import PostPage from "./PostPage";
import About from "./About";
import NoMatch from "./NoMatch";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { format } from "date-fns";
import Pagelayout from "./Pagelayout";
import api from "./api/posts";

function App() {
	const [posts, setPosts] = useState([]);
	const [search, setSearch] = useState("");
	const [searchResults, setSearchResults] = useState([]);

	const [postTitle, setPostTitle] = useState("");
	const [postBody, setPostBody] = useState("");

	const [editTitle, setEditTitle] = useState("");
	const [editBody, setEditBody] = useState("");

	const navigate = useNavigate();

	useEffect(() => {
		const fetchPosts = async () => {
			try {
				const response = await api.get("/posts");

				setPosts(response.data);
			} catch (error) {
				if (error.response) {
					console.log(error.response.data);
					console.log(error.response.headers);
					console.log(error.response.status);
				} else {
					console.log(`Error: ${error.message}`);
				}
			}
		};

		fetchPosts();
	}, []);

	useEffect(() => {
		const filteredResults = posts.filter(
			(post) =>
				post.body.toLowerCase().includes(search.toLowerCase()) ||
				post.title.toLowerCase().includes(search.toLowerCase())
		);

		setSearchResults(filteredResults.reverse());
	}, [posts, search]);

	const handleEdit = async (id) => {
		const datetime = format(new Date(), "MMMM dd, yyyy pp");
		const updatedPost = { id, datetime, title: editTitle, body: editBody };

		try {
			const response = await api.put(`/posts/${id}`, updatedPost);
			setPosts(
				posts.map((item) =>
					item.id === id ? { ...response.data } : item
				)
			);
			setEditBody("");
			setEditTitle("");
			navigate("/");
		} catch (err) {
			console.log(`Error: ${err.message}`);
		}
	};

	const handleDelete = async (id) => {
		try {
			await api.delete(`/posts/${id}`);
			// eslint-disable-next-line

			const list = posts.filter((item) => item.id != id);
			setPosts(list);
			navigate("/");
		} catch (err) {
			console.log(`Error: ${err.message}`);
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
		const datetime = format(new Date(), "MMMM dd, yyyy pp");

		const newPost = { id, datetime, title: postTitle, body: postBody };
		try {
			const response = await api.post("/posts", newPost);
			const list = [...posts, response.data];
			setPosts(list);
			setPostTitle("");
			setPostBody("");
			navigate("/");
		} catch (err) {
			console.log(`Error: ${err.message}`);
		}
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
