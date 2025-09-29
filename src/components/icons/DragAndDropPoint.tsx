const DragAndDropPoint = ({ className }: { className?: string }) => {
	return (
		<svg width="13" height="10" viewBox="0 0 13 10" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
			<circle cx="1.5" cy="2.13672" r="1.5" fill="currentColor" />
			<circle cx="1.5" cy="8.13672" r="1.5" fill="currentColor" />
			<circle cx="6.5" cy="2.13672" r="1.5" fill="currentColor" />
			<circle cx="11.5" cy="2.13672" r="1.5" fill="currentColor" />
			<circle cx="6.5" cy="8.13672" r="1.5" fill="currentColor" />
			<circle cx="11.5" cy="8.13672" r="1.5" fill="currentColor" />
		</svg>
	);
};

export default DragAndDropPoint;
