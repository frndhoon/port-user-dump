import { useCallback, useEffect, useState } from 'react';

import { useGetOperationIncidentSetting, useUpdateOperationIncidentSetting } from '@/api/tanstack-query/useOperationIncidentSetting';
import * as operationIncidentSettingTypes from '@/types/operation-incident-setting-types';

/**
 * @hook 이상탐지 설정 훅
 * @author 우정훈
 * @description 이상탐지 설정을 담당하는 훅입니다.
 * 서버 데이터 호출 및 클라이언트(로컬) 측 데이터 관리를 담당합니다.
 */

const useOperationIncidentSetting = () => {
	const {
		data: serverData,
		isLoading: isGetLoading,
		isError: isGetError,
	} = useGetOperationIncidentSetting({
		nc: 'MONITORING_ALERT',
	});

	const [localEntireActiveYn, setLocalEntireActiveYn] = useState<boolean>(true);
	const [localSettings, setLocalSettings] = useState<operationIncidentSettingTypes.Setting[]>([]);

	const { mutate: updateOperationIncidentSetting, isPending: isUpdatePending } = useUpdateOperationIncidentSetting(localEntireActiveYn, localSettings);

	// 초기화 로직
	useEffect(() => {
		if (serverData && localSettings.length === 0) {
			setLocalEntireActiveYn(serverData.entireActiveYn);
			setLocalSettings(serverData.settings);
		}
	}, [serverData, localSettings.length]);

	// 설정 업데이트 함수
	const updateLocalSetting = useCallback((codeValue: string, updatedSetting: Partial<operationIncidentSettingTypes.Setting>) => {
		setLocalSettings(prev =>
			prev.map(setting => (setting.monitoringNotificationType.codeValue === codeValue ? { ...setting, ...updatedSetting } : setting)),
		);
	}, []);

	return {
		localEntireActiveYn,
		setLocalEntireActiveYn,
		localSettings,
		updateLocalSetting,
		updateOperationIncidentSetting,
		isGetLoading,
		isUpdatePending,
		isGetError,
	};
};

export default useOperationIncidentSetting;
