import Post from "./Post";

const Feed = ({ posts }) => {
	return (
		<>
			{posts.map((item) => (
				<Post key={item.id} post={item} />
			))}
		</>
	);
};

export default Feed;
