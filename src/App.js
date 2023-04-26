import Pagelayout from "./Pagelayout";
import Home from "./Home";
import NewPost from "./NewPost";
import PostPage from "./PostPage";
import About from "./About";
import NoMatch from "./NoMatch";
import EditPost from "./EditPost";

import { Routes, Route } from "react-router-dom";
import { DataProvider } from "./context/DataContext";

function App() {
	return (
		<DataProvider>
			<Routes>
				<Route path="/" element={<Pagelayout />}>
					<Route index element={<Home />} />
					<Route path="post" element={<NewPost />} />
					<Route path="edit/:id" element={<EditPost />} />
					<Route path="post/:id" element={<PostPage />} />
					<Route path="about" element={<About />} />
					<Route path="*" element={<NoMatch />} />
				</Route>
			</Routes>
		</DataProvider>
	);
}

export default App;
