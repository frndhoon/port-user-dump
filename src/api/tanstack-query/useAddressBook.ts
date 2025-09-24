import { useMutation, UseMutationResult, useQuery, useQueryClient, UseQueryResult } from '@tanstack/react-query';
import { toast } from 'sonner';

import * as addressBookTypes from '@/types/address-book-types';

import { createAddressBook, getAddressBook, checkDuplicateGroupTitle, searchUser, updateAddressBook, deleteAddressBook } from '../action/address-book';

// * 주소록 목록 조회
const useGetAddressBooks = (queryString: addressBookTypes.GetAddressBookQueryString): UseQueryResult<addressBookTypes.GetAddressBookResponse | undefined> => {
	return useQuery({
		queryKey: ['addressBook', queryString.page],
		queryFn: async () => {
			const response = await getAddressBook(queryString);
			if (response.statusCode === 200) {
				return response.result || undefined;
			}
			throw new Error(response.message);
		},
	});
};

// * 주소록 등록
const useCreateAddressBook = (
	request: addressBookTypes.CreateAddressBookRequest,
): UseMutationResult<addressBookTypes.CreateAddressBookResponse | undefined> => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async () => {
			const isDuplicateGroupTitle = (await checkDuplicateGroupTitle({ title: request.name })).result?.duplicateYn;

			if (isDuplicateGroupTitle) {
				toast.error('중복된 그룹명입니다.');
				return;
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

			const response = await createAddressBook(apiRequest);

			queryClient.invalidateQueries({ queryKey: ['addressBook'] });

			if (response.statusCode === 200) {
				toast.success('주소록이 성공적으로 생성되었습니다.');
				return response.result || undefined;
			}

			toast.error('주소록 생성에 실패했습니다. 다시 시도해주세요.');
			throw new Error(response.message);
		},
	});
};

// * 사용자 검색
const useSearchUser = (queryString: addressBookTypes.SearchUserQueryString): UseMutationResult<addressBookTypes.SearchUserResponse | undefined> => {
	return useMutation({
		mutationKey: ['searchUser', queryString.email],
		mutationFn: async () => {
			const response = await searchUser(queryString);
			if (response.statusCode === 200) {
				return response.result || undefined;
			}

			toast.error('사용자 검색에 실패했습니다. 다시 시도해주세요.');
			throw new Error(response.message);
		},
	});
};

// * 주소록 업데이트
const useUpdateAddressBook = (
	id: number,
	currentName: string,
	request: addressBookTypes.UpdateAddressBookRequest,
): UseMutationResult<addressBookTypes.UpdateAddressBookResponse | undefined> => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationKey: ['updateAddressBook', request.name],
		mutationFn: async () => {
			if (request.name !== currentName) {
				const isDuplicateGroupTitle = (await checkDuplicateGroupTitle({ title: request.name })).result?.duplicateYn;

				if (isDuplicateGroupTitle) {
					return;
				}
			}

			const response = await updateAddressBook(id, request);

			queryClient.invalidateQueries({ queryKey: ['addressBook'] });

			if (response.statusCode === 200) {
				toast.success('주소록이 성공적으로 업데이트되었습니다.');
				return response.result || undefined;
			}

			toast.error('주소록 업데이트에 실패했습니다. 다시 시도해주세요.');
			throw new Error(response.message);
		},
	});
};

// * 주소록 삭제
const useDeleteAddressBook = (id: number): UseMutationResult<addressBookTypes.DeleteAddressBookResponse | undefined> => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationKey: ['deleteAddressBook', id],
		mutationFn: async () => {
			const response = await deleteAddressBook({ id });

			if (response.statusCode === 200) {
				toast.success('주소록이 성공적으로 삭제되었습니다.');
				return response.result || undefined;
			}

			toast.error('주소록 삭제에 실패했습니다. 다시 시도해주세요.');
			throw new Error(response.message);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['addressBook'] });
		},
	});
};

export { useGetAddressBooks, useCreateAddressBook, useSearchUser, useUpdateAddressBook, useDeleteAddressBook };
