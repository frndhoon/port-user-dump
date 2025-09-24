import TopMenu from '@/app/user/_components/TopMenu';

const UserLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className="ml-[10rem]">
			<TopMenu />
			<div className="px-[2rem]">{children}</div>
		</div>
	);
};

export default UserLayout;
