import { NavigationBar } from "./_components/navigation-bar";
import { SideBar } from "./_components/side-bar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className="h-full">
			<div className="fixed inset-y-0 z-50 h-[80px] w-full md:pl-96">
				<NavigationBar />
			</div>

			<div className="fixed inset-y-0 z-50 hidden h-full w-96 flex-col md:flex">
				<SideBar />
			</div>

			<main className="h-full pt-[80px] md:pl-96">{children}</main>
		</div>
	);
};

export default DashboardLayout;
