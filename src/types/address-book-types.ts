// 연락처 타입
export type Contact = {
	id: number;
	accountId: number;
	chainportalId: string;
	name: string;
	email: string;
	shipping: { id: number; name: string; code: string };
};

// 연락처 그룹 타입
export type ContactGroup = {
	id: number;
	name: string;
	contactCount: number;
	contacts: Contact[];
};

// 주소록 타입
export type AddressBook = {
	totalRows: number;
	perviousPage: number;
	nowPage: number;
	nextPage: number;
	pageSize: number;
	contactGroups: ContactGroup[];
};

// 주소록 조회 쿼리스트링 타입
export type GetAddressBookQueryString = {
	page: number;
};

// 주소록 응답 타입
export type GetAddressBookResponse = AddressBook;

// 중복그룹명 확인 쿼리스트링 타입
export type CheckDuplicateGroupTitleQueryString = {
	title: string;
};

// 중복그룹명 확인 응답 타입
export type CheckDuplicateGroupTitleResponse = {
	duplicateYn: boolean;
};

// 주소록 등록 요청 타입
export type CreateAddressBookRequest = {
	name: string;
	shareWithAllEmployees: boolean;
	contacts: Pick<Contact, 'accountId' | 'chainportalId'>[];
};

// 주소록 등록 응답 타입
export type CreateAddressBookResponse = {
	contactGroup: ContactGroup;
};

// 사용자 검색 쿼리스트링 타입
export type SearchUserQueryString = {
	email: string;
};

// 사용자 검색 응답 타입
export type SearchUserResponse = {
	contact: Contact[];
};

// 주소록 업데이트 요청 타입
export type UpdateAddressBookRequest = {
	name: string;
	shareWithAllEmployees: boolean;
	contacts: Pick<Contact, 'accountId' | 'chainportalId'>[];
};

// 주소록 업데이트 응답 타입
export type UpdateAddressBookResponse = ContactGroup;

// 주소록 삭제 요청 타입
export type DeleteAddressBookRequest = {
	id: number;
};

// 주소록 삭제 응답 타입
export type DeleteAddressBookResponse = {
	deletedResourceId: number;
};
