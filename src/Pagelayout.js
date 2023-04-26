import { Outlet } from "react-router-dom";
import Nav from "./Nav";
import Header from "./Header";
import Footer from "./Footer";

const Pagelayout = () => {
	return (
		<div className="App">
			<Header title={"React Js Blog"} />

			<Nav />

			<Outlet />

			<Footer />
		</div>
	);
};

export default Pagelayout;
