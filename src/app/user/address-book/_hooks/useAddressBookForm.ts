import { useState } from 'react';

import { Contact, ContactGroup } from '@/types/address-book-types';

/**
 * @component 주소록 폼 훅
 * @author 우정훈
 * @description 주소록 추가/수정을 담당하는 폼 훅입니다.
 * 연락처 수정을 할 때, 클라이언트에서만 수정 후 dialog를 닫았다가 다시 열었을 때 원래 데이터를 복원하는 기능을 담당합니다.
 * @param mode 모드 (주소록 추가, 주소록 수정)
 * @param contactGroup 주소록 그룹
 */

interface UseAddressBookFormProps {
	mode: 'add' | 'edit';
	contactGroup?: ContactGroup;
}

const useAddressBookForm = ({ mode, contactGroup }: UseAddressBookFormProps) => {
	const [name, setName] = useState(mode === 'edit' ? contactGroup?.name || '' : '');
	const [email, setEmail] = useState('');
	const [contacts, setContacts] = useState<Contact[]>(mode === 'edit' ? contactGroup?.contacts || [] : []);
	const [emailWarningMessage, setEmailWarningMessage] = useState('');

	const restoreFromServerData = () => {
		if (mode === 'edit' && contactGroup) {
			setName(contactGroup.name || '');
			setContacts(contactGroup.contacts || []);
		} else if (mode === 'add') {
			setName('');
			setContacts([]);
		}
		setEmail('');
		setEmailWarningMessage('');
	};

	const resetInput = () => {
		setName('');
		setEmail('');
		setContacts([]);
		setEmailWarningMessage('');
	};

	return {
		name,
		setName,
		email,
		setEmail,
		contacts,
		setContacts,
		emailWarningMessage,
		setEmailWarningMessage,
		resetInput,
		restoreFromServerData,
	};
};

export default useAddressBookForm;
