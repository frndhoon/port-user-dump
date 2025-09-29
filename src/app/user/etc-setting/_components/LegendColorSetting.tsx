import { useMemo } from 'react';

import LegendColorSelect from '@/app/user/etc-setting/_components/LegendColorSelect';
import COLORS from '@/app/user/etc-setting/_constants/color.constant';
import { checkRouteLegendDuplicates, checkShippingLegendDuplicates } from '@/app/user/etc-setting/_utils/legend-utils';
import { Add } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useColorSettings } from '@/hooks/useColorSettings';
import * as etcSettingTypes from '@/types/etc-setting.types';

/**
 * @component 범례 색상 설정 컴포넌트
 * @author 우정훈
 * @description 범례 색상 설정 컴포넌트입니다.
 * 색상 설정 목록들을 관리합니다.
 * @param items - 항목 목록
 * @param clientLegends - 현재 범례 목록
 * @param setClientLegends - 현재 범례 목록 설정 함수
 * @param onAddLegend - 범례 추가 함수
 * @param legendType - 범례 타입
 * @param colorStorageKey - 색상 저장 키
 */

interface LegendColorSettingProps<T extends etcSettingTypes.LegendData, TItem extends etcSettingTypes.LegendItem> {
	items: TItem[];
	clientLegends: T[];
	setClientLegends: React.Dispatch<React.SetStateAction<T[]>>;
	onAddLegend: (item?: TItem) => void;
	legendType: etcSettingTypes.LegendType;
	colorStorageKey: 'routeLegends' | 'shippingLegends';
}

const LegendColorSetting = <T extends etcSettingTypes.LegendData, TItem extends etcSettingTypes.LegendItem>({
	items,
	clientLegends,
	setClientLegends,
	onAddLegend,
	legendType,
	colorStorageKey,
}: LegendColorSettingProps<T, TItem>) => {
	const { getColor, updateColor, isClient } = useColorSettings();

	// 중복 검사 로직
	const duplicateInfo = useMemo(() => {
		if (legendType === 'route') {
			return checkRouteLegendDuplicates(clientLegends as etcSettingTypes.RouteLegend[]);
		} else {
			return checkShippingLegendDuplicates(clientLegends as etcSettingTypes.ShippingLegend[]);
		}
	}, [clientLegends, legendType]);

	// "그 외" 색상 변경 핸들러
	const handleDefaultColorChange = (color: string) => {
		updateColor(colorStorageKey, color);
	};

	return (
		<div className="flex flex-col gap-[1.5rem]">
			{/* 범례 색상 설정 */}
			<div className="flex flex-row flex-wrap gap-x-[3rem] gap-y-[1rem]">
				{clientLegends
					.sort((a, b) => a.sortOrder - b.sortOrder)
					.map(legend => {
						const hasColorDuplicate = duplicateInfo.duplicateColorIds.includes(legend.id);
						const hasCodeDuplicate = duplicateInfo.duplicateCodeIds.includes(legend.id);

						const selectedCode =
							legendType === 'route'
								? (legend as etcSettingTypes.RouteLegend).route?.code
								: (legend as etcSettingTypes.ShippingLegend).shipping?.code;

						return (
							<div key={legend.id} className="flex flex-col gap-[0.5rem]">
								<LegendColorSelect
									legendId={legend.id}
									selectedColor={legend.color}
									selectedCode={selectedCode}
									items={items}
									setCurrentLegends={setClientLegends}
									currentLegends={clientLegends}
									hasColorDuplicate={hasColorDuplicate}
									hasCodeDuplicate={hasCodeDuplicate}
									legendType={legendType}
								/>
								{hasColorDuplicate && !hasCodeDuplicate && <p className="text-[1.4rem] text-[#EA6B78]">동일한 색상이 사용되고 있습니다.</p>}
								{!hasColorDuplicate && hasCodeDuplicate && <p className="text-[1.4rem] text-[#EA6B78]">동일한 항로가 선택되었습니다.</p>}
							</div>
						);
					})}

				{/* 그 외 색상 설정 */}
				<div className="border-stroke flex h-[4.1rem] w-fit items-center gap-[1rem] rounded-[1rem] border px-[1.6rem] py-[1rem]">
					<Popover>
						<PopoverTrigger
							className="h-[1.8rem] w-[1.8rem] rounded-full border border-[#000000]/10 p-0"
							style={{ backgroundColor: isClient ? getColor(colorStorageKey) : '#000000' }}
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

export default LegendColorSetting;
