import { useState, useMemo } from 'react';

import * as etcSettingTypes from '@/types/etc-setting.types';

interface UseLegendColorSelectProps<T extends etcSettingTypes.LegendData, TItem extends etcSettingTypes.LegendItem> {
	selectedColor: string;
	items: TItem[];
	currentLegends: T[];
	setCurrentLegends: React.Dispatch<React.SetStateAction<T[]>>;
	legendId: number;
	legendType: etcSettingTypes.LegendType;
}

export const useLegendColorSelect = <T extends etcSettingTypes.LegendData, TItem extends etcSettingTypes.LegendItem>({
	selectedColor,
	items,
	currentLegends,
	setCurrentLegends,
	legendId,
	legendType,
}: UseLegendColorSelectProps<T, TItem>) => {
	const [selectedColorState, setSelectedColorState] = useState(selectedColor);
	const [open, setOpen] = useState(false);

	// 현재 사용 중인 코드들 찾기 (자신 제외)
	const usedCodes = useMemo(() => {
		const codes: string[] = [];

		for (const legend of currentLegends) {
			if (legend.id === legendId) {
				continue;
			}

			if (legendType === 'route') {
				const code = (legend as etcSettingTypes.RouteLegend).route?.code;
				if (code) {
					codes.push(code);
				}
			} else if (legendType === 'shipping') {
				const code = (legend as etcSettingTypes.ShippingLegend).shipping?.code;
				if (code) {
					codes.push(code);
				}
			}
		}

		return codes;
	}, [currentLegends, legendId, legendType]);

	// 중복 제거된 아이템 목록
	const uniqueItems = useMemo(() => {
		const seenCodes = new Set<string>();
		const unique: TItem[] = [];

		for (const item of items) {
			if (!seenCodes.has(item.code)) {
				seenCodes.add(item.code);
				unique.push(item);
			}
		}

		return unique;
	}, [items]);

	// 색상 변경 핸들러
	const handleColorChange = (color: string) => {
		setSelectedColorState(color);
		setCurrentLegends(currentLegends.map(legend => (legend.id === legendId ? { ...legend, color } : legend)));
		setOpen(false);
	};

	// 코드 변경 핸들러
	const handleCodeChange = (newCode: string) => {
		if (usedCodes.includes(newCode)) {
			return;
		}

		const selectedItem = items.find(item => item.code === newCode);
		if (!selectedItem) {
			return;
		}

		setCurrentLegends(
			currentLegends.map(legend => {
				if (legend.id !== legendId) {
					return legend;
				}

				if (legendType === 'route') {
					const routeLegend = legend as etcSettingTypes.RouteLegend;
					return {
						...routeLegend,
						route: {
							...routeLegend.route,
							id: selectedItem.id,
							code: newCode,
						},
					} as T;
				} else if (legendType === 'shipping') {
					const shippingLegend = legend as etcSettingTypes.ShippingLegend;
					const shippingItem = selectedItem as etcSettingTypes.ShippingCompany;
					return {
						...shippingLegend,
						shipping: {
							...shippingLegend.shipping,
							id: shippingItem.id,
							code: newCode,
							name: shippingItem.name,
						},
					} as T;
				}

				return legend;
			}),
		);
	};

	// 삭제 핸들러
	const handleDelete = () => {
		setCurrentLegends(currentLegends.filter(legend => legend.id !== legendId));
	};

	return {
		selectedColorState,
		open,
		setOpen,
		usedCodes,
		uniqueItems,
		handleColorChange,
		handleCodeChange,
		handleDelete,
	};
};
