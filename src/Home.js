import Feed from "./Feed";
import { useContext } from "react";
import DataContext from "./context/DataContext";

const Home = () => {
	const { searchResults, isLoading, fetchError } = useContext(DataContext);
	return (
		<main className="Home">
			{isLoading && <p className="statusMsg">Loading posts...</p>}
			{!isLoading && fetchError && (
				<p className="statusMsg" style={{ color: "red" }}>
					{fetchError}
				</p>
			)}
			{!isLoading &&
				!fetchError &&
				(searchResults.length ? (
					<Feed posts={searchResults} />
				) : (
					<p style={{ marginTop: "2rem" }}>No posts to display</p>
				))}
		</main>
	);
};

export default Home;
