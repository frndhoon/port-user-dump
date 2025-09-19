import { ApiManagerSingleton } from '@/services/ApiManger';
import * as commonTypes from '@/types/common-types';
import * as apiTypes from '@/types/test-types';

// 싱글톤 인스턴스 생성
const $httpFactory = ApiManagerSingleton.getInstance({
	baseURL: 'https://jsonplaceholder.typicode.com',
	timeout: 10000,
});

// 1. 사용자 목록 조회
export const getUsers = async <T = apiTypes.User[]>(): Promise<commonTypes.responseApi<T>> => {
	try {
		const response: commonTypes.responseApi<T> = await $httpFactory.getRequest({
			url: '/users',
		});
		return response;
	} catch (error: unknown) {
		return {
			statusCode: 500,
			result: null,
			resultMessage: '사용자 목록 조회 실패',
			message: String(error),
		};
	}
};

// 2. 특정 사용자 조회
export const getUserById = async <T = apiTypes.User>(userId: number): Promise<commonTypes.responseApi<T>> => {
	try {
		const response: commonTypes.responseApi<T> = await $httpFactory.getRequest({
			url: `/users/${userId}`,
		});
		return response;
	} catch (error: unknown) {
		return {
			statusCode: 500,
			result: null,
			resultMessage: '사용자 조회 실패',
			message: String(error),
		};
	}
};

// 3. 사용자 생성
export const createUser = async <T = apiTypes.User>(userData: apiTypes.CreateUserRequest): Promise<commonTypes.responseApi<T>> => {
	try {
		const response: commonTypes.responseApi<T> = await $httpFactory.postRequest({
			url: '/users',
			data: userData,
		});
		return response;
	} catch (error: unknown) {
		return {
			statusCode: 500,
			result: null,
			resultMessage: '사용자 생성 실패',
			message: String(error),
		};
	}
};
