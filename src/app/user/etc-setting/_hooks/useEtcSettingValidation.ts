import { useMemo } from 'react';

import {
	checkShippingLegendDuplicates,
	checkRouteLegendDuplicates,
	checkVesselSizeLegendDuplicates,
	checkVesselSizeRangeErrors,
} from '@/app/user/etc-setting/_utils/legend-utils';
import * as etcSettingTypes from '@/types/etc-setting.types';

interface UseEtcSettingValidationProps {
	shippingLegends: etcSettingTypes.ShippingLegend[];
	routeLegends: etcSettingTypes.RouteLegend[];
	vesselSizeLegends: etcSettingTypes.VesselSizeLegend[];
}

export interface ValidationResult {
	isValid: boolean;
	hasShippingErrors: boolean;
	hasRouteErrors: boolean;
	hasVesselSizeErrors: boolean;
	shippingDuplicates: {
		duplicateColorIds: number[];
		duplicateCodeIds: number[];
	};
	routeDuplicates: {
		duplicateColorIds: number[];
		duplicateCodeIds: number[];
	};
	vesselSizeDuplicates: {
		duplicateColorIds: number[];
		duplicateRangeIds: number[];
	};
	vesselSizeRangeErrors: Record<number, string>;
}

export const useEtcSettingValidation = ({ shippingLegends, routeLegends, vesselSizeLegends }: UseEtcSettingValidationProps): ValidationResult => {
	const validationResult = useMemo(() => {
		// 선사 범례 검증
		const shippingDuplicates = checkShippingLegendDuplicates(shippingLegends);
		const hasShippingColorDuplicate = shippingDuplicates.duplicateColorIds.length > 0;
		const hasShippingCodeDuplicate = shippingDuplicates.duplicateCodeIds.length > 0;

		// 항로 범례 검증
		const routeDuplicates = checkRouteLegendDuplicates(routeLegends);
		const hasRouteColorDuplicate = routeDuplicates.duplicateColorIds.length > 0;
		const hasRouteCodeDuplicate = routeDuplicates.duplicateCodeIds.length > 0;

		// 선박 사이즈 범례 검증
		const vesselSizeDuplicates = checkVesselSizeLegendDuplicates(vesselSizeLegends);
		const hasVesselSizeColorDuplicate = vesselSizeDuplicates.duplicateColorIds.length > 0;
		const hasVesselSizeRangeDuplicate = vesselSizeDuplicates.duplicateRangeIds.length > 0;

		// 선박 사이즈 범위 에러 검증
		const vesselSizeRangeErrors = checkVesselSizeRangeErrors(vesselSizeLegends);
		const hasVesselSizeRangeError = Object.keys(vesselSizeRangeErrors).length > 0;

		// 전체 에러 여부
		const hasShippingErrors = hasShippingColorDuplicate || hasShippingCodeDuplicate;
		const hasRouteErrors = hasRouteColorDuplicate || hasRouteCodeDuplicate;
		const hasVesselSizeErrors = hasVesselSizeColorDuplicate || hasVesselSizeRangeDuplicate || hasVesselSizeRangeError;

		const isValid = !hasShippingErrors && !hasRouteErrors && !hasVesselSizeErrors;

		return {
			isValid,
			hasShippingErrors,
			hasRouteErrors,
			hasVesselSizeErrors,
			shippingDuplicates,
			routeDuplicates,
			vesselSizeDuplicates,
			vesselSizeRangeErrors,
		};
	}, [shippingLegends, routeLegends, vesselSizeLegends]);

	return validationResult;
};
