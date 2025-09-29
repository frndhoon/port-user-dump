import { ApiManagerSingleton } from '@/services/ApiManger';
import * as commonTypes from '@/types/common-types';
import * as etcSettingTypes from '@/types/etc-setting.types';

// 싱글톤 인스턴스 생성
const $httpFactory = ApiManagerSingleton.getInstance({
	baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
	timeout: 10000,
	headers: {
		Authorization: 'Bearer ' + process.env.NEXT_PUBLIC_TOKEN,
	},
});

export const getEtcSetting = async <T = etcSettingTypes.GetEtcSettingResponse>(): Promise<commonTypes.responseApi<T>> => {
	try {
		const response: commonTypes.responseApi<T> = await $httpFactory.getRequest({
			url: '/setting/legend',
		});
		return response;
	} catch (error: unknown) {
		return {
			statusCode: 500,
			result: null,
			resultMessage: '설정 조회 실패',
			message: String(error),
		};
	}
};

export const getShippingCompanies = async <T = etcSettingTypes.GetShippingCompaniesResponse>(): Promise<commonTypes.responseApi<T>> => {
	try {
		const response: commonTypes.responseApi<T> = await $httpFactory.getRequest({
			url: '/shippingCompanies',
		});
		return response;
	} catch (error: unknown) {
		return {
			statusCode: 500,
			result: null,
			resultMessage: '선사 조회 실패',
			message: String(error),
		};
	}
};

export const getRoutes = async <T = etcSettingTypes.GetRoutesResponse>(): Promise<commonTypes.responseApi<T>> => {
	try {
		const response: commonTypes.responseApi<T> = await $httpFactory.getRequest({
			url: '/routes',
		});
		return response;
	} catch (error: unknown) {
		return {
			statusCode: 500,
			result: null,
			resultMessage: '항로 조회 실패',
			message: String(error),
		};
	}
};

export const getTerminalFilterSettings = async <T = etcSettingTypes.GetTerminalFilterSettingsResponse>(): Promise<commonTypes.responseApi<T>> => {
	try {
		const response: commonTypes.responseApi<T> = await $httpFactory.getRequest({
			url: '/setting/terminal-filter',
		});
		return response;
	} catch (error: unknown) {
		return {
			statusCode: 500,
			result: null,
			resultMessage: '터미널 필터 설정 조회 실패',
			message: String(error),
		};
	}
};

export const saveEtcSetting = async <T = etcSettingTypes.SaveEtcSettingResponse>(
	request: etcSettingTypes.SaveEtcSettingRequest,
): Promise<commonTypes.responseApi<T>> => {
	try {
		const response: commonTypes.responseApi<T> = await $httpFactory.postRequest({
			url: '/setting',
			data: request,
		});
		return response;
	} catch (error: unknown) {
		return {
			statusCode: 500,
			result: null,
			resultMessage: '설정 저장 실패',
			message: String(error),
		};
	}
};
