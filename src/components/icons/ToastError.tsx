const ToastError = ({ className }: { className?: string }) => {
	return (
		<svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
			<rect y="0.576172" width="20" height="20" rx="10" fill="currentColor" />
			<path d="M6.73299 7.31193L9.99723 10.5762L6.73299 13.8404" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
			<path d="M13.2592 7.31193L9.99495 10.5762L13.2592 13.8404" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
		</svg>
	);
};

export default ToastError;
