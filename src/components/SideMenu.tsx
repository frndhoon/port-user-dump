'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { BpaLogo, ShipMonitoring, Statistics, User, Container, Schedule } from '@/components/icons';
import { cn } from '@/lib/utils';

/**
 * @component 사이드바 컴포넌트
 * @author 우정훈
 * @description 모든 페이지의 좌측에 위치한 사이드바 컴포넌트
 * 현재 개인화 설정 라우팅만 구현할 예정이며, 나머지는 disabled로 접근하지 못하도록 막아둘 것입니다.
 */
const SideMenu = () => {
	return (
		<div className="border-stroke fixed z-10 box-content w-[10rem] border-r bg-white">
			<nav className="flex h-screen w-full flex-col overflow-y-auto">
				{/* BPA 로고 */}
				<div className="flex min-h-[10rem] w-full cursor-not-allowed items-center justify-center">
					<BpaLogo />
				</div>

				{/* 사이드바 메뉴 */}
				<div className="flex flex-grow flex-col">
					<SideMenuItem icon={<ShipMonitoring />} title={'선박 \n 모니터링'} href="#" />
					<SideMenuItem icon={<Container />} title={'화물 \n 모니터링'} href="#" />
					<SideMenuItem icon={<Schedule />} title={'선석 \n 스케줄(G)'} href="#" />
					<SideMenuItem icon={<Schedule />} title={'선석 \n 스케줄(T)'} href="#" />
					<SideMenuItem icon={<Container />} title={'컨테이너 \n 조회'} href="#" />
					<SideMenuItem icon={<Statistics />} title={'통계'} href="#" />
					<SideMenuItem icon={<User />} title={'개인화 \n 설정'} href="/user/address-book" />
				</div>

				{/* 사용자 정보 */}
				<div className="border-stroke flex h-[10rem] w-full flex-shrink-0 cursor-not-allowed flex-col items-center justify-center gap-[1rem] border-t">
					<Image src="/images/default_user.png" alt="default_user" width={35.26} height={35.26} />
					<p className="text-center text-[1.6rem]">홍길동</p>
				</div>
			</nav>
		</div>
	);
};

/**
 * @component 사이드바 메뉴 아이템 컴포넌트
 * @author 우정훈
 * @description 사이드바 메뉴 아이템 컴포넌트, 사이드바의 각 메뉴 아이템을 표시하는 컴포넌트
 * 해당 컴포넌트는 SideMenu 컴포넌트에서만 사용됩니다.
 * @param icon 아이콘
 * @param title 타이틀
 * @param href 라우팅 주소
 * @param disabled 비활성화 여부
 */

interface SideMenuItemProps {
	icon: React.ReactNode;
	title?: string;
	href: string;
	disabled?: boolean;
}

const SideMenuItem = ({ icon, title, href }: SideMenuItemProps) => {
	const pathname = usePathname();

	return (
		<Link
			href={href}
			className={cn(
				'flex h-[10rem] w-full flex-shrink-0 flex-col items-center justify-center gap-[1rem] hover:bg-[#F5F6F8]',
				pathname === href && 'text-primary bg-[#F5F6F8] font-bold',
				href === '#' && 'cursor-not-allowed',
			)}
		>
			<div className="flex h-[2.8rem] w-[2.8rem] items-center justify-center">{icon}</div>
			{title && <p className="text-center text-[1.7rem] leading-[110%] whitespace-pre-line">{title}</p>}
		</Link>
	);
};

export default SideMenu;
