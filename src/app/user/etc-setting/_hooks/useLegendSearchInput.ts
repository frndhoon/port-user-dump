import { useState, useEffect } from 'react';

import { toast } from 'sonner';

import * as etcSettingTypes from '@/types/etc-setting.types';

interface UseLegendSearchInputProps<T extends etcSettingTypes.LegendData, TItem extends etcSettingTypes.LegendItem> {
	items: TItem[];
	onItemSelect: (item?: TItem) => void;
	clientLegends?: T[];
	legendType: etcSettingTypes.LegendType;
}

export const useLegendSearchInput = <T extends etcSettingTypes.LegendData, TItem extends etcSettingTypes.LegendItem>({
	items,
	onItemSelect,
	clientLegends = [],
	legendType,
}: UseLegendSearchInputProps<T, TItem>) => {
	const [inputValue, setInputValue] = useState('');
	const [searchValue, setSearchValue] = useState('');
	const [showDropdown, setShowDropdown] = useState(false);
	const [isInputFocus, setIsInputFocus] = useState(false);

	// inputValue가 변경되면 searchValue 업데이트
	useEffect(() => {
		if (inputValue === '') {
			setSearchValue('');
			return;
		}

		setSearchValue(inputValue);
	}, [inputValue]);

	// 검색어에 따라 아이템 필터링
	const filteredItems = items.filter(item => {
		const searchTerm = searchValue.toLowerCase();
		const itemCode = item.code.toLowerCase();
		return itemCode.includes(searchTerm);
	});

	// 검색어 변경 핸들러
	const handleSearchChange = (value: string) => {
		setInputValue(value);
		setShowDropdown(true);
	};

	// 아이템 선택 핸들러
	const handleItemSelect = (item: TItem) => {
		setShowDropdown(false);
		setInputValue('');
		setSearchValue('');

		// 중복 체크
		let isDuplicate = false;
		for (const legend of clientLegends) {
			if (legendType === 'route') {
				if ((legend as etcSettingTypes.RouteLegend).route.id === item.id) {
					isDuplicate = true;
					break;
				}
			} else if (legendType === 'shipping') {
				if ((legend as etcSettingTypes.ShippingLegend).shipping?.id === item.id) {
					isDuplicate = true;
					break;
				}
			}
		}

		if (isDuplicate) {
			if (legendType === 'route') {
				return toast.error('이미 추가된 항로입니다.');
			} else if (legendType === 'shipping') {
				return toast.error('이미 추가된 선사입니다.');
			}
		}

		onItemSelect(item);
	};

	// 표시할 텍스트 결정 (선사는 name 우선, 항로는 code)
	const getDisplayText = (item: TItem) => {
		if (legendType === 'shipping' && 'name' in item) {
			return item.name || item.code;
		}
		return item.code;
	};

	// 포커스 핸들러
	const handleInputFocus = () => {
		setIsInputFocus(true);
		setShowDropdown(true);
	};

	const handleInputBlur = () => {
		setIsInputFocus(false);
		setShowDropdown(false);
	};

	return {
		// 상태
		inputValue,
		searchValue,
		showDropdown,
		isInputFocus,
		filteredItems,

		// 핸들러
		handleSearchChange,
		handleItemSelect,
		getDisplayText,
		handleInputFocus,
		handleInputBlur,
	};
};
