import { useState } from 'react';

import * as etcSettingTypes from '@/types/etc-setting.types';

interface UseVesselSizeColorProps {
	legend: etcSettingTypes.VesselSizeLegend;
	currentLegends: etcSettingTypes.VesselSizeLegend[];
	setCurrentLegends: React.Dispatch<React.SetStateAction<etcSettingTypes.VesselSizeLegend[]>>;
}

export const useVesselSizeColor = ({ legend, currentLegends, setCurrentLegends }: UseVesselSizeColorProps) => {
	const [open, setOpen] = useState(false);
	const [selectedColorState, setSelectedColorState] = useState(legend.color);

	// 색상 변경 핸들러
	const handleColorChange = (color: string) => {
		setSelectedColorState(color);
		setCurrentLegends(currentLegends.map(l => (l.id === legend.id ? { ...l, color } : l)));
		setOpen(false);
	};

	return {
		selectedColorState,
		open,
		setOpen,
		handleColorChange,
	};
};
