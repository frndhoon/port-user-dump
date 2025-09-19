'use client';

import { useState } from 'react';

import { useGetUsers, useGetUserById, useMutationCreateUser } from '@/api/tanstack-query/useTest';
import { Button } from '@/components/ui/button';

const Home = () => {
	const [selectedUserId, setSelectedUserId] = useState<number>(1);

	// API 훅들
	const { data: users, isLoading: usersLoading, error: usersError } = useGetUsers();
	const { data: user, isLoading: userLoading } = useGetUserById(selectedUserId);
	const createUserMutation = useMutationCreateUser();

	const handleCreateUser = () => {
		createUserMutation.mutate({
			name: '홍길동' + Math.random(),
			email: 'hong@example.com',
			username: 'honggildong', // username 추가
			phone: '010-1234-5678',
			website: 'honggildong.com', // website 추가
		});
	};

	return (
		<div className="min-h-screen p-8 text-[1.4rem]">
			<div className="mx-auto max-w-4xl">
				<h1 className="mb-8 text-3xl font-bold">API 테스트 페이지</h1>

				{/* 사용자 목록 조회 */}
				<section className="mb-8 rounded-lg border p-6 text-[1.4rem]">
					<h2 className="mb-4 text-xl font-semibold">사용자 목록 조회</h2>
					<Button onClick={() => window.location.reload()} className="mb-4 text-[1.4rem]">
						새로고침
					</Button>
					{usersLoading && <p>로딩 중...</p>}
					{usersError && <p className="text-red-500">에러: {usersError.message}</p>}
					{users && (
						<div className="grid gap-2">
							{users.slice(0, 10).map(user => (
								<div key={user.id + user.name} className="rounded border p-2">
									<p className="font-medium">{user.name}</p>
									<p className="text-sm text-gray-600">{user.email}</p>
								</div>
							))}
						</div>
					)}
				</section>

				{/* 특정 사용자 조회 */}
				<section className="mb-8 rounded-lg border p-6 text-[1.4rem]">
					<h2 className="mb-4 text-xl font-semibold">특정 사용자 조회</h2>
					<div className="mb-4 flex gap-2">
						<input
							type="number"
							value={selectedUserId}
							onChange={e => setSelectedUserId(Number(e.target.value))}
							className="rounded border px-2 py-1"
							min="1"
							max="10"
						/>
						<Button onClick={() => setSelectedUserId(selectedUserId)} className="text-[1.4rem]">
							조회
						</Button>
					</div>
					{userLoading && <p>로딩 중...</p>}
					{user && (
						<div className="rounded border p-4">
							<p className="font-medium">{user.name}</p>
							<p className="text-sm text-gray-600">{user.email}</p>
							<p className="text-sm text-gray-600">{user.phone}</p>
						</div>
					)}
				</section>

				{/* 사용자 생성 */}
				<section className="mb-8 rounded-lg border p-6 text-[1.4rem]">
					<h2 className="mb-4 text-xl font-semibold">사용자 생성</h2>
					<Button onClick={handleCreateUser} disabled={createUserMutation.isPending} className="text-[1.4rem]">
						{createUserMutation.isPending ? '생성 중...' : '사용자 생성'}
					</Button>
				</section>
			</div>
		</div>
	);
};

export default Home;
