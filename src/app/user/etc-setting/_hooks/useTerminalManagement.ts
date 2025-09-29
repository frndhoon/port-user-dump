import { useState, useEffect, useMemo, useCallback } from 'react';

import * as etcSettingTypes from '@/types/etc-setting.types';

interface UseTerminalManagementProps {
	terminalFilterSettings?: etcSettingTypes.GetTerminalFilterSettingsResponse | null;
}

export const useTerminalManagement = ({ terminalFilterSettings }: UseTerminalManagementProps) => {
	const [clientTerminalFilterSettings, setClientTerminalFilterSettings] = useState<etcSettingTypes.TerminalFilterSetting[]>([]);

	const [portSections, setPortSections] = useState<{ portCode: string; name: string }[]>([
		{ portCode: 'BNP', name: '신항' },
		{ portCode: 'PUS', name: '북항' },
	]);

	// terminalFilterSettings가 변경되면 상태 초기화
	useEffect(() => {
		if (!terminalFilterSettings) {
			return;
		}

		setClientTerminalFilterSettings(terminalFilterSettings.terminalFilterSettings);

		// sortOrder를 기반으로 portSections 순서 결정
		const portOrderMap = new Map<string, number>();

		for (const terminal of terminalFilterSettings.terminalFilterSettings) {
			const currentMin = portOrderMap.get(terminal.portCode);
			if (currentMin === undefined) {
				portOrderMap.set(terminal.portCode, terminal.sortOrder);
			} else if (terminal.sortOrder < currentMin) {
				portOrderMap.set(terminal.portCode, terminal.sortOrder);
			}
		}

		// sortOrder가 작은 포트가 먼저 오도록 정렬
		const sortedPorts = [
			{ portCode: 'BNP', name: '신항' },
			{ portCode: 'PUS', name: '북항' },
		].sort((a, b) => {
			const aOrder = portOrderMap.get(a.portCode) ?? Infinity;
			const bOrder = portOrderMap.get(b.portCode) ?? Infinity;
			return aOrder - bOrder;
		});

		setPortSections(sortedPorts);
	}, [terminalFilterSettings]);

	// 포트별로 터미널 필터 설정 분리
	const bnpTerminalFilterSettings = useMemo(
		() => clientTerminalFilterSettings.filter(terminal => terminal.portCode === 'BNP').sort((a, b) => a.sortOrder - b.sortOrder),
		[clientTerminalFilterSettings],
	);

	const pusTerminalFilterSettings = useMemo(
		() => clientTerminalFilterSettings.filter(terminal => terminal.portCode === 'PUS').sort((a, b) => a.sortOrder - b.sortOrder),
		[clientTerminalFilterSettings],
	);

	// 드래그 앤 드롭 핸들러
	const moveTerminalFilter = useCallback((dragIndex: number, hoverIndex: number, portCode: string) => {
		setClientTerminalFilterSettings(prev => {
			const filtered = prev.filter(terminal => terminal.portCode === portCode);
			const otherTerminals = prev.filter(terminal => terminal.portCode !== portCode);

			const draggedItem = filtered[dragIndex];
			const newFiltered = [...filtered];
			newFiltered.splice(dragIndex, 1);
			newFiltered.splice(hoverIndex, 0, draggedItem);

			// sortOrder 업데이트
			const updatedFiltered = newFiltered.map((terminal, index) => ({
				...terminal,
				sortOrder: index + 1,
			}));

			return [...otherTerminals, ...updatedFiltered];
		});
	}, []);

	// 포트 섹션 순서 변경 핸들러
	const movePortSection = useCallback((dragIndex: number, hoverIndex: number) => {
		setPortSections(prev => {
			const newSections = [...prev];
			const draggedSection = newSections[dragIndex];
			newSections.splice(dragIndex, 1);
			newSections.splice(hoverIndex, 0, draggedSection);

			// 포트 순서가 바뀌면 터미널 sortOrder도 업데이트
			setClientTerminalFilterSettings(prevTerminals => {
				const updatedTerminals = prevTerminals.map(terminal => {
					const portIndex = newSections.findIndex(section => section.portCode === terminal.portCode);
					const samePortTerminals = prevTerminals.filter(t => t.portCode === terminal.portCode);
					const terminalIndexInPort = samePortTerminals.sort((a, b) => a.sortOrder - b.sortOrder).findIndex(t => t.id === terminal.id);

					// 포트 인덱스에 따라 sortOrder 기준값 설정 (0번째 포트: 10부터, 1번째 포트: 20부터)
					const baseOrder = portIndex * 10 + 10;
					const newSortOrder = baseOrder + terminalIndexInPort;

					return {
						...terminal,
						sortOrder: newSortOrder,
					};
				});

				return updatedTerminals;
			});

			return newSections;
		});
	}, []);

	// 터미널 필터 토글 핸들러
	const handleToggleTerminalFilter = useCallback((terminalId: number) => {
		setClientTerminalFilterSettings(prev => prev.map(terminal => (terminal.id === terminalId ? { ...terminal, activeYn: !terminal.activeYn } : terminal)));
	}, []);

	return {
		// 상태
		terminalFilterSettings: clientTerminalFilterSettings,
		portSections,
		bnpTerminalFilterSettings,
		pusTerminalFilterSettings,

		// 핸들러
		moveTerminalFilter,
		movePortSection,
		handleToggleTerminalFilter,
	};
};
