'use client';

import { useSearchUser } from '@/api/tanstack-query/useAddressBook';
import * as addressBookTypes from '@/types/address-book-types';

/**
 * @component 연락처 관리 훅
 * @author 우정훈
 * @description 연락처 관리 훅입니다. 연락처가 존재하는지 확인하고, 존재하지 않는 연락처는 체인포털에서 검색하여 추가하는 기능을 담당합니다.
 * 클라이언트 측에서 연락처 삭제 기능 또한 담당합니다.
 * @param email 이메일
 * @param setEmail 이메일 설정
 * @param setEmailWarningMessage 이메일 경고 메시지 설정
 * @param contacts 연락처
 * @param setContacts 연락처 설정
 */

interface UseContactManagementProps {
	email: string;
	setEmail: (email: string) => void;
	setEmailWarningMessage: (emailWarningMessage: string) => void;
	contacts: addressBookTypes.Contact[];
	setContacts: (contacts: addressBookTypes.Contact[]) => void;
}

const useContactManagement = ({ email, setEmail, setEmailWarningMessage, contacts, setContacts }: UseContactManagementProps) => {
	const { mutateAsync: searchUser, isPending: isSearching } = useSearchUser({ email: email || '' });

	const handleAddContact = async () => {
		// 이메일 input value가 빈 값인지
		if (email === '') {
			setEmailWarningMessage('이메일을 입력해주세요.');
			return;
		}

		// 이메일 형식인지
		if (email?.split('@').length !== 2) {
			setEmailWarningMessage('이메일 형식이 올바르지 않습니다.');
			return;
		}

		try {
			const result = await searchUser({});

			// 체인포털에 없는 이메일인지
			if (!result?.contact) {
				setEmailWarningMessage('체인포털에 없는 이메일입니다.');
				return;
			} else if (result?.contact) {
				const isDuplicateContact = contacts.map(contact => contact.accountId).includes(result?.contact[0].accountId);

				// 이미 그룹에 있는 이메일인지
				if (isDuplicateContact) {
					setEmailWarningMessage('이미 그룹에 있는 이메일입니다.');
					return;
				}

				setContacts([...contacts, result?.contact[0]]);
				setEmail('');
				setEmailWarningMessage('');
			}
		} catch (error) {
			console.error(error);
		}
	};

	const handleDeleteContact = (accountId: number) => {
		setContacts(contacts.filter(contact => contact.accountId !== accountId));
	};
	return {
		isSearching,
		handleAddContact,
		handleDeleteContact,
	};
};

export default useContactManagement;
