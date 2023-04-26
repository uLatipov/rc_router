import Feed from "./Feed";

const Home = ({ posts, isLoading, fetchError }) => {
	return (
		<main className="Home">
			{isLoading && <p className="statusMsg">Loading posts...</p>}
			{fetchError && (
				<p className="statusMsg" style={{ color: "red" }}>
					{fetchError}
				</p>
			)}
			{!isLoading &&
				!fetchError &&
				(posts.length ? (
					<Feed posts={posts} />
				) : (
					<p style={{ marginTop: "2rem" }}>No posts to display</p>
				))}
		</main>
	);
};

export default Home;
