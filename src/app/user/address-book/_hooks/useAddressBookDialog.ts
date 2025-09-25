import { useCreateAddressBook, useUpdateAddressBook } from '@/api/tanstack-query/useAddressBook';
import useDialog from '@/components/hooks/useDialog';
import * as addressBookTypes from '@/types/address-book-types';

/**
 * @component 주소록 다이얼로그 훅
 * @author 우정훈
 * @description 주소록 추가/수정을 담당하는 다이얼로그 훅입니다.
 * @param mode 모드 (주소록 추가, 주소록 수정)
 * @param resetInput 입력 초기화 (주소록 추가 시, dialog를 닫을 때 입력 초기화하는 함수)
 * @param restoreFromServerData 서버 데이터 복원 (주소록 수정 시, 기존 띄워진 데이터를 삭제하고 dialog를 닫았다 다시 열었을 때 기존 데이터를 복원하는 함수)
 * @param name 주소록 이름
 * @param contacts 주소록 연락처
 * @param contactGroup 주소록 그룹
 */

interface UseAddressBookDialogProps {
	mode: 'add' | 'edit';
	resetInput: () => void;
	restoreFromServerData: () => void;
	name: string;
	contacts: addressBookTypes.Contact[];
	contactGroup?: addressBookTypes.ContactGroup;
}

const useAddressBookDialog = ({ mode, resetInput, restoreFromServerData, name, contacts, contactGroup }: UseAddressBookDialogProps) => {
	const { isDialogOpen, setIsDialogOpen } = useDialog();

	const { mutateAsync: createAddressBook, isPending: isCreating } = useCreateAddressBook({
		name: name,
		contacts: contacts,
		shareWithAllEmployees: false,
	});

	const { mutateAsync: updateAddressBook, isPending: isUpdating } = useUpdateAddressBook(contactGroup?.id || 0, contactGroup?.name || '', {
		name: name,
		contacts: contacts,
		shareWithAllEmployees: false,
	});

	const handleDialogChange = (isDialogOpen: boolean) => {
		setIsDialogOpen(isDialogOpen);

		if (mode === 'edit') {
			if (isDialogOpen) {
				restoreFromServerData();
			}
			return;
		}

		if (!isDialogOpen) {
			resetInput();
		}
	};

	const handleCreate = async () => {
		try {
			await createAddressBook({ name, contacts, shareWithAllEmployees: false });
			setIsDialogOpen(false);
			resetInput();

			// eslint-disable-next-line unused-imports/no-unused-vars
		} catch (error) {}
		// 훅에서 에러 처리
	};

	const handleUpdate = async () => {
		try {
			await updateAddressBook({
				name,
				contacts,
				shareWithAllEmployees: false,
			});
			setIsDialogOpen(false);

			// eslint-disable-next-line unused-imports/no-unused-vars
		} catch (error) {}
		// 훅에서 에러 처리
	};

	return {
		isDialogOpen,
		setIsDialogOpen,
		handleDialogChange,
		handleCreate,
		handleUpdate,
		isCreating,
		isUpdating,
	};
};

export default useAddressBookDialog;
