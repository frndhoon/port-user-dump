import type { Metadata } from 'next';
import localFont from 'next/font/local';

import TanstackQueryProvider from '@/provider/TanstackQueryProvider';
import '../styles/globals.css';

const pretendard = localFont({
	src: '../../public/fonts/PretendardVariable.woff2',
	display: 'swap',
	weight: '45 920',
	variable: '--font-pretendard',
});

export const metadata: Metadata = {
	title: '개인화 설정 덤프',
	description: '포트아이 개인화 설정 덤프',
};

const RootLayout = ({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) => {
	return (
		<html lang="en">
			<body className={`${pretendard.variable} antialiased`}>
				<TanstackQueryProvider>{children}</TanstackQueryProvider>
			</body>
		</html>
	);
};

export default RootLayout;
