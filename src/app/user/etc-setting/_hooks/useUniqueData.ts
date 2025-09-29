import { useMemo } from 'react';

import * as etcSettingTypes from '@/types/etc-setting.types';

interface UseUniqueDataProps {
	shippingCompanies?: etcSettingTypes.GetShippingCompaniesResponse | null;
	routes?: etcSettingTypes.GetRoutesResponse | null;
}

export const useUniqueData = ({ shippingCompanies, routes }: UseUniqueDataProps) => {
	const uniqueShippingCompanies = useMemo(() => {
		if (!shippingCompanies) {
			return [];
		}

		const seenCodes = new Set<string>();
		const unique: etcSettingTypes.ShippingCompany[] = [];

		for (const company of shippingCompanies.shippingCompanies) {
			if (!seenCodes.has(company.code)) {
				seenCodes.add(company.code);
				unique.push(company);
			}
		}

		return unique;
	}, [shippingCompanies]);

	const uniqueRoutes = useMemo(() => {
		if (!routes) {
			return [];
		}

		const seenCodes = new Set<string>();
		const unique: etcSettingTypes.Route[] = [];

		for (const route of routes.routes) {
			if (!seenCodes.has(route.code)) {
				seenCodes.add(route.code);
				unique.push(route);
			}
		}

		return unique;
	}, [routes]);

	return {
		uniqueShippingCompanies,
		uniqueRoutes,
	};
};
