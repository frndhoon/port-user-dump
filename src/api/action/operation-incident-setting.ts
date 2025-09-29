import { ApiManagerSingleton } from '@/services/ApiManger';
import * as commonTypes from '@/types/common-types';
import * as operationIncidentSettingTypes from '@/types/operation-incident-setting-types';

// * 일반 요청
const $httpFactory = ApiManagerSingleton.getInstance({
	baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
	timeout: 10000,
	headers: {
		Authorization: 'Bearer ' + process.env.NEXT_PUBLIC_TOKEN,
	},
});

// * 이상탐지 설정 조회
export const getOperationIncidentSetting = async <T = operationIncidentSettingTypes.GetOperationIncidentSettingResponse>(
	queryString: operationIncidentSettingTypes.GetOperationIncidentSettingQueryString,
): Promise<commonTypes.responseApi<T>> => {
	try {
		const response: commonTypes.responseApi<T> = await $httpFactory.getRequest({
			url: 'setting/notifications',
			data: queryString,
		});
		return response;
	} catch (error: unknown) {
		return {
			statusCode: 500,
			result: null,
			resultMessage: '이상탐지 설정 조회 실패',
			message: String(error),
		};
	}
};

// * 이상탐지 설정 업데이트
export const updateOperationIncidentSetting = async <T = operationIncidentSettingTypes.UpdateOperationIncidentSettingResponse>(
	request: operationIncidentSettingTypes.UpdateOperationIncidentSettingRequest,
): Promise<commonTypes.responseApi<T>> => {
	try {
		const response: commonTypes.responseApi<T> = await $httpFactory.postRequest({
			url: 'setting/notifications',
			data: request,
		});
		return response;
	} catch (error: unknown) {
		return {
			statusCode: 500,
			result: null,
			resultMessage: '이상탐지 설정 업데이트 실패',
			message: String(error),
		};
	}
};
