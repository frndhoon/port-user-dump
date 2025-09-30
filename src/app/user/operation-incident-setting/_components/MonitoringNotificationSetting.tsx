import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import * as operationIncidentSettingTypes from '@/types/operation-incident-setting-types';

/**
 * @component 선박 탐지 알림 설정 컴포넌트
 * @author 우정훈
 * @description 선박 탐지 알림 설정을 담당하는 컴포넌트입니다.
 * 각 개별 데이터는 codeValue 값을 통해 로컬에서 업데이트됩니다.
 * @param displayName 표시 이름
 * @param codeValue 코드 값
 * @param description 설명
 * @param setting 설정 데이터
 * @param onUpdate 설정 업데이트 콜백
 * @param entireActiveYn 전체 이상탐지 수신 여부
 * @param isGetLoading 서버 데이터 로딩 여부
 * @param isUpdatePending 서버 데이터 업데이트 여부
 */

interface MonitoringNotificationSettingProps {
	displayName: string;
	codeValue: string;
	description: string;
	setting?: operationIncidentSettingTypes.Setting;
	onUpdate: (codeValue: string, updatedSetting: Partial<operationIncidentSettingTypes.Setting>) => void;
	entireActiveYn: boolean;
	isGetLoading: boolean;
	isUpdatePending: boolean;
}

const checkInputValue = (value: string) => {
	if (isNaN(Number(value))) {
		return 0;
	}

	if (Number(value) < 0) {
		return 0;
	}

	if (Number(value) > 999) {
		return 999;
	}

	return Number(value);
};

const MonitoringNotificationSetting = ({
	displayName,
	codeValue,
	description,
	setting,
	onUpdate,
	entireActiveYn,
	isGetLoading,
	isUpdatePending,
}: MonitoringNotificationSettingProps) => {
	return (
		<div className="flex flex-row gap-[2rem]">
			<p className="text-17 w-[23rem] flex-shrink-0 pt-[1rem] font-bold">{displayName}</p>
			<div className="flex flex-row items-center gap-[1rem]">
				<div className="flex flex-col gap-[1rem]">
					<div className="flex flex-row items-center gap-[1rem]">
						<Switch
							className="h-[2.6rem] w-[5rem]"
							checked={setting?.activeYn ?? true}
							onCheckedChange={event => onUpdate(codeValue, { activeYn: event })}
							disabled={!entireActiveYn || isGetLoading || isUpdatePending}
						/>
						{/* 접안 지연 또는 출항 지연 알림 설정 시 분 경과 입력 필드 추가 */}
						{(codeValue === 'BERTHING_DELAY_NOTIFICATION' || codeValue === 'DEPARTURE_DELAY_NOTIFICATION') && (
							<>
								<Input
									className="text-17 h-[4rem] w-[7rem] text-center font-medium"
									value={setting?.settingOffset ?? 0}
									onChange={e => onUpdate(codeValue, { settingOffset: checkInputValue(e.target.value) })}
									disabled={!entireActiveYn || !setting?.activeYn || isGetLoading || isUpdatePending}
									maxLength={3}
									type="text"
								/>
								<p className="text-17">분 경과</p>
							</>
						)}
					</div>
					<p className="text-13 opacity-50">{description}</p>
				</div>
			</div>
		</div>
	);
};

export default MonitoringNotificationSetting;
