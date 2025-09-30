import COLORS from '@/app/user/etc-setting/_constants/color.constant';
import { useVesselSizeColor } from '@/app/user/etc-setting/_hooks/useVesselSizeColor';
import { useVesselSizeRangeEdit } from '@/app/user/etc-setting/_hooks/useVesselSizeRangeEdit';
import { Close } from '@/components/icons';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import * as etcSettingTypes from '@/types/etc-setting.types';

/**
 * @component 선박 사이즈 색상 선택 컴포넌트
 * @author 우정훈
 * @description 선박 사이즈 색상 선택 컴포넌트입니다.
 * @param legend - 선박 사이즈 범례
 * @param setCurrentLegends - 선박 사이즈 범례 설정 함수
 * @param currentLegends - 선박 사이즈 범례 목록
 * @param hasColorDuplicate - 색상 중복 여부
 * @param hasRangeDuplicate - 범위 중복 여부
 * @param rangeError - 범위 에러
 * @param unit - 단위
 */

interface VesselSizeColorSelectProps {
	legend: etcSettingTypes.VesselSizeLegend;
	setCurrentLegends: React.Dispatch<React.SetStateAction<etcSettingTypes.VesselSizeLegend[]>>;
	currentLegends: etcSettingTypes.VesselSizeLegend[];
	hasColorDuplicate?: boolean;
	hasRangeDuplicate?: boolean;
	rangeError?: string;
	unit: 'GT' | 'TEU';
}

const VesselSizeColorSelect = ({
	legend,
	setCurrentLegends,
	currentLegends,
	hasColorDuplicate,
	hasRangeDuplicate,
	rangeError,
	unit,
}: VesselSizeColorSelectProps) => {
	const { selectedColorState, handleColorChange, open, setOpen } = useVesselSizeColor({
		legend,
		currentLegends,
		setCurrentLegends,
	});

	const {
		isEditingRange,
		tempMinValue,
		tempMaxValue,
		rangeInputRef,
		getFormattedMinValue,
		getFormattedMaxValue,
		handleRangeEditStart,
		handleMinValueChange,
		handleMaxValueChange,
		handleKeyDown,
		handleDelete,
	} = useVesselSizeRangeEdit({
		legend,
		currentLegends,
		setCurrentLegends,
		unit,
	});

	return (
		<div className="flex flex-col gap-[0.5rem]">
			<div
				className={cn(
					'border-stroke flex h-[4.1rem] w-fit cursor-pointer items-center gap-[1rem] rounded-[1rem] border bg-white px-[1.6rem] py-[1rem] transition-colors hover:bg-gray-50',
					(hasColorDuplicate || hasRangeDuplicate || rangeError) && 'border-[#EA6B78]',
				)}
				onClick={() => {
					if (!isEditingRange) {
						handleRangeEditStart();
					}
				}}
			>
				<div className="flex items-center gap-[1rem]">
					{/* 색상 선택 버튼 */}
					<Popover open={open} onOpenChange={setOpen}>
						<PopoverTrigger
							className="h-[1.8rem] w-[1.8rem] rounded-full border border-[#000000]/10 p-0"
							style={{ backgroundColor: selectedColorState }}
							onClick={e => e.stopPropagation()}
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

					{/* 범위 입력 */}
					<div className="text-17 flex items-center gap-[0.5rem]">
						{isEditingRange ? (
							<div ref={rangeInputRef} className="flex items-center gap-[0.5rem]">
								<input
									type="text"
									value={tempMinValue}
									onChange={handleMinValueChange}
									onKeyDown={handleKeyDown}
									className="max-w-[8rem] min-w-[5rem] rounded-[0.5rem] border border-gray-300 px-[0.8rem] py-[0.4rem] text-center transition-all focus:outline-none"
									placeholder="최소"
									style={{ width: `${Math.max(tempMinValue.length * 0.8 + 2, 7)}rem` }}
								/>
								<span className="text-[1.4rem]">~</span>
								<input
									type="text"
									value={tempMaxValue}
									onChange={handleMaxValueChange}
									onKeyDown={handleKeyDown}
									className="max-w-[8rem] min-w-[5rem] rounded-[0.5rem] border border-gray-300 px-[0.8rem] py-[0.4rem] text-center transition-all focus:outline-none"
									placeholder="최대"
									style={{ width: `${Math.max(tempMaxValue.length * 0.8 + 2, 7)}rem` }}
								/>
							</div>
						) : (
							<>
								{getFormattedMinValue()} ~ {getFormattedMaxValue()}
							</>
						)}
					</div>
				</div>

				{/* 단위 표시 */}
				<p className="text-17 font-medium">{unit}</p>

				{/* 삭제 버튼 */}
				<button
					onClick={e => {
						e.stopPropagation();
						handleDelete();
					}}
					className="rounded-full p-[0.5rem] transition-colors hover:bg-[#000000]/10"
					type="button"
				>
					<Close className="h-[1rem] w-[1rem] text-gray-500" />
				</button>
			</div>
		</div>
	);
};

export default VesselSizeColorSelect;
