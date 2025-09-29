import * as etcSettingTypes from '@/types/etc-setting.types';

export type DuplicateInfo = {
	duplicateColorIds: number[];
	duplicateCodeIds: number[];
};

export type VesselSizeDuplicateInfo = {
	duplicateColorIds: number[];
	duplicateRangeIds: number[];
};

export const checkShippingLegendDuplicates = (legends: etcSettingTypes.ShippingLegend[]): DuplicateInfo => {
	const duplicateColors: number[] = [];
	const duplicateCodes: number[] = [];

	for (let i = 0; i < legends.length; i++) {
		for (let j = i + 1; j < legends.length; j++) {
			if (legends[i].color === legends[j].color) {
				duplicateColors.push(legends[i].id);
				duplicateColors.push(legends[j].id);
			}
		}
	}

	for (let i = 0; i < legends.length; i++) {
		for (let j = i + 1; j < legends.length; j++) {
			const iCode = legends[i].shipping?.code;
			const jCode = legends[j].shipping?.code;

			if (iCode && jCode && iCode === jCode) {
				duplicateCodes.push(legends[i].id);
				duplicateCodes.push(legends[j].id);
			}
		}
	}

	return {
		duplicateColorIds: duplicateColors,
		duplicateCodeIds: duplicateCodes,
	};
};

export const checkRouteLegendDuplicates = (legends: etcSettingTypes.RouteLegend[]): DuplicateInfo => {
	const duplicateColors: number[] = [];
	const duplicateCodes: number[] = [];

	for (let i = 0; i < legends.length; i++) {
		for (let j = i + 1; j < legends.length; j++) {
			if (legends[i].color === legends[j].color) {
				duplicateColors.push(legends[i].id);
				duplicateColors.push(legends[j].id);
			}
		}
	}

	for (let i = 0; i < legends.length; i++) {
		for (let j = i + 1; j < legends.length; j++) {
			const iCode = legends[i].route?.code;
			const jCode = legends[j].route?.code;

			if (iCode && jCode && iCode === jCode) {
				duplicateCodes.push(legends[i].id);
				duplicateCodes.push(legends[j].id);
			}
		}
	}

	return {
		duplicateColorIds: duplicateColors,
		duplicateCodeIds: duplicateCodes,
	};
};

const checkRangeOverlap = (legend1: etcSettingTypes.VesselSizeLegend, legend2: etcSettingTypes.VesselSizeLegend): boolean => {
	if (legend1.gtTeuDiv === 'GT') {
		const min1 = legend1.minGT;
		const max1 = legend1.maxGT;
		const min2 = legend2.minGT;
		const max2 = legend2.maxGT;

		if ((min1 === undefined && max1 === undefined) || (min2 === undefined && max2 === undefined)) {
			return false;
		}

		const min1Value = min1 ?? 0;
		const max1Value = max1 ?? Infinity;
		const min2Value = min2 ?? 0;
		const max2Value = max2 ?? Infinity;

		return !(max1Value <= min2Value || max2Value <= min1Value);
	} else {
		const min1 = legend1.minTEU;
		const max1 = legend1.maxTEU;
		const min2 = legend2.minTEU;
		const max2 = legend2.maxTEU;

		if ((min1 === undefined && max1 === undefined) || (min2 === undefined && max2 === undefined)) {
			return false;
		}

		const min1Value = min1 ?? 0;
		const max1Value = max1 ?? Infinity;
		const min2Value = min2 ?? 0;
		const max2Value = max2 ?? Infinity;

		return !(max1Value <= min2Value || max2Value <= min1Value);
	}
};

export const checkVesselSizeLegendDuplicates = (legends: etcSettingTypes.VesselSizeLegend[]): VesselSizeDuplicateInfo => {
	const colorCounts: Record<string, number> = {};
	for (const legend of legends) {
		if (colorCounts[legend.color]) {
			colorCounts[legend.color] = colorCounts[legend.color] + 1;
		} else {
			colorCounts[legend.color] = 1;
		}
	}

	const duplicateColorIds: number[] = [];
	for (const legend of legends) {
		if (colorCounts[legend.color] > 1) {
			duplicateColorIds.push(legend.id);
		}
	}

	const duplicateRangeIds: number[] = [];

	for (let i = 0; i < legends.length; i++) {
		for (let j = i + 1; j < legends.length; j++) {
			const legend1 = legends[i];
			const legend2 = legends[j];

			if (legend1.gtTeuDiv === legend2.gtTeuDiv) {
				const isOverlapping = checkRangeOverlap(legend1, legend2);
				if (isOverlapping) {
					duplicateRangeIds.push(legend1.id, legend2.id);
				}
			}
		}
	}

	const uniqueDuplicateRangeIds: number[] = [];
	const seenIds = new Set<number>();
	for (const id of duplicateRangeIds) {
		if (!seenIds.has(id)) {
			seenIds.add(id);
			uniqueDuplicateRangeIds.push(id);
		}
	}

	return {
		duplicateColorIds,
		duplicateRangeIds: uniqueDuplicateRangeIds,
	};
};

export const validateVesselSizeRange = (minValue: string, maxValue: string): string => {
	// 둘 다 입력 안했을 때
	if (!minValue && !maxValue) {
		return '값을 입력해주세요.';
	}

	if (minValue && maxValue === '') {
		return '';
	}

	if (!minValue && maxValue) {
		return '';
	}

	if (minValue && maxValue) {
		const minNum = Number(minValue.replace(/,/g, ''));
		const maxNum = Number(maxValue.replace(/,/g, ''));

		if (minNum > maxNum) {
			return '최댓값보다 최솟값이 더 큽니다.';
		}
	}

	return '';
};

export const checkVesselSizeRangeErrors = (legends: etcSettingTypes.VesselSizeLegend[]): Record<number, string> => {
	const errors: Record<number, string> = {};

	legends.forEach(legend => {
		const minValue = legend.gtTeuDiv === 'GT' ? legend.minGT?.toString() || '' : legend.minTEU?.toString() || '';
		const maxValue = legend.gtTeuDiv === 'GT' ? legend.maxGT?.toString() || '' : legend.maxTEU?.toString() || '';

		const error = validateVesselSizeRange(minValue, maxValue);
		if (error) {
			errors[legend.id] = error;
		}
	});

	return errors;
};

export const highlightSearchText = (text: string, searchValue: string) => {
	const searchIndex = text.toLowerCase().indexOf(searchValue.toLowerCase());

	if (searchIndex === -1) {
		return text;
	}

	const beforeText = text.slice(0, searchIndex);
	const matchText = text.slice(searchIndex, searchIndex + searchValue.length);
	const afterText = text.slice(searchIndex + searchValue.length);

	return (
		<>
			{beforeText}
			<span className="text-correct">{matchText}</span>
			{afterText}
		</>
	);
};

export const formatNumberWithKoreanUnit = (value: number | string | undefined | null): string => {
	if (value === undefined || value === null || value === '') {
		return '';
	}

	const num = typeof value === 'string' ? Number(value) : value;

	if (isNaN(num)) {
		return '';
	}

	if (num >= 10000) {
		const man = Math.floor(num / 10000);
		const remainder = num % 10000;

		if (remainder === 0) {
			return `${man}만`;
		} else if (remainder >= 1000) {
			const cheon = Math.floor(remainder / 1000);
			return `${man}만 ${cheon}천`;
		} else {
			return `${man}만 ${remainder}`;
		}
	} else if (num >= 1000) {
		const cheon = Math.floor(num / 1000);
		const remainder = num % 1000;

		if (remainder === 0) {
			return `${cheon}천`;
		} else {
			return `${cheon}천 ${remainder}`;
		}
	} else {
		return num.toString();
	}
};

export const formatNumberWithCommas = (value: string | number): string => {
	if (!value && value !== 0) {
		return '';
	}

	const numStr = value.toString();

	const cleanStr = numStr.replace(/[^\d.]/g, '');

	// 빈 문자열이면 빈 문자열 반환
	if (!cleanStr) {
		return '';
	}

	if (cleanStr.includes('.')) {
		const [integerPart, decimalPart] = cleanStr.split('.');
		// integerPart가 빈 문자열일 수 있으므로 체크
		if (!integerPart) {
			return '';
		}
		const num = parseInt(integerPart);
		if (isNaN(num)) {
			return '';
		}
		return `${num.toLocaleString()}.${decimalPart}`;
	} else {
		const num = parseInt(cleanStr);
		if (isNaN(num)) {
			return '';
		}
		return num.toLocaleString();
	}
};

export const parseNumberFromCommaString = (value: string): number => {
	if (!value) {
		return 0;
	}

	const cleanStr = value.replace(/,/g, '');
	const num = Number(cleanStr);

	return isNaN(num) ? 0 : num;
};
