import { useLegendSearchInput } from '@/app/user/etc-setting/_hooks/useLegendSearchInput';
import { highlightSearchText } from '@/app/user/etc-setting/_utils/legend-utils';
import { ReadingGlasses } from '@/components/icons';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import * as etcSettingTypes from '@/types/etc-setting.types';

/**
 * @component 범례 검색 입력 컴포넌트
 * @author 우정훈
 * @description 범례 검색 입력 컴포넌트입니다.
 * @param items - 항목 목록
 * @param onItemSelect - 항목 선택 함수
 * @param clientLegends - 현재 범례 목록
 * @param legendType - 범례 타입
 * @param placeholder - 검색 플레이스홀더
 */

interface LegendSearchInputProps<T extends etcSettingTypes.LegendData, TItem extends etcSettingTypes.LegendItem> {
	items: TItem[];
	onItemSelect: (item?: TItem) => void;
	clientLegends?: T[];
	legendType: etcSettingTypes.LegendType;
	placeholder: string;
}

const LegendSearchInput = <T extends etcSettingTypes.LegendData, TItem extends etcSettingTypes.LegendItem>({
	items,
	onItemSelect,
	clientLegends = [],
	legendType,
	placeholder,
}: LegendSearchInputProps<T, TItem>) => {
	const {
		inputValue,
		searchValue,
		showDropdown,
		isInputFocus,
		filteredItems,
		handleSearchChange,
		handleItemSelect,
		getDisplayText,
		handleInputFocus,
		handleInputBlur,
	} = useLegendSearchInput({
		items,
		onItemSelect,
		clientLegends,
		legendType,
	});

	return (
		<div className="border-stroke relative flex h-[4rem] w-[28rem] flex-row items-center gap-[1rem] border-b">
			<ReadingGlasses className={cn('h-[2rem] w-[2rem] flex-shrink-0 text-[#9F9F9F] transition-all', isInputFocus && 'text-primary')} />
			<Input
				variant="etc_setting"
				placeholder={placeholder}
				value={inputValue}
				onChange={e => handleSearchChange(e.target.value)}
				onFocus={handleInputFocus}
				onBlur={handleInputBlur}
				className="select-none"
			/>

			{/* 드롭다운 리스트 */}
			{showDropdown && searchValue.length > 0 && (
				<div className="border-stroke animate-in fade-in-0 zoom-in-95 slide-in-from-top-2 absolute top-[4.5rem] left-0 z-50 max-h-[23.4rem] w-full overflow-y-auto rounded-[1rem] border bg-white shadow-[0_0.4rem_0.8rem_rgba(0,0,0,0.08)]">
					{filteredItems.length > 0 ? (
						filteredItems.map(item => (
							<button
								key={item.id}
								className="hover:bg-accent flex h-[4.1rem] w-full items-center gap-[1rem] p-[1rem] text-left"
								onMouseDown={e => {
									e.preventDefault();
									handleItemSelect(item);
								}}
							>
								<span className="text-17 px-[1.6rem] py-[1rem]">{highlightSearchText(getDisplayText(item), searchValue)}</span>
							</button>
						))
					) : (
						<div className="flex h-[4.1rem] w-full items-center justify-center p-[1rem]">
							<span className="text-17 text-gray-500">검색 결과가 없습니다</span>
						</div>
					)}
				</div>
			)}
		</div>
	);
};

export default LegendSearchInput;
