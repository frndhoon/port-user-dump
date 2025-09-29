import { useMutation, useQuery, useQueryClient, UseMutationResult, UseQueryResult } from '@tanstack/react-query';
import { toast } from 'sonner';

import * as etcSettingTypes from '@/types/etc-setting.types';

import { getEtcSetting, getRoutes, getShippingCompanies, getTerminalFilterSettings, saveEtcSetting } from '../action/etc-setting';

// * 설정 조회
const useGetEtcSetting = (): UseQueryResult<etcSettingTypes.GetEtcSettingResponse | null> => {
	return useQuery({
		queryKey: ['etcSetting'],
		queryFn: async () => {
			const response = await getEtcSetting<etcSettingTypes.GetEtcSettingResponse>();
			if (response.statusCode === 200) {
				return response.result;
			}
			throw new Error(response.message);
		},
	});
};

// * 선사 조회
const useGetShippingCompanies = (): UseQueryResult<etcSettingTypes.GetShippingCompaniesResponse | null> => {
	return useQuery({
		queryKey: ['shippingCompanies'],
		queryFn: async () => {
			const response = await getShippingCompanies<etcSettingTypes.GetShippingCompaniesResponse>();
			if (response.statusCode === 200) {
				return response.result;
			}
			throw new Error(response.message);
		},
	});
};

// * 항로 조회
const useGetRoutes = (): UseQueryResult<etcSettingTypes.GetRoutesResponse | null> => {
	return useQuery({
		queryKey: ['routes'],
		queryFn: async () => {
			const response = await getRoutes<etcSettingTypes.GetRoutesResponse>();
			if (response.statusCode === 200) {
				return response.result;
			}
			throw new Error(response.message);
		},
	});
};

// * 터미널 필터 설정 조회
const useGetTerminalFilterSettings = (): UseQueryResult<etcSettingTypes.GetTerminalFilterSettingsResponse | null> => {
	return useQuery({
		queryKey: ['terminalFilterSettings'],
		queryFn: async () => {
			const response = await getTerminalFilterSettings<etcSettingTypes.GetTerminalFilterSettingsResponse>();
			if (response.statusCode === 200) {
				return response.result;
			}
			throw new Error(response.message);
		},
	});
};

const useSaveEtcSetting = ({
	terminalFilterSettings,
	shippingLegends,
	routeLegends,
	vesselSizeLegends,
}: {
	terminalFilterSettings: etcSettingTypes.TerminalFilterSetting[];
	shippingLegends: etcSettingTypes.ShippingLegend[];
	routeLegends: etcSettingTypes.RouteLegend[];
	vesselSizeLegends: etcSettingTypes.VesselSizeLegend[];
}): UseMutationResult<etcSettingTypes.SaveEtcSettingResponse | null, Error, void> => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async () => {
			// (backend request type)
			const apiRequest: etcSettingTypes.SaveEtcSettingRequest = {
				terminalFilterSettings: terminalFilterSettings.map(setting => ({
					terminalId: setting.terminal.id,
					activeYn: setting.activeYn,
					sortOrder: setting.sortOrder,
				})),
				shippingLegends: shippingLegends.map(legend => ({
					color: legend.color,
					shippingId: legend.shipping.id,
					sortOrder: legend.sortOrder,
				})),
				routeLegends: routeLegends.map(legend => ({
					color: legend.color,
					routeId: legend.route.id,
					sortOrder: legend.sortOrder,
				})),
				vesselSizeLegends: vesselSizeLegends.map(legend => ({
					color: legend.color,
					minGT: legend.minGT,
					maxGT: legend.maxGT,
					minTEU: legend.minTEU,
					maxTEU: legend.maxTEU,
					gtTeuDiv: legend.gtTeuDiv,
					sortOrder: legend.sortOrder,
				})),
				shortcutSettings: [], // shortcutSetting은 현재 사용하지 않는 기 // shortcutSetting은 현재 사용하지 않는 기획이지만 요청, 응답 간 담아서 보낼 것 saveEtcSetting<etcSettingTypes.SaveEtcSettingResponse>(apiRequest);
			};
			const response = await saveEtcSetting<etcSettingTypes.SaveEtcSettingResponse>(apiRequest);
			if (response.statusCode === 200) {
				return response.result;
			}
			throw new Error(response.message);
		},
		onSuccess: () => {
			toast.success('설정이 완료되었습니다.');
			queryClient.invalidateQueries({ queryKey: ['etcSetting'] });
		},
		onError: () => {
			toast.error('설정 저장에 실패했습니다. 다시 시도해주세요.');
		},
	});
};

export { useGetEtcSetting, useGetShippingCompanies, useGetRoutes, useGetTerminalFilterSettings, useSaveEtcSetting };
