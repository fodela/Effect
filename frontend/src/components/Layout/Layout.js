const Layout = ({ children }) => {
	return (
		<div
			className="h-screen relative
		bg-[rgba(0,0,0,.3)]"
		>
			<img
				src="
				https://images.unsplash.com/photo-1434394354979-a235cd36269d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1151&q=80"
				alt="background-img"
				className="object-cover w-full h-full absolute mix-blend-overlay text-center"
			/>
			{children}
		</div>
	);
};

export default Layout;
