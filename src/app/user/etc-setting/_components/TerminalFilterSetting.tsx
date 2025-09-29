import { DragAndDropLine } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import * as etcSettingTypes from '@/types/etc-setting.types';

import { useTerminalFilterDrag } from '../_hooks/useTerminalFilterDrag';

/**
 * @component 터미널 필터 설정 컴포넌트
 * @author 우정훈
 * @description 터미널 필터 설정 컴포넌트입니다.
 * DND로 각 항목 내부의 index를 변경할 수 있습니다.
 * @param order - 순서
 * @param terminalFilterSetting - 터미널 필터 설정
 * @param onToggleTerminalFilter - 터미널 필터 토글 함수
 * @param index - 인덱스
 * @param portCode - 포트 코드
 * @param moveTerminalFilter - 터미널 필터 이동 함수
 */

interface TerminalFilterSettingProps {
	order: number;
	terminalFilterSetting: etcSettingTypes.TerminalFilterSetting;
	onToggleTerminalFilter: (terminalId: number) => void;
	index: number;
	portCode: string;
	moveTerminalFilter: (dragIndex: number, hoverIndex: number, portCode: string) => void;
}

const TerminalFilterSetting = ({ order, terminalFilterSetting, onToggleTerminalFilter, index, portCode, moveTerminalFilter }: TerminalFilterSettingProps) => {
	const { ref, isDragging } = useTerminalFilterDrag({
		terminalId: terminalFilterSetting.id,
		index,
		portCode,
		moveTerminalFilter,
	});

	return (
		<div ref={ref} className={`flex h-[4.1rem] w-[21.8rem] flex-row items-center gap-[1.5rem] ${isDragging ? 'opacity-50' : 'opacity-100'}`}>
			<p className="text-17 text-[#979797]">{order}</p>
			<div className="flex h-[4.1rem] w-[16.6rem] flex-row items-center justify-between rounded-[1rem] bg-[#f2f2f2] px-[1.6rem] py-[1rem]">
				<p className="text-17">{terminalFilterSetting?.terminal.name}</p>
				<Checkbox
					className="size-[1.6rem] rounded-[0.3rem] border-[#bcbcbc] bg-[#ffffff] data-[state=checked]:font-semibold"
					checked={terminalFilterSetting?.activeYn}
					onCheckedChange={() => onToggleTerminalFilter(terminalFilterSetting?.id)}
				/>
			</div>
			<Button variant="ghost" className="cursor-grab rounded-full has-[>svg]:px-[0.4rem] has-[>svg]:py-[0.2rem]">
				<DragAndDropLine className="size-[1.3rem]" />
			</Button>
		</div>
	);
};

export default TerminalFilterSetting;
