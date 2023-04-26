import { useContext, useState } from "react";
import DataContext from "./context/DataContext";
import { format } from "date-fns";
import api from "./api/posts";

const NewPost = () => {
	const { posts, setPosts, navigate } = useContext(DataContext);

	const [postTitle, setPostTitle] = useState("");
	const [postBody, setPostBody] = useState("");

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
		<main className="NewPost">
			<h2>New Post</h2>
			<form className="newPostForm" onSubmit={handleSubmit}>
				<label htmlFor="postTitle">Title:</label>
				<input
					type="text"
					id="postTitle"
					required
					value={postTitle}
					onChange={(e) => setPostTitle(e.target.value)}
					placeholder="Enter Post Title"
				/>
				<label htmlFor="postBody">Post Body:</label>
				<textarea
					id="postBody"
					required
					value={postBody}
					onChange={(e) => setPostBody(e.target.value)}
					placeholder="Enter Post Body"
				/>
				<button type="submit">Submit</button>
			</form>
		</main>
	);
};

export default NewPost;
