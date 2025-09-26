'use client';

import Breadcrumb from '@/app/user/_components/Breadcrumb';
import MonitoringNotificationSetting from '@/app/user/operation-incident-setting/_components/MonitoringNotificationSetting';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';

const OperationIncidentSettingPage = () => {
	// 더미 데이터
	const monitoringNotificationSettings = [
		{ codeValue: 'BERTHING_DELAY_NOTIFICATION', description: 'Berthing delay notification', activeYn: true, settingOffset: 1 },
		{ codeValue: 'DEPARTURE_DELAY_NOTIFICATION', description: 'Departure delay notification', activeYn: true, settingOffset: 2 },
		{ codeValue: 'VESSEL_CONNECTION_UNAVAILABLE_NOTIFICATION', description: 'Vessel connection unavailable notification', activeYn: true },
	];

	return (
		<div id="operation-incident-setting" className="flex flex-col gap-[2rem]">
			{/* 상단 메뉴 */}
			<div className="flex flex-row items-center justify-between">
				<Breadcrumb topMenuTitle="이상탐지 설정" sideMenuTitle="개인화 설정" />
				<Button variant="secondary" className="h-[4rem] w-[9rem] rounded-[1rem] px-[3rem] py-0 text-white">
					<p className="text-17 font-bold">저장</p>
				</Button>
			</div>

			{/* 전체 이상탐지 수신 */}
			<div className="flex h-[10rem] flex-row items-center rounded-[1.5rem] bg-white px-[4rem]">
				<p className="text-25 flex h-[4rem] w-[30rem] items-center font-semibold">이상탐지 수신</p>
				<Switch className="h-[2.6rem] w-[5rem]" />
			</div>

			{/* 개별 이상탐지 설정 */}
			<div className="flex h-[34.2rem] flex-row rounded-[1.5rem] bg-white px-[4rem] pt-[4rem] pb-[3rem]">
				<p className="text-25 flex h-[4rem] w-[30rem] items-center font-semibold">선박 탐지</p>
				<div className="flex flex-col gap-[3rem]">
					{monitoringNotificationSettings.map(item => (
						<MonitoringNotificationSetting key={item.codeValue} {...item} />
					))}
				</div>
			</div>
		</div>
	);
};

export default OperationIncidentSettingPage;
