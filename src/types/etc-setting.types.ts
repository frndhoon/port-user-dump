// 선사 타입
export type ShippingLegend = {
	id: number;
	color: string;
	shipping: {
		id: number;
		code: string;
		name: string;
	};
	sortOrder: number;
};

// 항로 타입
export type RouteLegend = {
	id: number;
	color: string;
	route: {
		id: number;
		code: string;
	};
	sortOrder: number;
};

// 선박 크기 타입
export type VesselSizeLegend = {
	id: number;
	color: string;
	minGT?: number;
	maxGT?: number;
	minTEU?: number;
	maxTEU?: number;
	gtTeuDiv: 'GT' | 'TEU';
	sortOrder: number;
};

// 선사, 항로, 선박 크기 조회 응답 타입
export type GetEtcSettingResponse = {
	shippingLegends: ShippingLegend[];
	routeLegends: RouteLegend[];
	vesselSizeLegends: VesselSizeLegend[];
};

// 선사 타입
export type ShippingCompany = {
	id: number;
	name: string;
	code: string;
};

// 항차 타입
export type Port = {
	id: number;
	code: string;
	koreanName: string;
	englishName: string;
};

// 항로 타입
export type Route = {
	id: number;
	code: string;
	ports: Port[] | [];
};

// 선사 조회 응답 타입
export type GetShippingCompaniesResponse = {
	shippingCompanies: ShippingCompany[];
};

// 항로 조회 응답 타입
export type GetRoutesResponse = {
	routes: Route[];
};

// 터미널 타입
export type Terminal = {
	id: number;
	name: string;
	code: string;
};

// 터미널 필터 설정 타입
export type TerminalFilterSetting = {
	id: number;
	terminal: Terminal;
	activeYn: boolean;
	sortOrder: number;
	portCode: string;
};

export type GetTerminalFilterSettingsResponse = {
	terminalFilterSettings: TerminalFilterSetting[];
};

// 설정 저장 요청 타입
export type SaveEtcSettingRequest = {
	terminalFilterSettings: {
		terminalId: number;
		activeYn: boolean;
		sortOrder: number;
	}[];
	shippingLegends: {
		color: string;
		shippingId: number;
		sortOrder: number;
	}[];
	routeLegends: {
		color: string;
		routeId: number;
		sortOrder: number;
	}[];
	vesselSizeLegends: {
		color: string;
		minGT?: number;
		maxGT?: number;
		minTEU?: number;
		maxTEU?: number;
		gtTeuDiv: 'GT' | 'TEU';
		sortOrder: number;
	}[];
	shortcutSettings: [];
};

// 설정 저장 응답 타입
export type SaveEtcSettingResponse = {
	shippingLegends: ShippingLegend[];
	routeLegends: RouteLegend[];
	vesselSizeLegends: VesselSizeLegend[];
	terminalFilterSettings: TerminalFilterSetting[];
	shortcutSettings: [];
};

// 통합 범례 아이템 타입 (항로 또는 선사)
export type LegendItem = Route | ShippingCompany;

// 통합 범례 데이터 타입
export type LegendData = RouteLegend | ShippingLegend;

// 범례 타입 구분
export type LegendType = 'route' | 'shipping';
