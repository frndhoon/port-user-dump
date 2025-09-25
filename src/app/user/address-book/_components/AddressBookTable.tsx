import AddressBookDialog from '@/app/user/address-book/_components/AddressBookDialog';
import { Skeleton } from '@/components/ui/skeleton';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import * as addressBookTypes from '@/types/address-book-types';

/**
 * @component 주소록 테이블 컴포넌트
 * @author 우정훈
 * @description 주소록 테이블 컴포넌트
 * @param contactGroups 주소록 그룹
 * @param isAddressBookLoading 주소록 로딩 상태
 * @param isAddressBookError 주소록 에러 상태
 */

const AddressBookTable = ({
	contactGroups,
	isAddressBookLoading,
	isAddressBookError,
}: {
	contactGroups: addressBookTypes.ContactGroup[];
	isAddressBookLoading: boolean;
	isAddressBookError: boolean;
}) => {
	return (
		<Table className="table-fixed">
			<TableHeader className="border-stroke h-[4.8rem] border-y bg-[#EDEDED] font-bold [&>*]:hover:bg-transparent">
				<TableRow className="[&>*]:border-stroke text-[1.4rem] [&>*]:border-r [&>*]:px-[1.5rem] [&>*]:font-bold [&>*:last-child]:border-r-0">
					<TableHead className="max-w-[84.2rem]">그룹명</TableHead>
					<TableHead className="max-w-[84.2rem]">직원수</TableHead>
					{/* 삭제 버튼 열 */}
					<TableHead className="w-[6.3rem] max-w-[6.3rem] flex-shrink-0">&nbsp;</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{isAddressBookLoading ? (
					<TableRow>
						<TableCell colSpan={3} className="p-0">
							{Array.from({ length: 20 }).map((_, index) => (
								<Skeleton className="border-stroke h-[4.8rem] w-full rounded-none border-b" key={index} />
							))}
						</TableCell>
					</TableRow>
				) : isAddressBookError ? (
					<TableRow>
						<TableCell colSpan={3} className="p-5">
							<div className="flex h-[4.8rem] items-center justify-center text-[1.4rem] text-[#6D6D6D]">
								<p className="text-center">
									주소록 조회 중 오류가 발생했습니다.
									<br />
									새로고침 후 다시 시도해주세요.
								</p>
							</div>
						</TableCell>
					</TableRow>
				) : (
					contactGroups?.map(contactGroup => <AddressBookDialog key={contactGroup.id} mode="edit" contactGroup={contactGroup} />)
				)}
			</TableBody>
		</Table>
	);
};

export default AddressBookTable;
