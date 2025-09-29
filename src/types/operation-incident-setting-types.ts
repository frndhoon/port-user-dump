export type CodeValue =
	| 'BERTHING_DELAY_NOTIFICATION' // 접안지연
	| 'DEPARTURE_DELAY_NOTIFICATION' // 출항지연
	| 'WORK_START_TIME_DELAY_NOTIFICATION' // 본선작업 지연
	| 'VESSEL_CONNECTION_CLOSE_NOTIFICATION' // 연결 선박 근접
	| 'VESSEL_CONNECTION_CONFLICT_NOTIFICATION' // 연결선박겹침
	| 'VESSEL_CONNECTION_UNAVAILABLE_NOTIFICATION' // 선박 연결 불가
	| 'BL_SEPARATION_NOTIFICATION' // BL 분리 시간
	| 'GATE_IN_UNAVAILABLE_NOTIFICATION'
	| 'GATE_IN_RISK_NOTIFICATION'; // 반입불가

export type MonitoringNotificationType = {
	codeTypeId: number;
	codeTypeName: string;
	commonCodeId: number;
	codeValue: CodeValue;
	codeLabel: string;
	description: string;
};

export type Setting = {
	monitoringNotificationType: MonitoringNotificationType;
	activeYn: boolean;
	settingOffset: number;
	settingReference: boolean;
};

export type GetOperationIncidentSettingQueryString = {
	nc: 'MONITORING_ALERT';
};

export type GetOperationIncidentSettingResponse = {
	entireActiveYn: boolean;
	settings: Setting[];
};

export type UpdateOperationIncidentSettingRequest = {
	entireActive: {
		activeYn: boolean;
		notificationCategory: 'MONITORING_ALERT';
	};
	settings: {
		monitoringNotificationType: number;
		settingOffset: number;
		settingReference: boolean;
		activeYn: boolean;
	}[];
};

export type UpdateOperationIncidentSettingResponse = null;
