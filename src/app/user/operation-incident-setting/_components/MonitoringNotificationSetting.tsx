import { useState } from 'react';

import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';

/**
 * @component 선박 탐지 알림 설정 컴포넌트
 * @author 우정훈
 * @description 선박 탐지 알림 설정을 담당하는 컴포넌트입니다.
 * 코드 값과 설명은 'BERTHING_DELAY_NOTIFICATION' 와 같은 형태로 데이터를 전달 받으며, 해당 데이터를 사용자가 확인할 수 있게 표시합니다.
 * @param codeValue 코드 값
 * @param description 설명
 * @param activeYn 활성 여부
 * @param settingOffset 설정 오프셋
 */

interface MonitoringNotificationSettingProps {
	codeValue: string;
	description: string;
	activeYn: boolean;
	settingOffset?: number;
}

const MonitoringNotificationSetting = ({ codeValue, description, activeYn, settingOffset }: MonitoringNotificationSettingProps) => {
	const [currentActiveYn, setCurrentActiveYn] = useState(activeYn);
	const [currentSettingOffset, setCurrentSettingOffset] = useState(settingOffset);

	const displayCodeValues: Record<string, string> = {
		BERTHING_DELAY_NOTIFICATION: '접안 지연',
		DEPARTURE_DELAY_NOTIFICATION: '출항 지연',
		VESSEL_CONNECTION_UNAVAILABLE_NOTIFICATION: '선박 연결 불가',
	};

	const displayDescriptions: Record<string, string> = {
		'Berthing delay notification': '그룹 내 선박이 접안 지연되는 경우 사전에 알립니다.',
		'Departure delay notification': '그룹 내 선박이 출항 지연되는 경우 사전에 알립니다.',
		'Vessel connection unavailable notification': '그룹 내 선박간 환적이 불가능한 상황이 발생할 때 이를 사전에 알립니다.',
	};

	return (
		<div className="flex flex-row gap-[2rem]">
			<p className="text-17 w-[23rem] pt-[1rem] font-bold">{displayCodeValues[codeValue]}</p>
			<div className="flex flex-col gap-[1rem]">
				<div className="flex flex-row items-center gap-[1rem]">
					<Switch className="h-[2.6rem] w-[5rem]" checked={currentActiveYn} onCheckedChange={event => setCurrentActiveYn(event)} />
					{settingOffset && (
						<>
							<Input
								className="text-17 h-[4rem] w-[7rem] text-center font-medium"
								value={currentSettingOffset}
								onChange={e => setCurrentSettingOffset(Number(e.target.value))}
							/>
							<p className="text-17">분 경과</p>
						</>
					)}
				</div>
				<p className="text-13 opacity-50">{displayDescriptions[description]}</p>
			</div>
		</div>
	);
};

export default MonitoringNotificationSetting;
