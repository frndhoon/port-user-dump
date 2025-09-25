'use client';

import { useState } from 'react';

import { useGetAddressBooks } from '@/api/tanstack-query/useAddressBook';
import Breadcrumb from '@/app/user/_components/Breadcrumb';
import AddressBookDialog from '@/app/user/address-book/_components/AddressBookDialog';
import AddressBookTable from '@/app/user/address-book/_components/AddressBookTable';
import AddressBookTablePagination from '@/app/user/address-book/_components/AddressBookTablePagination';

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
			</div>

			{/* 주소록 테이블 */}
			<div className="flex flex-col gap-[2rem]">
				<div className="h-[100rem]">
					<AddressBookTable
						contactGroups={addressBook?.contactGroups || []}
						isAddressBookLoading={isAddressBookLoading}
						isAddressBookError={isAddressBookError}
					/>
				</div>
				<div className="h-full">
					<AddressBookTablePagination
						nowPage={addressBook?.nowPage || 0}
						pageSize={addressBook?.pageSize || 1}
						totalRows={addressBook?.totalRows || 1}
						onPageChange={handlePageChange}
					/>
				</div>
			</div>
		</>
	);
};

export default AddressBookPage;
