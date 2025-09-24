'use client';

import Image from 'next/image';

import DeleteConfirmDialog from '@/app/user/address-book/_components/DeleteConfirmDialog';
import useAddressBookDialog from '@/app/user/address-book/_hooks/useAddressBookDialog';
import useAddressBookForm from '@/app/user/address-book/_hooks/useAddressBookForm';
import useContactManagement from '@/app/user/address-book/_hooks/useContactManagement';
import { ArrowDown, Close } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Dialog, DialogTitle, DialogContent, DialogHeader, DialogTrigger, DialogClose } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { TableCell, TableRow } from '@/components/ui/table';
import { ContactGroup } from '@/types/address-book-types';

/**
 * @component 주소록 다이얼로그 컴포넌트
 * @author 우정훈
 * @description 주소록 추가/수정을 담당하는 다이얼로그 컴포넌트입니다.
 * @param mode 모드 (주소록 추가, 주소록 수정)
 * @param contactGroup 주소록 그룹
 */

interface AddressBookDialogProps {
	mode: 'add' | 'edit';
	contactGroup?: ContactGroup;
}

const AddressBookDialog = ({ mode, contactGroup }: AddressBookDialogProps) => {
	const { name, setName, email, setEmail, contacts, setContacts, emailWarningMessage, setEmailWarningMessage, resetInput, restoreFromServerData } =
		useAddressBookForm({ mode, contactGroup });

	const { isDialogOpen, handleDialogChange, handleCreate, handleUpdate, isCreating, isUpdating } = useAddressBookDialog({
		mode,
		resetInput,
		restoreFromServerData,
		name,
		contacts,
		contactGroup,
	});

	const { isSearching, handleAddContact, handleDeleteContact } = useContactManagement({ email, setEmail, setEmailWarningMessage, contacts, setContacts });

	return (
		<Dialog open={isDialogOpen} onOpenChange={handleDialogChange}>
			<DialogTrigger asChild>
				{mode === 'add' ? (
					<Button variant="addressAdd" size="addressAdd">
						주소 추가
					</Button>
				) : (
					<TableRow className="[&>*]:border-stroke h-[4.8rem] text-[1.4rem] hover:bg-[#EBEEFB] [&>*]:border-r [&>*]:border-b [&>*]:px-[1.5rem] [&>*:last-child]:border-r-0">
						<TableCell>{contactGroup?.name}</TableCell>
						<TableCell>{contactGroup?.contactCount}</TableCell>
						<TableCell className="w-[6.3rem] text-center">
							<div onClick={e => e.stopPropagation()}>
								<DeleteConfirmDialog id={contactGroup?.id || 0} />
							</div>
						</TableCell>
					</TableRow>
				)}
			</DialogTrigger>

			<DialogContent
				className="border-stroke data-[state=closed]:fade-in-100 data-[state=closed]:zoom-in-100 min-w-[53rem] gap-0 rounded-[1.5rem] border p-0 drop-shadow-2xl data-[state=closed]:animate-none data-[state=closed]:duration-0"
				showCloseButton={false}
			>
				{/* 주소 추가 헤더 */}
				<DialogHeader className="flex flex-col gap-[2rem] p-[2rem]">
					<div className="flex flex-row items-center justify-between">
						<DialogTitle className="text-[2.5rem] font-bold text-[#111827]">주소 {mode === 'add' ? '추가' : '수정'}</DialogTitle>
						<DialogClose asChild>
							<button disabled={isCreating || isSearching || isUpdating}>
								<Close />
							</button>
						</DialogClose>
					</div>
					<div className="flex flex-row items-center justify-center gap-[1rem]">
						<Label className="flex flex-row gap-0 text-[1.4rem] whitespace-nowrap text-[#6D6D6D]">
							그룹명 <span className="text-[#EA6B78]">*</span>
						</Label>
						<Input variant="dialog" placeholder="그룹명을 입력해주세요." value={name} onChange={e => setName(e.target.value)} />
					</div>
				</DialogHeader>

				{/* 주소 추가 내용 */}
				<div className="flex h-[53.8rem] flex-col px-[2rem] pt-0">
					<div className="sticky top-0 bg-white">
						<div className="flex min-h-[4.8rem] items-center">
							<h3 className="text-[1.7rem] font-bold">추가 항목 {contacts.length}명</h3>
						</div>
						<div className="flex min-h-[4.8rem] flex-col justify-center">
							<div className="flex flex-row items-start justify-center gap-[1rem]">
								<div className="flex w-full flex-col gap-[0.5rem]">
									<Input variant="dialog" placeholder="이메일을 입력해주세요." value={email} onChange={e => setEmail(e.target.value)} />
									{emailWarningMessage && <p className="text-[1.4rem] text-[#EA6B78]">{emailWarningMessage}</p>}
								</div>
								<Button variant="add" size="add" onClick={handleAddContact} disabled={isSearching || isCreating || isUpdating}>
									추가 {mode === 'add' && <ArrowDown className="size-[1.3rem]" />}
								</Button>
							</div>
						</div>
					</div>

					{contacts.length > 0 ? (
						<div className="overflow-y-auto">
							{contacts.map(contact => (
								<div key={contact.accountId} className="border-stroke flex min-h-[6rem] flex-row items-center gap-[3rem] border-b">
									{/* prettier-ignore */}
									<div className="flex flex-row items-center justify-between w-full">
										<div className="flex flex-row items-center gap-[3rem]">
											<div className="flex flex-row items-center gap-[1rem]">
												<Image src="/images/default_user.png" alt="user" width={28} height={28} />
												<p className="text-[1.4rem]">{contact?.name}</p>
											</div>
											<p>{contact?.email}</p>
										</div>
										<button onClick={() => handleDeleteContact(contact.accountId)} disabled={isCreating || isSearching || isUpdating}>
											<Close className="size-[1.5rem]" />
										</button>
									</div>
								</div>
							))}
						</div>
					) : (
						<div className="flex h-[24.2rem] flex-col items-center justify-center text-center text-[1.4rem] text-[#6D6D6D]">
							추가된 항목이 없습니다.
							<br />
							이메일을 추가하세요.
						</div>
					)}
				</div>

				{/* 주소 추가 버튼 */}
				<div className="border-stroke flex h-[8.1rem] flex-row items-center justify-end gap-[0.5rem] border-t p-[2rem]">
					<DialogClose asChild>
						<Button variant="cancel" size="dialog" disabled={isCreating || isSearching}>
							취소
						</Button>
					</DialogClose>
					<Button
						variant="save"
						size="dialog"
						disabled={contacts.length === 0 || name === '' || isCreating || isSearching || isUpdating}
						onClick={mode === 'add' ? handleCreate : handleUpdate}
					>
						저장
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default AddressBookDialog;
