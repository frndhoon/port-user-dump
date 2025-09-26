'use client';

import { useState } from 'react';

import COLORS from '@/app/user/etc-setting/_constants/color.constant';
import { Close, Caret } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ColorSelectProps {
	selectedColor?: string;
	selectedCode?: string;
	selections?: Array<{ id: number; name?: string; code: string }>;
}

const ColorSelect = ({ selectedColor, selectedCode, selections = [] }: ColorSelectProps) => {
	const [isOpen, setIsOpen] = useState(true);

	return (
		<div className="border-stroke flex h-[4.1rem] w-fit items-center gap-[1.5rem] rounded-[1rem] border px-[1.6rem] py-[1rem]">
			<Select value={selectedCode}>
				<div className="flex items-center gap-[1rem]">
					{/* 색상 버튼 */}
					<Popover>
						<PopoverTrigger asChild>
							<Button
								variant="outline"
								className="h-[1.8rem] w-[1.8rem] rounded-full border border-[#000000]/10 p-0"
								style={{ backgroundColor: selectedColor }}
							/>
						</PopoverTrigger>
						<PopoverContent className="w-fit rounded-[0.8rem] border-none shadow-[0_0.4rem_1rem_rgba(0,0,0,0.15)]">
							<div className="grid grid-cols-10 gap-[0.1rem]">
								{COLORS.map(color => (
									<button
										className="bg-primary h-[3rem] w-[3rem] transition-all hover:scale-70"
										style={{ backgroundColor: color }}
										key={color}
										type="button"
									/>
								))}
							</div>
						</PopoverContent>
					</Popover>

					{/* 선사 및 항로 선택 */}
					<SelectTrigger className="text-17 hover:bg-accent items-center gap-[1rem] border-none px-[0.5rem] py-[1.5rem] font-medium shadow-none transition-all select-none focus-visible:ring-0 focus-visible:ring-offset-0 [&_svg:not(.caret-icon)]:hidden">
						<SelectValue placeholder="선택 없음" />
						<Caret className="caret-icon h-[1.1rem] w-[1.2rem] flex-shrink-0" />
					</SelectTrigger>
				</div>
				<SelectContent className="border-stroke w-[10rem] rounded-[1rem] data-[side=bottom]:translate-x-[-1rem] data-[side=bottom]:translate-y-[0.9rem] [&_[data-radix-select-viewport]]:flex [&_[data-radix-select-viewport]]:flex-col [&_[data-radix-select-viewport]]:items-center">
					{selections.map(selection => (
						<SelectItem
							className="text-17 flex w-[9rem] cursor-pointer items-center justify-center rounded-[0.8rem] p-[1rem] hover:bg-[#000000]/10 not-only:[&_svg]:hidden"
							key={selection.code}
							value={selection.code}
						>
							{selection.code}
						</SelectItem>
					))}
				</SelectContent>
			</Select>

			{/* 삭제 버튼 */}
			{selectedCode && (
				<button onClick={() => {}} className="rounded-full p-[0.5rem] transition-colors hover:bg-[#000000]/10" type="button">
					<Close className="h-[1rem] w-[1rem] text-gray-500" />
				</button>
			)}
		</div>
	);
};

export default ColorSelect;
