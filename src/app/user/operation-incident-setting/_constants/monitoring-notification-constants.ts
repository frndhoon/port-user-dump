const monitoringNotificationList = [
	{
		displayName: '접안 지연',
		codeValue: 'BERTHING_DELAY_NOTIFICATION',
		description: '그룹 내 선박이 접안 지연되는 경우 사전에 알립니다.',
	},
	{
		displayName: '출항 지연',
		codeValue: 'DEPARTURE_DELAY_NOTIFICATION',
		description: '그룹 내 선박이 출항 지연되는 경우 사전에 알립니다.',
	},
	{
		displayName: '선박 연결 불가',
		codeValue: 'VESSEL_CONNECTION_UNAVAILABLE_NOTIFICATION',
		description: '그룹 내 선박간 환적이 불가능한 상황이 발생할 때 이를 사전에 알립니다.',
	},
];

export { monitoringNotificationList };
