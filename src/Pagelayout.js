import { Outlet } from "react-router-dom";
import Nav from "./Nav";
import Header from "./Header";
import Footer from "./Footer";

const Pagelayout = ({ headerW, search, setSearch }) => {
	return (
		<div className="App">
			<Header width={headerW} title={"React Js Blog"} />

			<Nav search={search} setSearch={setSearch} />

			<Outlet />

			<Footer />
		</div>
	);
};

export default Pagelayout;
