import { useMemo } from 'react';

import * as etcSettingTypes from '@/types/etc-setting.types';

interface UseLegendCodeProps<T extends etcSettingTypes.LegendData, TItem extends etcSettingTypes.LegendItem> {
	items: TItem[];
	currentLegends: T[];
	setCurrentLegends: React.Dispatch<React.SetStateAction<T[]>>;
	legendId: number;
	legendType: etcSettingTypes.LegendType;
}

export const useLegendCode = <T extends etcSettingTypes.LegendData, TItem extends etcSettingTypes.LegendItem>({
	items,
	currentLegends,
	setCurrentLegends,
	legendId,
	legendType,
}: UseLegendCodeProps<T, TItem>) => {
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

	const handleDelete = () => {
		setCurrentLegends(currentLegends.filter(legend => legend.id !== legendId));
	};

	return {
		usedCodes,
		uniqueItems,
		handleCodeChange,
		handleDelete,
	};
};
