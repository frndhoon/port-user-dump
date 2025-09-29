import COLORS from '@/app/user/etc-setting/_constants/color.constant';
import { useLegendCode } from '@/app/user/etc-setting/_hooks/useLegendCode';
import { useLegendColor } from '@/app/user/etc-setting/_hooks/useLegendColor';
import { Close, Caret } from '@/components/icons';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import * as etcSettingTypes from '@/types/etc-setting.types';

/**
 * @component 범례 색상 선택 컴포넌트
 * @author 우정훈
 * @description 범례 색상 선택 컴포넌트입니다.
 * 해당 컴포넌트에서는 색상만 선택 가능합니다.
 * @param selectedColor - 선택된 색상
 * @param selectedCode - 선택된 코드
 * @param items - 항목 목록
 * @param setCurrentLegends - 현재 범례 목록 설정 함수
 * @param currentLegends - 현재 범례 목록
 * @param legendId - 범례 ID
 * @param hasColorDuplicate - 색상 중복 여부
 * @param hasCodeDuplicate - 코드 중복 여부
 * @param legendType - 범례 타입
 */

interface LegendColorSelectProps<T extends etcSettingTypes.LegendData, TItem extends etcSettingTypes.LegendItem> {
	selectedColor?: string;
	selectedCode?: string;
	items: TItem[];
	setCurrentLegends: React.Dispatch<React.SetStateAction<T[]>>;
	currentLegends: T[];
	legendId: number;
	hasColorDuplicate?: boolean;
	hasCodeDuplicate?: boolean;
	legendType: etcSettingTypes.LegendType;
}

const LegendColorSelect = <T extends etcSettingTypes.LegendData, TItem extends etcSettingTypes.LegendItem>({
	selectedColor = '#000000',
	selectedCode,
	items,
	setCurrentLegends,
	currentLegends,
	legendId,
	hasColorDuplicate,
	hasCodeDuplicate,
	legendType,
}: LegendColorSelectProps<T, TItem>) => {
	const { selectedColorState, open, setOpen, handleColorChange } = useLegendColor({
		selectedColor,
		currentLegends,
		setCurrentLegends,
		legendId,
	});

	const { usedCodes, uniqueItems, handleCodeChange, handleDelete } = useLegendCode({
		items,
		currentLegends,
		setCurrentLegends,
		legendId,
		legendType,
	});

	return (
		<div
			className={cn(
				'border-stroke flex h-[4.1rem] w-fit items-center gap-[1.5rem] rounded-[1rem] border px-[1.6rem] py-[1rem]',
				(hasColorDuplicate || hasCodeDuplicate) && 'border-[#EA6B78]',
			)}
		>
			<Select value={selectedCode || undefined} onValueChange={handleCodeChange}>
				<div className="flex items-center gap-[1rem]">
					{/* 색상 선택 버튼 */}
					<Popover open={open} onOpenChange={setOpen}>
						<PopoverTrigger
							className="h-[1.8rem] w-[1.8rem] rounded-full border border-[#000000]/10 p-0"
							style={{ backgroundColor: selectedColorState }}
						/>
						<PopoverContent className="w-fit rounded-[0.8rem] border-none shadow-[0_0.4rem_1rem_rgba(0,0,0,0.15)]">
							<div className="grid grid-cols-10 gap-[0.1rem]">
								{COLORS.map(color => {
									return (
										<button
											className={'bg-primary h-[3rem] w-[3rem] transition-all hover:scale-105'}
											style={{ backgroundColor: color }}
											key={color}
											type="button"
											onClick={() => handleColorChange(color)}
										/>
									);
								})}
							</div>
						</PopoverContent>
					</Popover>

					{/* 항목 선택 */}
					<SelectTrigger className="text-17 hover:bg-accent items-center gap-[1rem] border-none px-[0.5rem] py-[1.5rem] font-medium shadow-none transition-all select-none focus-visible:ring-0 focus-visible:ring-offset-0 [&_svg:not(.caret-icon)]:hidden">
						<SelectValue placeholder="선택 없음" />
						<Caret className="caret-icon h-[1.1rem] w-[1.2rem] flex-shrink-0" />
					</SelectTrigger>
				</div>
				<SelectContent className="border-stroke h-[30rem] w-[10rem] rounded-[1rem] data-[side=bottom]:translate-x-[-1rem] data-[side=bottom]:translate-y-[0.9rem] [&_[data-radix-select-viewport]]:flex [&_[data-radix-select-viewport]]:flex-col [&_[data-radix-select-viewport]]:items-center">
					{uniqueItems.map(item => {
						const isUsed = usedCodes.includes(item.code);
						return (
							<SelectItem
								className={cn(
									'text-17 flex w-[9rem] cursor-pointer items-center justify-center rounded-[0.8rem] p-[1rem] hover:bg-[#000000]/10 not-only:[&_svg]:hidden',
									isUsed && 'cursor-not-allowed opacity-30',
								)}
								key={item.id}
								value={item.code}
								disabled={isUsed}
							>
								{item.code}
							</SelectItem>
						);
					})}
				</SelectContent>
			</Select>

			{/* 삭제 버튼 */}
			<button onClick={handleDelete} className="rounded-full p-[0.5rem] transition-colors hover:bg-[#000000]/10" type="button">
				<Close className="h-[1rem] w-[1rem] text-gray-500" />
			</button>
		</div>
	);
};

export default LegendColorSelect;
