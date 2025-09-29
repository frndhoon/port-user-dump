import { useState } from 'react';

import * as etcSettingTypes from '@/types/etc-setting.types';

interface UseLegendColorProps<T extends etcSettingTypes.LegendData> {
	selectedColor: string;
	currentLegends: T[];
	setCurrentLegends: React.Dispatch<React.SetStateAction<T[]>>;
	legendId: number;
}

export const useLegendColor = <T extends etcSettingTypes.LegendData>({
	selectedColor,
	currentLegends,
	setCurrentLegends,
	legendId,
}: UseLegendColorProps<T>) => {
	const [selectedColorState, setSelectedColorState] = useState(selectedColor);
	const [open, setOpen] = useState(false);

	const handleColorChange = (color: string) => {
		setSelectedColorState(color);
		setCurrentLegends(currentLegends.map(legend => (legend.id === legendId ? { ...legend, color } : legend)));
		setOpen(false);
	};

	return {
		selectedColorState,
		open,
		setOpen,
		handleColorChange,
	};
};
