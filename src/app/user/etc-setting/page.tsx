'use client';
import { useState } from 'react';

import Breadcrumb from '@/app/user/_components/Breadcrumb';
import ColorSelect from '@/app/user/etc-setting/_components/ColorSelect';
import COLORS from '@/app/user/etc-setting/_constants/color.constant';
import { Add, Error, ReadingGlasses } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { shippingLegends } from '@/mocks/get-legend-color.json';

const EtcSettingPage = () => {
	const [isInputFocus, setIsInputFocus] = useState(false);
	const [searchValue, setSearchValue] = useState('');
	const [showDropdown, setShowDropdown] = useState(false);

	const shippingCompanies = [
		{ id: 1, name: 'HMM', code: 'HMM' },
		{ id: 2, name: 'CSC', code: 'CSC' },
		{ id: 3, name: 'HJS', code: 'HJS' },
		{ id: 4, name: 'MAE', code: 'MAE' },
		{ id: 5, name: 'CSA', code: 'CSA' },
		{ id: 6, name: 'ZIM', code: 'ZIM' },
		{ id: 7, name: 'ONE', code: 'ONE' },
		{ id: 8, name: 'KFC', code: 'KFC' },
		{ id: 9, name: 'APL', code: 'APL' },
	];

	const filteredCompanies = shippingCompanies.filter(company => {
		const searchTerm = searchValue.toLowerCase();

		const companyCode = company.code.toLowerCase();

		return companyCode.includes(searchTerm);
	});

	const highlightSearchText = (text: string, searchValue: string) => {
		const searchIndex = text.toLowerCase().indexOf(searchValue.toLowerCase());

		const beforeText = text.slice(0, searchIndex);
		const matchText = text.slice(searchIndex, searchIndex + searchValue.length);
		const afterText = text.slice(searchIndex + searchValue.length);

		return (
			<>
				{beforeText}
				<span className="text-correct">{matchText}</span>
				{afterText}
			</>
		);
	};

	const handleCompanySelect = (company: { id: number; name: string; code: string }) => {
		setSearchValue(company.name);
		setShowDropdown(false);
	};

	return (
		<div id="etc-setting">
			{/* 상단 메뉴 */}
			<div className="flex flex-row items-center justify-between">
				<Breadcrumb topMenuTitle="기타 설정" sideMenuTitle="개인화 설정" />
			</div>
			<div className="flex flex-row rounded-[1.5rem] bg-white p-[4rem]">
				{/* 부제 */}
				<div className="flex h-[4.1rem] w-[25rem] flex-shrink-0 flex-row items-center gap-[1rem]">
					<p className="text-25 font-bold">색상 설정</p>
					<Error className="text-primary" />
				</div>

				{/* 각 선택 영역별 색상 설정 */}
				<div className="flex flex-row gap-[3rem] pr-[70rem]">
					<div className="flex flex-col gap-[1rem]">
						<p className="text-17 font-bold">선사</p>
						<div className="flex flex-col gap-[0.5rem]">
							<p className="bg-sub text-primary flex h-[2.3rem] w-[23rem] items-center justify-baseline rounded-[0.4rem] p-[1rem] font-semibold">
								선박 모니터링
							</p>
							<p className="bg-sub text-primary flex h-[2.3rem] w-[23rem] items-center justify-baseline rounded-[0.4rem] p-[1rem] font-semibold">
								선석 스케줄(G)
							</p>
						</div>
					</div>
					<div className="flex flex-col gap-[1.5rem]">
						<div className="border-stroke relative flex h-[4rem] w-[28rem] flex-row items-center gap-[1rem] border-b">
							<ReadingGlasses className={cn('h-[2rem] w-[2rem] flex-shrink-0 text-[#9F9F9F] transition-all', isInputFocus && 'text-primary')} />
							<Input
								variant="etc_setting"
								placeholder="선사명 검색"
								value={searchValue}
								onChange={e => {
									setSearchValue(e.target.value);
									setShowDropdown(true);
								}}
								onFocus={() => {
									setIsInputFocus(true);
									setShowDropdown(true);
								}}
								onBlur={() => {
									setIsInputFocus(false);
									setShowDropdown(false);
								}}
								className="select-none"
							/>

							{/* 드롭다운 리스트 */}
							{showDropdown && filteredCompanies.length > 0 && (
								<div className="border-stroke animate-in fade-in-0 zoom-in-95 slide-in-from-top-2 absolute top-[4.5rem] left-0 z-50 max-h-[23.4rem] w-full overflow-y-auto rounded-[1rem] border bg-white shadow-[0_0.4rem_0.8rem_rgba(0,0,0,0.08)]">
									{filteredCompanies.map(company => (
										<button
											key={company.id}
											className="hover:bg-accent flex h-[4.1rem] w-full items-center gap-[1rem] p-[1rem] text-left"
											onClick={() => handleCompanySelect(company)}
										>
											<span className="text-17 px-[1.6rem] py-[1rem]">{highlightSearchText(company.name, searchValue)}</span>
										</button>
									))}
								</div>
							)}
						</div>
						<div className="flex flex-row flex-wrap gap-x-[3rem] gap-y-[1rem]">
							{shippingLegends
								.sort((a, b) => a.sortOrder - b.sortOrder)
								.map(legend => (
									<div key={legend.id}>
										<ColorSelect
											key={legend.id}
											selectedColor={legend.color}
											selectedCode={legend.shipping.code}
											selections={shippingCompanies}
										/>
									</div>
								))}
							{/* 그 외 (localStorage + zustand 저장) */}
							<div className="border-stroke flex h-[4.1rem] w-fit items-center gap-[1rem] rounded-[1rem] border px-[1.6rem] py-[1rem]">
								<Popover>
									<PopoverTrigger asChild>
										<Button
											variant="outline"
											className="h-[1.8rem] w-[1.8rem] rounded-full border border-[#000000]/10 p-0"
											style={{ backgroundColor: '#000000' }}
										/>
									</PopoverTrigger>
									<PopoverContent className="w-fit rounded-[0.8rem] border-none shadow-[0_0.4rem_1rem_rgba(0,0,0,0.15)]">
										<div className="grid grid-cols-10 gap-[0.1rem]">
											{COLORS.map((color: string) => (
												<button className="bg-primary h-[3rem] w-[3rem]" style={{ backgroundColor: color }} key={color} type="button" />
											))}
										</div>
									</PopoverContent>
								</Popover>
								<p className="text-17 font-medium">그 외</p>
							</div>

							{/* 추가 버튼 */}
							<Button variant="defaultOutline" size="colorAdd">
								<Add className="size-[1.7rem]" />
							</Button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default EtcSettingPage;
