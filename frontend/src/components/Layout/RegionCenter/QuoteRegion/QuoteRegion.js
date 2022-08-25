const QuoteRegion = () => {
	const Quote = require("inspirational-quotes");
	const quote = Quote.getQuote();
	return (
		<div
			className=" grow quote text-center w-5/6 mx-auto  items-center justify-center flex flex-col gap-2
        
        "
		>
			<div className="group">
				<p>"{quote.text}"</p>
				<div
					className="text-sm text-white/50 -mt-4 
                invisible
                group-hover:visible group-hover:translate-y-4 transition ease-out duration-500 
                "
				>
					<p>{quote.author}</p>
				</div>
			</div>
		</div>
	);
};
export default QuoteRegion;
