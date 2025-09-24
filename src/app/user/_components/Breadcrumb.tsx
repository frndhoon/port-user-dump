/**
 * @component 현재 페이지 위치 표시 컴포넌트
 * @author 우정훈
 * @description 개인화 설정 페이지의 공통 top menu, side menu 타이틀로 현재 페이지의 위치를 표시하 컴포넌트
 * @param topMenuTitle 상단 메뉴 타이틀
 * @param sideMenuTitle 사이드 메뉴 타이틀
 */

interface BreadcrumbProps {
	topMenuTitle: string;
	sideMenuTitle: string;
}

const Breadcrumb = ({ topMenuTitle, sideMenuTitle }: BreadcrumbProps) => {
	return (
		<div className="flex h-[10.4rem] w-full flex-col justify-center gap-[1rem]">
			<div className="text-[2rem] font-semibold opacity-40">{topMenuTitle}</div>
			<div className="text-[2.8rem] leading-[100%] font-semibold">{sideMenuTitle}</div>
		</div>
	);
};

export default Breadcrumb;
