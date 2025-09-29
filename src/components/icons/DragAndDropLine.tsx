const DragAndDropLine = ({ className }: { className?: string }) => {
	return (
		<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
			<g opacity="0.5">
				<line x1="2.40625" y1="2.82031" x2="9.66975" y2="2.82031" stroke="currentColor" />
				<line x1="2.40625" y1="2.82031" x2="9.66975" y2="2.82031" stroke="currentColor" />
				<line x1="2.40625" y1="6.09326" x2="9.66975" y2="6.09326" stroke="currentColor" />
				<line x1="2.40625" y1="9.36621" x2="9.66975" y2="9.36621" stroke="currentColor" />
			</g>
		</svg>
	);
};

export default DragAndDropLine;
