import { DragAndDropPoint } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import * as etcSettingTypes from '@/types/etc-setting.types';

import TerminalFilterSetting from './TerminalFilterSetting';
import { usePortSectionDrag } from '../_hooks/usePortSectionDrag';

/**
 * @component 터미널 설정 포트 섹션 컴포넌트
 * @author 우정훈
 * @description 터미널 설정 포트 섹션 컴포넌트입니다.
 * DND로 북항과 신항의 index를 변경할 수 있습니다.
 * @param portSection - 포트 섹션
 * @param sectionIndex - 섹션 인덱스
 * @param movePortSection - 포트 섹션 이동 함수
 * @param terminalFilterSettings - 터미널 필터 설정
 * @param onToggleTerminalFilter - 터미널 필터 토글 함수
 * @param moveTerminalFilter - 터미널 필터 이동 함수
 */

interface PortSectionProps {
	portSection: { portCode: string; name: string };
	sectionIndex: number;
	movePortSection: (dragIndex: number, hoverIndex: number) => void;
	terminalFilterSettings: etcSettingTypes.TerminalFilterSetting[];
	onToggleTerminalFilter: (terminalId: number) => void;
	moveTerminalFilter: (dragIndex: number, hoverIndex: number, portCode: string) => void;
}

const PortSection = ({ portSection, sectionIndex, movePortSection, terminalFilterSettings, onToggleTerminalFilter, moveTerminalFilter }: PortSectionProps) => {
	const { ref } = usePortSectionDrag({
		portCode: portSection.portCode,
		sectionIndex,
		movePortSection,
	});

	return (
		<div ref={ref} className={cn('flex flex-col gap-[1rem]')}>
			<Button
				variant="defaultOutline"
				className="h-[4.1rem] w-[23.1rem] cursor-grab justify-between rounded-[1rem] border-none py-[1rem] has-[>svg]:px-[1.6rem]"
			>
				<p className="text-17 text-primary">{portSection.name}</p>
				<DragAndDropPoint className="size-[1.3rem]" />
			</Button>
			{terminalFilterSettings.map((terminal, index) => (
				<TerminalFilterSetting
					key={terminal.id}
					order={index + 1}
					terminalFilterSetting={terminal}
					onToggleTerminalFilter={onToggleTerminalFilter}
					index={index}
					portCode={portSection.portCode}
					moveTerminalFilter={moveTerminalFilter}
				/>
			))}
		</div>
	);
};
export default PortSection;
