'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';

/**
 * @component 상단 메뉴 컴포넌트
 * @author 우정훈
 * @description 개인화 설정 페이지의 공통 상단 메뉴 컴포넌트
 */

const TopMenu = () => {
	return (
		<div className="border-stroke flex h-[6rem] w-full flex-row items-end gap-[3rem] border-b px-[2rem]">
			<TopMenuItem title="주소록" href="/user/address-book" />
			<TopMenuItem title="이상탐지 설정" href="#" />
			<TopMenuItem title="기타 설정" href="#" />
			<TopMenuItem title="엑셀 양식 관리" href="#" />
		</div>
	);
};

/**
 * @component 상단 메뉴 아이템 컴포넌트
 * @author 우정훈
 * @description 상단 메뉴의 각 아이템 컴포넌트
 * 해당 컴포넌트는 TopMenu 컴포넌트에서만 사용됩니다.
 * @param title 메뉴 타이틀
 * @param href 메뉴 링크
 * @param disabled 메뉴 비활성화 여부
 */

interface TopMenuItemProps {
	title: string;
	href: string;
	disabled?: boolean;
}

const TopMenuItem = ({ title, href }: TopMenuItemProps) => {
	const pathname = usePathname();

	return (
		<Link
			href={href}
			className={cn(
				'flex h-[2.9rem] items-start text-[1.7rem]',
				pathname === href && 'text-primary border-b-primary border-b-[3px] font-semibold',
				href === '#' && 'cursor-not-allowed',
			)}
		>
			{title}
		</Link>
	);
};

export default TopMenu;
