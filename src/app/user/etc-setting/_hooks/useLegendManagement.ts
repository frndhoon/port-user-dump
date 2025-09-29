import { useState, useEffect } from 'react';

import COLORS from '@/app/user/etc-setting/_constants/color.constant';
import * as etcSettingTypes from '@/types/etc-setting.types';

interface UseLegendManagementProps {
	etcSetting?: etcSettingTypes.GetEtcSettingResponse | null;
}

export const useLegendManagement = ({ etcSetting }: UseLegendManagementProps) => {
	const [clientShippingLegends, setClientShippingLegends] = useState<etcSettingTypes.ShippingLegend[]>([]);
	const [clientRouteLegends, setClientRouteLegends] = useState<etcSettingTypes.RouteLegend[]>([]);
	const [clientVesselSizeLegends, setClientVesselSizeLegends] = useState<etcSettingTypes.VesselSizeLegend[]>([]);

	const [clientVesselSizeLegendsGT, setClientVesselSizeLegendsGT] = useState<etcSettingTypes.VesselSizeLegend[]>([]);
	const [clientVesselSizeLegendsTEU, setClientVesselSizeLegendsTEU] = useState<etcSettingTypes.VesselSizeLegend[]>([]);

	useEffect(() => {
		if (!etcSetting) {
			return;
		}

		setClientShippingLegends(etcSetting.shippingLegends);
		setClientRouteLegends(etcSetting.routeLegends);
		setClientVesselSizeLegends(etcSetting.vesselSizeLegends);

		setClientVesselSizeLegendsGT(etcSetting.vesselSizeLegends.filter(legend => legend.gtTeuDiv === 'GT'));
		setClientVesselSizeLegendsTEU(etcSetting.vesselSizeLegends.filter(legend => legend.gtTeuDiv === 'TEU'));
	}, [etcSetting]);

	useEffect(() => {
		setClientVesselSizeLegends([...clientVesselSizeLegendsGT, ...clientVesselSizeLegendsTEU]);
	}, [clientVesselSizeLegendsGT, clientVesselSizeLegendsTEU]);

	const getAvailableColor = (usedColors: string[]): string => {
		for (const color of COLORS) {
			if (!usedColors.includes(color)) {
				return color;
			}
		}

		return COLORS[0];
	};

	const handleAddShippingLegend = (company?: etcSettingTypes.ShippingCompany) => {
		setClientShippingLegends(prevLegends => {
			const usedColors: string[] = [];
			for (const legend of prevLegends) {
				usedColors.push(legend.color);
			}

			const availableColor = getAvailableColor(usedColors);

			const newLegend = {
				id: Date.now(),
				color: availableColor,
				shipping: {
					id: company?.id ?? 0,
					code: company?.code ?? '',
					name: company?.name ?? '',
				},
				sortOrder: prevLegends.length + 1,
			};
			return [...prevLegends, newLegend];
		});
	};

	const handleAddRouteLegend = (route?: etcSettingTypes.Route) => {
		setClientRouteLegends(prevLegends => {
			const usedColors: string[] = [];
			for (const legend of prevLegends) {
				usedColors.push(legend.color);
			}

			const availableColor = getAvailableColor(usedColors);

			return [
				...prevLegends,
				{
					id: Date.now(),
					color: availableColor,
					route: {
						id: route?.id ?? 0,
						code: route?.code ?? '',
					},
					sortOrder: prevLegends.length + 1,
				},
			];
		});
	};

	const handleAddVesselSizeLegendGT = () => {
		setClientVesselSizeLegendsGT(prevLegends => {
			const usedColors: string[] = [];
			for (const legend of prevLegends) {
				usedColors.push(legend.color);
			}

			const availableColor = getAvailableColor(usedColors);

			const gtLegends = prevLegends.filter(legend => legend.gtTeuDiv === 'GT');
			let maxSortOrder = 0;
			for (const legend of gtLegends) {
				if (legend.sortOrder > maxSortOrder) {
					maxSortOrder = legend.sortOrder;
				}
			}

			return [
				...prevLegends,
				{
					id: Date.now(),
					color: availableColor,
					minGT: undefined,
					maxGT: undefined,
					minTEU: undefined,
					maxTEU: undefined,
					gtTeuDiv: 'GT' as const,
					sortOrder: maxSortOrder + 1,
				},
			];
		});
	};

	const handleAddVesselSizeLegendTEU = () => {
		setClientVesselSizeLegendsTEU(prevLegends => {
			const usedColors: string[] = [];
			for (const legend of prevLegends) {
				usedColors.push(legend.color);
			}

			const availableColor = getAvailableColor(usedColors);

			const teuLegends = prevLegends.filter(legend => legend.gtTeuDiv === 'TEU');
			let maxSortOrder = 0;
			for (const legend of teuLegends) {
				if (legend.sortOrder > maxSortOrder) {
					maxSortOrder = legend.sortOrder;
				}
			}

			return [
				...prevLegends,
				{
					id: Date.now(),
					color: availableColor,
					minGT: undefined,
					maxGT: undefined,
					minTEU: undefined,
					maxTEU: undefined,
					gtTeuDiv: 'TEU' as const,
					sortOrder: maxSortOrder + 1,
				},
			];
		});
	};

	return {
		clientShippingLegends,
		clientRouteLegends,
		clientVesselSizeLegends,
		clientVesselSizeLegendsGT,
		clientVesselSizeLegendsTEU,
		setClientShippingLegends,
		setClientRouteLegends,
		setClientVesselSizeLegendsGT,
		setClientVesselSizeLegendsTEU,
		handleAddShippingLegend,
		handleAddRouteLegend,
		handleAddVesselSizeLegendGT,
		handleAddVesselSizeLegendTEU,
	};
};
