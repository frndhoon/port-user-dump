import COLORS from '@/app/user/etc-setting/_constants/color.constant';
import { Add } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useColorSettings } from '@/hooks/useColorSettings';
import * as etcSettingTypes from '@/types/etc-setting.types';

import VesselSizeColorSelect from './VesselSizeColorSelect';

/**
 * @component 선박 사이즈 범례 색상 설정 컴포넌트
 * @author 우정훈
 * @description 선박 사이즈 범례 색상 설정 컴포넌트입니다.
 * @param clientLegends - 선박 사이즈 범례 목록
 * @param setClientLegends - 선박 사이즈 범례 설정 함수
 * @param onAddLegend - 선박 사이즈 범례 추가 함수
 * @param unit - 단위
 * @param duplicateColorIds - 색상 중복 여부
 * @param duplicateRangeIds - 범위 중복 여부
 * @param rangeErrors - 범위 에러
 */

interface VesselSizeLegendColorSettingProps {
	clientLegends: etcSettingTypes.VesselSizeLegend[];
	setClientLegends: React.Dispatch<React.SetStateAction<etcSettingTypes.VesselSizeLegend[]>>;
	onAddLegend: () => void;
	unit: 'GT' | 'TEU';
	duplicateColorIds: number[];
	duplicateRangeIds: number[];
	rangeErrors: Record<number, string>;
}

const VesselSizeLegendColorSetting = ({
	clientLegends,
	setClientLegends,
	onAddLegend,
	unit,
	duplicateColorIds,
	duplicateRangeIds,
	rangeErrors,
}: VesselSizeLegendColorSettingProps) => {
	const { getColor, updateColor, isClient } = useColorSettings();

	// "그 외" 색상 변경 핸들러
	const handleDefaultColorChange = (color: string) => {
		updateColor('vesselSizeLegends', color);
	};

	return (
		<div className="flex flex-col gap-[1.5rem]">
			{/* 범례 색상 설정 */}
			<div className="flex flex-row flex-wrap gap-x-[3rem] gap-y-[1rem]">
				{clientLegends
					.sort((a, b) => a.sortOrder - b.sortOrder)
					.map(legend => {
						const hasColorDuplicate = duplicateColorIds.includes(legend.id);
						const hasRangeDuplicate = duplicateRangeIds.includes(legend.id);
						const rangeError = rangeErrors[legend.id] || '';

						return (
							<div key={legend.id} className="flex flex-col gap-[0.5rem]">
								<VesselSizeColorSelect
									legend={legend}
									setCurrentLegends={setClientLegends}
									currentLegends={clientLegends}
									hasColorDuplicate={hasColorDuplicate}
									hasRangeDuplicate={hasRangeDuplicate}
									rangeError={rangeError}
									unit={unit}
								/>
								{hasColorDuplicate && <p className="text-[1.4rem] text-[#EA6B78]">동일한 색상이 사용되고 있습니다.</p>}
								{hasRangeDuplicate && <p className="text-[1.4rem] text-[#EA6B78]">중복되는 설정값입니다.</p>}
								{rangeError && <p className="text-[1.4rem] text-[#EA6B78]">{rangeError}</p>}
							</div>
						);
					})}

				{/* 그 외 색상 설정 */}
				<div className="border-stroke flex h-[4.1rem] w-fit items-center gap-[1rem] rounded-[1rem] border px-[1.6rem] py-[1rem]">
					<Popover>
						<PopoverTrigger
							className="h-[1.8rem] w-[1.8rem] rounded-full border border-[#000000]/10 p-0"
							style={{ backgroundColor: isClient ? getColor('vesselSizeLegends') : '#509CCB' }}
						/>
						<PopoverContent className="w-fit rounded-[0.8rem] border-none shadow-[0_0.4rem_1rem_rgba(0,0,0,0.15)]">
							<div className="grid grid-cols-10 gap-[0.1rem]">
								{COLORS.map((color: string) => (
									<button
										className="bg-primary h-[3rem] w-[3rem] transition-all hover:scale-105"
										style={{ backgroundColor: color }}
										key={color}
										type="button"
										onClick={() => handleDefaultColorChange(color)}
									/>
								))}
							</div>
						</PopoverContent>
					</Popover>
					<p className="text-17 font-medium">그 외</p>
				</div>

				{/* 추가 버튼 */}
				<Button variant="defaultOutline" size="colorAdd" onClick={() => onAddLegend()}>
					<Add className="size-[1.7rem]" />
				</Button>
			</div>
		</div>
	);
};

export default VesselSizeLegendColorSetting;
