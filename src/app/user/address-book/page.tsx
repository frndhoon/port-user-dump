'use client';

import { useState } from 'react';

import { toast } from 'sonner';

import { useGetAddressBooks } from '@/api/tanstack-query/useAddressBook';
import Breadcrumb from '@/app/user/_components/Breadcrumb';
import AddressBookDialog from '@/app/user/address-book/_components/AddressBookDialog';
import AddressBookTable from '@/app/user/address-book/_components/AddressBookTable';
import AddressBookTablePagination from '@/app/user/address-book/_components/AddressBookTablePagination';
import { Button } from '@/components/ui/button';

const AddressBookPage = () => {
	const [page, setPage] = useState(0);
	const { data: addressBook, isLoading: isAddressBookLoading, isError: isAddressBookError } = useGetAddressBooks({ page });

	const handlePageChange = (zeroIndexPage: number) => {
		setPage(zeroIndexPage);
	};

	return (
		<>
			{/* 상단 메뉴 */}
			<div className="flex flex-row items-center justify-between">
				<Breadcrumb topMenuTitle="주소록" sideMenuTitle="개인화 설정" />
				<AddressBookDialog mode="add" />
				<Button variant="default" size="default" onClick={() => toast.success('테스트')}>
					테스트
				</Button>
			</div>

			{/* 주소록 테이블 */}
			<div className="flex flex-col gap-[2rem]">
				<AddressBookTable
					contactGroups={addressBook?.contactGroups || []}
					isAddressBookLoading={isAddressBookLoading}
					isAddressBookError={isAddressBookError}
				/>
				<AddressBookTablePagination
					previousPage={addressBook?.perviousPage || 0}
					nowPage={addressBook?.nowPage || 0}
					nextPage={addressBook?.nextPage || null}
					pageSize={addressBook?.pageSize || 1}
					totalRows={addressBook?.totalRows || 1}
					onPageChange={handlePageChange}
				/>
			</div>
		</>
	);
};

export default AddressBookPage;
