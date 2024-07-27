import notePic from "../../resources/notes_app.png";


const Logo = () => {
	return (
		<div className="ml-4  my-3 flex ">
			<img className="w-10 h-11" src={notePic} alt="" />
			<span className="my-2 ml-3 text-2xl text-transparent bg-clip-text bg-gradient-to-b from-amber-200 to-amber-500 text-shadow-md ">
				Notify
			</span>
		</div>
	);
};

export default Logo;
