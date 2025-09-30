import TopMenu from '@/app/user/_components/TopMenu';

const UserLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className="ml-[10rem] flex h-full flex-col">
			<TopMenu />
			<div className="flex-1 overflow-x-auto px-[2rem] [&:has(#etc-setting)]:bg-[#F5F5F5] [&:has(#operation-incident-setting)]:bg-[#F5F5F5]">
				<div className="min-w-[144rem]">{children}</div>
			</div>
		</div>
	);
};

export default UserLayout;
