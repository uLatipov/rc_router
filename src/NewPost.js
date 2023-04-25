const NewPost = ({
	postTitle,
	postBody,
	setPostTitle,
	setPostBody,
	handleSubmit,
}) => {
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
