import { useParams, Link } from "react-router-dom";
import { useContext } from "react";
import DataContext from "./context/DataContext";
import api from "./api/posts";

const PostPage = () => {
	const { posts, navigate, setPosts } = useContext(DataContext);
	const { id } = useParams();
	const post = posts.find((item) => item.id.toString() === id);

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

	return (
		<main className="PostPage">
			<article className="post">
				{post && (
					<>
						<h2>{post.title}</h2>
						<p className="postDate"> {post.datetime}</p>
						<p className="postBody">{post.body}</p>
						<Link to={`/edit/${post.id}`}>
							<button className="editButton">Edit Post</button>
						</Link>
						<button
							className="deleteButton"
							onClick={() => handleDelete(post.id)}
						>
							Delete Post
						</button>
					</>
				)}
				{!post && (
					<>
						<h2>Post Not Found</h2>
						<p>Well, that's disappointing.</p>
						<p>
							<Link to="/">Visit Our Homepage</Link>
						</p>
					</>
				)}
			</article>
		</main>
	);
};

export default PostPage;
