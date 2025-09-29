import { useMutation, UseMutationResult, useQuery, useQueryClient, UseQueryResult } from '@tanstack/react-query';
import { toast } from 'sonner';

import * as operationIncidentSettingTypes from '@/types/operation-incident-setting-types';

import { getOperationIncidentSetting, updateOperationIncidentSetting } from '../action/operation-incident-setting';

// * 이상탐지 정보 조회
const useGetOperationIncidentSetting = (
	queryString: operationIncidentSettingTypes.GetOperationIncidentSettingQueryString,
): UseQueryResult<operationIncidentSettingTypes.GetOperationIncidentSettingResponse | null> => {
	return useQuery({
		queryKey: ['operationIncidentSetting', queryString.nc],
		queryFn: async () => {
			const response = await getOperationIncidentSetting<operationIncidentSettingTypes.GetOperationIncidentSettingResponse>(queryString);
			if (response.statusCode === 200) {
				return response.result;
			}
			throw new Error(response.message);
		},
	});
};

// * 이상탐지 정보 업데이트
const useUpdateOperationIncidentSetting = (
	entireActiveYn: boolean,
	settings: operationIncidentSettingTypes.Setting[],
): UseMutationResult<operationIncidentSettingTypes.UpdateOperationIncidentSettingResponse, Error, void> & {} => {
	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: async () => {
			// (backend request type)
			const apiRequest: operationIncidentSettingTypes.UpdateOperationIncidentSettingRequest = {
				entireActive: {
					activeYn: entireActiveYn,
					notificationCategory: 'MONITORING_ALERT',
				},
				settings: settings?.map(setting => ({
					monitoringNotificationType: setting.monitoringNotificationType.commonCodeId,
					settingOffset: setting.settingOffset,
					settingReference: setting.settingReference,
					activeYn: setting.activeYn,
				})),
			};

			const response = await updateOperationIncidentSetting(apiRequest);
			if (response.statusCode === 200) {
				return response.result;
			}
			throw new Error(response.message);
		},
		mutationKey: ['operationIncidentSetting', 'update'],
		onSuccess: result => {
			toast.success('알림 설정이 완료되었습니다.');
			queryClient.invalidateQueries({ queryKey: ['operationIncidentSetting'] });
			console.log('이상탐지 설정이 성공적으로 업데이트되었습니다.', result);
		},
		onError: error => {
			toast.error('이상탐지 설정 업데이트에 실패했습니다. 다시 시도해주세요.');
			console.error('이상탐지 설정 업데이트 에러:', error.message);
		},
	});
	return mutation;
};

export { useGetOperationIncidentSetting, useUpdateOperationIncidentSetting };
