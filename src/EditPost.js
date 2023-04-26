import { useEffect, useContext, useState } from "react";
import { useParams, Link } from "react-router-dom";
import DataContext from "./context/DataContext";
import { format } from "date-fns";
import api from "./api/posts";

const EditPost = () => {
	const { posts, setPosts, navigate } = useContext(DataContext);

	const [editTitle, setEditTitle] = useState("");
	const [editBody, setEditBody] = useState("");

	const { id } = useParams();
	const post = posts.find((item) => item.id.toString() === id);

	const handleEdit = async (id) => {
		const datetime = format(new Date(), "MMMM dd, yyyy pp");
		const updatedPost = { id, datetime, title: editTitle, body: editBody };

		try {
			const response = await api.put(`/posts/${id}`, updatedPost);
			const list = posts.map((item) =>
				item.id.toString() === id ? { ...response.data } : item
			);
			setPosts(list);
			setEditBody("");
			setEditTitle("");
			navigate("/");
		} catch (err) {
			console.log(`Error: ${err.message}`);
		}
	};

	useEffect(() => {
		if (post) {
			setEditBody(post.body);
			setEditTitle(post.title);
		} else {
		}
	}, [post, setEditTitle, setEditBody]);
	return (
		<main className="NewPost">
			{editTitle && (
				<>
					<h2>Edit Post</h2>
					<form
						className="newPostForm"
						onSubmit={(e) => e.preventDefault()}
					>
						<label htmlFor="editTitle">Edited Title:</label>
						<input
							type="text"
							id="editTitle"
							required
							value={editTitle}
							onChange={(e) => setEditTitle(e.target.value)}
							placeholder="Edit Post Title"
						/>
						<label htmlFor="editBody">Edited Body:</label>
						<textarea
							id="editBody"
							required
							value={editBody}
							onChange={(e) => setEditBody(e.target.value)}
							placeholder="Edit Post Body"
						/>
						<button type="submit" onClick={() => handleEdit(id)}>
							Submit
						</button>
					</form>
				</>
			)}
			{!editTitle && (
				<>
					<h2>Page Not Found</h2>
					<p>Well, that's disappointing.</p>
					<p>
						{" "}
						<Link to="/">Visit our Homepage</Link>
					</p>
				</>
			)}
		</main>
	);
};

export default EditPost;
