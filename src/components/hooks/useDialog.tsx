'use client';

import { useState } from 'react';

/**
 * @component 다이얼로그 훅
 * @author 우정훈
 * @description 공통으로 사용되는 다이얼로그 훅입니다.
 */

const useDialog = () => {
	const [isDialogOpen, setIsDialogOpen] = useState(false);

	const handleDialogChange = (isDialogOpen: boolean) => {
		setIsDialogOpen(isDialogOpen);
	};

	return {
		isDialogOpen,
		setIsDialogOpen,
		handleDialogChange,
	};
};

export default useDialog;
