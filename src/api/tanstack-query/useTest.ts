import { useCallback } from 'react';

import { UseMutationResult, UseQueryResult, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import * as commonTypes from '@/types/common-types';
import * as apiTypes from '@/types/test-types';

import { getUsers, getUserById, createUser } from '../action/test';

// * 사용자 목록 조회
const useGetUsers = (): UseQueryResult<apiTypes.User[] | undefined> => {
	return useQuery({
		queryKey: ['users', 'list'],
		queryFn: async () => {
			const response = await getUsers<apiTypes.User[]>();
			if (response.statusCode === 200) {
				return response.result || [];
			}
			throw new Error(response.message);
		},
		staleTime: 5 * 60 * 1000, // 5분
	});
};

// * 특정 사용자 조회
const useGetUserById = (userId: number): UseQueryResult<apiTypes.User | undefined> => {
	return useQuery({
		queryKey: ['users', 'detail', userId],
		queryFn: async () => {
			const response = await getUserById<apiTypes.User>(userId);
			if (response.statusCode === 200) {
				return response.result || undefined;
			}
			throw new Error(response.message);
		},
		enabled: !!userId, // userId가 있을 때만 실행
		staleTime: 5 * 60 * 1000, // 5분
	});
};

// * 사용자 생성
const useMutationCreateUser = (): UseMutationResult<commonTypes.responseApi<apiTypes.User>, Error, apiTypes.CreateUserRequest> & {
	clearUserData: () => void;
} => {
	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: (userData: apiTypes.CreateUserRequest) => {
			return createUser<apiTypes.User>(userData);
		},
		mutationKey: ['users', 'create'],
		onSuccess: response => {
			if (response.statusCode === 200 || response.statusCode === 201) {
				// 기존 사용자 목록에 새 사용자 추가
				queryClient.setQueryData(['users', 'list'], (oldData: apiTypes.User[] | undefined) => {
					if (oldData && response.result) {
						// 새 사용자를 기존 목록 앞에 추가
						return [response.result, ...oldData];
					}
					return oldData;
				});

				console.log('사용자가 성공적으로 생성되었습니다.', response);
			} else {
				console.error('사용자 생성에 실패하였습니다.', response);
			}
		},
		onError: error => {
			console.error('사용자 생성 에러:', error.message);
		},
	});

	// 사용자 데이터 캐시 클리어
	const clearUserData = useCallback(() => {
		queryClient.removeQueries({ queryKey: ['users'] });
	}, [queryClient]);

	return { ...mutation, clearUserData };
};

export { useGetUsers, useGetUserById, useMutationCreateUser };
