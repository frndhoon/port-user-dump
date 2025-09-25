import { useMutation, UseMutationResult, useQuery, useQueryClient, UseQueryResult } from '@tanstack/react-query';
import { toast } from 'sonner';

import * as addressBookTypes from '@/types/address-book-types';

import { createAddressBook, getAddressBook, checkDuplicateGroupTitle, searchUser, updateAddressBook, deleteAddressBook } from '../action/address-book';

// * 주소록 목록 조회
const useGetAddressBooks = (queryString: addressBookTypes.GetAddressBookQueryString): UseQueryResult<addressBookTypes.GetAddressBookResponse | null> => {
	return useQuery({
		queryKey: ['addressBook', queryString.page],
		queryFn: async () => {
			const response = await getAddressBook<addressBookTypes.GetAddressBookResponse>(queryString);
			if (response.statusCode === 200) {
				return response.result;
			}
			throw new Error(response.message);
		},
	});
};

// * 주소록 등록
const useCreateAddressBook = (request: addressBookTypes.CreateAddressBookRequest): UseMutationResult<addressBookTypes.CreateAddressBookResponse | null> => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async () => {
			const checkDuplicateGroupTitleResponse = await checkDuplicateGroupTitle<addressBookTypes.CheckDuplicateGroupTitleResponse>({ title: request.name });
			const duplicateYn = checkDuplicateGroupTitleResponse.result?.duplicateYn;

			if (duplicateYn) {
				throw new Error('중복된 그룹명입니다.');
			}

			// (backend request type) contact 속성 중 accountId, chainportalId만 남기고 나머지 속성 제거
			const apiRequest = {
				name: request.name,
				shareWithAllEmployees: request.shareWithAllEmployees,
				contacts: request.contacts.map(contact => ({
					accountId: contact.accountId,
					chainportalId: contact.chainportalId,
				})),
			};

			const response = await createAddressBook<addressBookTypes.CreateAddressBookResponse>(apiRequest);
			if (response.statusCode === 200) {
				return response.result;
			} else {
				throw new Error('주소록 생성에 실패했습니다. 다시 시도해주세요.');
			}
		},
		onSuccess: () => {
			toast.success('주소록이 성공적으로 생성되었습니다.');
			queryClient.invalidateQueries({ queryKey: ['addressBook'] });
		},
		onError: error => {
			if (error.message === '중복된 그룹명입니다.') {
				toast.error('중복된 그룹명입니다.');
			} else {
				toast.error('주소록 생성에 실패했습니다. 다시 시도해주세요.');
			}
		},
	});
};

// * 사용자 검색
const useSearchUser = (queryString: addressBookTypes.SearchUserQueryString): UseMutationResult<addressBookTypes.SearchUserResponse | undefined> => {
	return useMutation({
		mutationKey: ['searchUser', queryString.email],
		mutationFn: async () => {
			const response = await searchUser<addressBookTypes.SearchUserResponse>(queryString);
			if (response.statusCode === 200) {
				return response.result || undefined;
			}
		},
		onError: () => {
			toast.error('사용자 검색에 실패했습니다. 다시 시도해주세요.');
		},
	});
};

// * 주소록 업데이트
const useUpdateAddressBook = (
	id: number,
	currentName: string,
	request: addressBookTypes.UpdateAddressBookRequest,
): UseMutationResult<addressBookTypes.UpdateAddressBookResponse | null> => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationKey: ['updateAddressBook', request.name],
		mutationFn: async () => {
			if (request.name !== currentName) {
				const checkDuplicateGroupTitleResponse = await checkDuplicateGroupTitle<addressBookTypes.CheckDuplicateGroupTitleResponse>({
					title: request.name,
				});
				const duplicateYn = checkDuplicateGroupTitleResponse.result?.duplicateYn;

				if (duplicateYn) {
					throw new Error('중복된 그룹명입니다.');
				}
			}

			const response = await updateAddressBook<addressBookTypes.UpdateAddressBookResponse>(id, request);
			if (response.statusCode === 200) {
				return response.result;
			} else {
				throw new Error('주소록 업데이트에 실패했습니다. 다시 시도해주세요.');
			}
		},
		onSuccess: () => {
			toast.success('주소록이 성공적으로 업데이트되었습니다.');
			queryClient.invalidateQueries({ queryKey: ['addressBook'] });
		},
		onError: error => {
			if (error.message === '중복된 그룹명입니다.') {
				toast.error(error.message);
			} else {
				toast.error('주소록 업데이트에 실패했습니다. 다시 시도해주세요.');
			}
		},
	});
};

// * 주소록 삭제
const useDeleteAddressBook = (id: number): UseMutationResult<addressBookTypes.DeleteAddressBookResponse | null> => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationKey: ['deleteAddressBook', id],
		mutationFn: async () => {
			const response = await deleteAddressBook<addressBookTypes.DeleteAddressBookResponse>({ id });

			if (response.statusCode === 200) {
				toast.success('주소록이 성공적으로 삭제되었습니다.');
				return response.result;
			} else {
				throw new Error('주소록 삭제에 실패했습니다. 다시 시도해주세요.');
			}
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['addressBook'] });
		},
		onError: error => {
			toast.error(error.message);
		},
	});
};

export { useGetAddressBooks, useCreateAddressBook, useSearchUser, useUpdateAddressBook, useDeleteAddressBook };
