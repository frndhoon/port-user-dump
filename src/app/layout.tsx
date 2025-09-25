import type { Metadata } from 'next';
import localFont from 'next/font/local';

import { Close, ToastError, ToastSuccess } from '@/components/icons';
import SideMenu from '@/components/SideMenu';
import { Toaster } from '@/components/ui/sonner';
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
				<TanstackQueryProvider>
					<SideMenu />
					{children}
					<Toaster
						visibleToasts={1}
						icons={{
							success: <ToastSuccess className="text-[#50B576]" />,
							error: <ToastError className="text-[#E12C3E]" />,
							close: <Close className="text-[#FFFFFF]" />,
						}}
						position="top-right"
						duration={4000}
						toastOptions={{
							style: {
								background: 'rgba(0, 0, 0, 0.7)',
								border: 'none',
								borderRadius: '1rem',
								padding: '1.6rem 1.3rem',
								width: '47.4rem',
								height: '4.1rem',
								fontSize: '1.4rem',
								fontWeight: '400',
								lineHeight: '100%',
								letterSpacing: '-0.02rem',
								color: '#ffffff',
								gap: '1rem',
							},
							closeButton: true,
						}}
					/>
				</TanstackQueryProvider>
			</body>
		</html>
	);
};

export default RootLayout;
