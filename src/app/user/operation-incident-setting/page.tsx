'use client';

import Breadcrumb from '@/app/user/_components/Breadcrumb';
import MonitoringNotificationSetting from '@/app/user/operation-incident-setting/_components/MonitoringNotificationSetting';
import { monitoringNotificationList } from '@/app/user/operation-incident-setting/_constants/monitoring-notification-constants';
import useOperationIncidentSetting from '@/app/user/operation-incident-setting/_hooks/useOperationIncidentSetting';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { VesselLoader } from '@/components/VesselLoader';

const OperationIncidentSettingPage = () => {
	const { localEntireActiveYn, setLocalEntireActiveYn, localSettings, updateLocalSetting, updateOperationIncidentSetting, isGetLoading, isUpdatePending } =
		useOperationIncidentSetting();

	return (
		<div id="operation-incident-setting" className="flex flex-col gap-[2rem]">
			{(isGetLoading || isUpdatePending) && <VesselLoader />}

			{/* 상단 메뉴 */}
			<div className="flex flex-row items-center justify-between">
				<Breadcrumb topMenuTitle="이상탐지 설정" sideMenuTitle="개인화 설정" />
				<Button
					variant="secondary"
					className="h-[4rem] w-[9rem] rounded-[1rem] px-[3rem] py-0 text-white"
					disabled={isUpdatePending || isGetLoading}
					onClick={() => updateOperationIncidentSetting()}
				>
					<p className="text-17 font-bold">{isUpdatePending ? '저장중...' : '저장'}</p>
				</Button>
			</div>

			{/* 전체 이상탐지 수신 */}
			<div className="flex h-[10rem] flex-row items-center rounded-[1.5rem] bg-white px-[4rem]">
				<p className="text-25 flex h-[4rem] w-[30rem] flex-shrink-0 items-center font-semibold">이상탐지 수신</p>
				<Switch
					className="h-[2.6rem] w-[5rem]"
					checked={localEntireActiveYn}
					onCheckedChange={setLocalEntireActiveYn}
					disabled={isGetLoading || isUpdatePending}
				/>
			</div>

			{/* 개별 이상탐지 설정 */}
			<div className="flex h-[34.2rem] flex-row rounded-[1.5rem] bg-white px-[4rem] pt-[4rem] pb-[3rem]">
				<p className="text-25 flex h-[4rem] w-[30rem] flex-shrink-0 items-center font-semibold">선박 탐지</p>
				<div className="flex flex-col gap-[3rem]">
					{/* 3개의 선박 탐지 알림 설정 컴포넌트 (접안 지연, 출항 지연, 선박 연결 불가) */}
					{monitoringNotificationList.map(({ displayName, codeValue, description }) => {
						const setting = localSettings.find(s => s.monitoringNotificationType.codeValue === codeValue);
						return (
							<MonitoringNotificationSetting
								key={codeValue}
								displayName={displayName}
								codeValue={codeValue}
								description={description}
								setting={setting}
								onUpdate={updateLocalSetting}
								entireActiveYn={localEntireActiveYn}
								isGetLoading={isGetLoading}
								isUpdatePending={isUpdatePending}
							/>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default OperationIncidentSettingPage;
