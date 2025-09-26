import TopMenu from '@/app/user/_components/TopMenu';

const UserLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className="ml-[10rem] flex h-full flex-col">
			<TopMenu />
			<div className="flex-1 px-[2rem] [&:has(#operation-incident-setting)]:bg-[#F5F5F5]">{children}</div>
		</div>
	);
};

export default UserLayout;
