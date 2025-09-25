const ToastSuccess = ({ className }: { className?: string }) => {
	return (
		<svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
			<rect x="0.277344" y="0.617676" width="20" height="20" rx="10" fill="currentColor" />
			<path d="M6.68164 10.305L9.28729 12.9106L13.8732 8.32471" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
		</svg>
	);
};

export default ToastSuccess;
