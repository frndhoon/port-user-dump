import { useState, useRef, useEffect, useCallback } from 'react';

import { formatNumberWithKoreanUnit, formatNumberWithCommas, parseNumberFromCommaString } from '@/app/user/etc-setting/_utils/legend-utils';
import * as etcSettingTypes from '@/types/etc-setting.types';

interface UseVesselSizeRangeEditProps {
	legend: etcSettingTypes.VesselSizeLegend;
	currentLegends: etcSettingTypes.VesselSizeLegend[];
	setCurrentLegends: React.Dispatch<React.SetStateAction<etcSettingTypes.VesselSizeLegend[]>>;
	unit: 'GT' | 'TEU';
}

export const useVesselSizeRangeEdit = ({ legend, currentLegends, setCurrentLegends, unit }: UseVesselSizeRangeEditProps) => {
	const [isEditingRange, setIsEditingRange] = useState(false);
	const [tempMinValue, setTempMinValue] = useState('');
	const [tempMaxValue, setTempMaxValue] = useState('');
	const rangeInputRef = useRef<HTMLInputElement>(null);

	const getMinValue = () => {
		if (unit === 'GT') {
			return legend.minGT?.toString() || '';
		} else if (unit === 'TEU') {
			return legend.minTEU?.toString() || '';
		}
		return '';
	};

	const getMaxValue = () => {
		if (unit === 'GT') {
			return legend.maxGT?.toString() || '';
		} else if (unit === 'TEU') {
			return legend.maxTEU?.toString() || '';
		}
		return '';
	};

	const getFormattedMinValue = () => {
		const value = getMinValue();
		return value ? formatNumberWithKoreanUnit(value) : '최소';
	};

	const getFormattedMaxValue = () => {
		const value = getMaxValue();
		return value ? formatNumberWithKoreanUnit(value) : '최대';
	};

	const handleRangeSave = useCallback(() => {
		const minValue = parseNumberFromCommaString(tempMinValue);
		const maxValue = parseNumberFromCommaString(tempMaxValue);

		const minNumValue = tempMinValue ? minValue : undefined;
		const maxNumValue = tempMaxValue ? maxValue : undefined;

		setCurrentLegends(
			currentLegends.map(l => {
				if (l.id === legend.id) {
					if (unit === 'GT') {
						return { ...l, minGT: minNumValue, maxGT: maxNumValue };
					} else if (unit === 'TEU') {
						return { ...l, minTEU: minNumValue, maxTEU: maxNumValue };
					}
				}
				return l;
			}),
		);

		setIsEditingRange(false);
	}, [currentLegends, legend.id, unit, tempMinValue, tempMaxValue, setCurrentLegends]);

	const handleRangeEditStart = () => {
		setTempMinValue(formatNumberWithCommas(getMinValue()));
		setTempMaxValue(formatNumberWithCommas(getMaxValue()));
		setIsEditingRange(true);
		setTimeout(() => rangeInputRef.current?.focus(), 0);
	};

	const handleMinValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const formatted = formatNumberWithCommas(e.target.value);
		setTempMinValue(formatted);
	};

	const handleMaxValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const formatted = formatNumberWithCommas(e.target.value);
		setTempMaxValue(formatted);
	};

	const handleKeyDown = useCallback(
		(e: React.KeyboardEvent) => {
			if (e.key === 'Enter') {
				handleRangeSave();
			} else if (e.key === 'Escape') {
				setIsEditingRange(false);
			}
		},
		[handleRangeSave],
	);

	const handleDelete = () => {
		setCurrentLegends(currentLegends.filter(l => l.id !== legend.id));
	};

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (isEditingRange && rangeInputRef.current && !rangeInputRef.current.contains(event.target as Node)) {
				handleRangeSave();
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, [isEditingRange, handleRangeSave]);

	return {
		isEditingRange,
		tempMinValue,
		tempMaxValue,
		rangeInputRef,
		getFormattedMinValue,
		getFormattedMaxValue,
		handleRangeEditStart,
		handleMinValueChange,
		handleMaxValueChange,
		handleKeyDown,
		handleDelete,
	};
};
