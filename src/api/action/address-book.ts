import { ApiManagerSingleton } from '@/services/ApiManger';
import * as addressBookTypes from '@/types/address-book-types';
import * as commonTypes from '@/types/common-types';

// * 일반 요청
const $httpFactory = ApiManagerSingleton.getInstance({
	baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
	timeout: 10000,
	headers: {
		Authorization: 'Bearer ' + process.env.NEXT_PUBLIC_TOKEN,
	},
});

// * 주소록 조회
export const getAddressBook = async <T = addressBookTypes.GetAddressBookResponse>(
	queryString: addressBookTypes.GetAddressBookQueryString,
): Promise<commonTypes.responseApi<T>> => {
	try {
		const response: commonTypes.responseApi<T> = await $httpFactory.getRequest({
			url: 'setting/contact/group',
			data: {
				page: queryString.page,
			},
		});
		return response;
	} catch (error: unknown) {
		return {
			statusCode: 500,
			result: null,
			resultMessage: '주소록 조회 실패',
			message: String(error),
		};
	}
};

// * 중복그룹명 확인
export const checkDuplicateGroupTitle = async <T = addressBookTypes.CheckDuplicateGroupTitleResponse>(
	queryString: addressBookTypes.CheckDuplicateGroupTitleQueryString,
): Promise<commonTypes.responseApi<T>> => {
	try {
		const response: commonTypes.responseApi<T> = await $httpFactory.getRequest({
			url: 'setting/contact/group/check',
			data: queryString,
		});
		return response;
	} catch (error: unknown) {
		return {
			statusCode: 500,
			result: null,
			resultMessage: '주소록 중복 확인 실패',
			message: String(error),
		};
	}
};

// * 주소록 등록
export const createAddressBook = async <T = addressBookTypes.CreateAddressBookResponse>(
	request: addressBookTypes.CreateAddressBookRequest,
): Promise<commonTypes.responseApi<T>> => {
	try {
		const response: commonTypes.responseApi<T> = await $httpFactory.postRequest({
			url: 'setting/contact/group',
			data: request,
		});
		return response;
	} catch (error: unknown) {
		return {
			statusCode: 500,
			result: null,
			resultMessage: '주소록 등록 실패',
			message: String(error),
		};
	}
};

// * 사용자 검색
export const searchUser = async <T = addressBookTypes.SearchUserResponse>(
	queryString: addressBookTypes.SearchUserQueryString,
): Promise<commonTypes.responseApi<T>> => {
	try {
		const response: commonTypes.responseApi<T> = await $httpFactory.getRequest({
			url: 'setting/contact',
			data: queryString,
		});
		return response;
	} catch (error: unknown) {
		return {
			statusCode: 500,
			result: null,
			resultMessage: '사용자 검색 실패',
			message: String(error),
		};
	}
};

// * 주소록 업데이트
export const updateAddressBook = async <T = addressBookTypes.UpdateAddressBookResponse>(
	id: number,
	request: addressBookTypes.UpdateAddressBookRequest,
): Promise<commonTypes.responseApi<T>> => {
	try {
		const response: commonTypes.responseApi<T> = await $httpFactory.postRequest({
			url: `setting/contact/group/${id}`,
			data: request,
		});
		return response;
	} catch (error: unknown) {
		return {
			statusCode: 500,
			result: null,
			resultMessage: '주소록 업데이트 실패',
			message: String(error),
		};
	}
};

// * 주소록 삭제
export const deleteAddressBook = async <T = addressBookTypes.DeleteAddressBookResponse>(
	request: addressBookTypes.DeleteAddressBookRequest,
): Promise<commonTypes.responseApi<T>> => {
	try {
		const response: commonTypes.responseApi<T> = await $httpFactory.postRequest({
			url: `setting/contact/group/delete/${request.id}`,
		});
		return response;
	} catch (error: unknown) {
		return {
			statusCode: 500,
			result: null,
			resultMessage: '주소록 삭제 실패',
			message: String(error),
		};
	}
};
