const QuoteRegion = () => {
	const Quote = require("inspirational-quotes");
	const quote = Quote.getQuote();
	return (
		<div
			className=" grow quote text-center w-5/6 mx-auto bg-black items-center justify-center flex flex-col gap-2
            
        "
		>
			<p>"{quote.text}"</p>
			<div>
				<p>{quote.author}</p>
			</div>
		</div>
	);
};
export default QuoteRegion;
