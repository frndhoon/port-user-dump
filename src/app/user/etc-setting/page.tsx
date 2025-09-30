'use client';

import { toast } from 'sonner';

import { useGetEtcSetting, useGetShippingCompanies, useGetRoutes, useGetTerminalFilterSettings, useSaveEtcSetting } from '@/api/tanstack-query/useEtcSetting';
import Breadcrumb from '@/app/user/_components/Breadcrumb';
import LegendColorSetting from '@/app/user/etc-setting/_components/LegendColorSetting';
import LegendSearchInput from '@/app/user/etc-setting/_components/LegendSearchInput';
import PortSection from '@/app/user/etc-setting/_components/PortSection';
import VesselSizeLegendColorSetting from '@/app/user/etc-setting/_components/VesselSizeLegendColorSetting';
import { useEtcSettingValidation } from '@/app/user/etc-setting/_hooks/useEtcSettingValidation';
import { useLegendManagement } from '@/app/user/etc-setting/_hooks/useLegendManagement';
import { useTerminalManagement } from '@/app/user/etc-setting/_hooks/useTerminalManagement';
import { useUniqueData } from '@/app/user/etc-setting/_hooks/useUniqueData';
import { Error } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { VesselLoader } from '@/components/VesselLoader';

const EtcSettingPage = () => {
	const { data: etcSetting, isLoading: isEtcSettingLoading, isError: isEtcSettingError } = useGetEtcSetting();
	const { data: shippingCompanies, isError: isShippingCompaniesError } = useGetShippingCompanies();
	const { data: routes, isError: isRoutesError } = useGetRoutes();
	const { data: terminalFilterSettings, isLoading: isTerminalFilterSettingsLoading, isError: isTerminalFilterSettingsError } = useGetTerminalFilterSettings();

	const isLoading = isEtcSettingLoading || isTerminalFilterSettingsLoading;
	const hasError = isEtcSettingError || isShippingCompaniesError || isRoutesError || isTerminalFilterSettingsError;

	const { uniqueShippingCompanies, uniqueRoutes } = useUniqueData({
		shippingCompanies: hasError ? { shippingCompanies: [] } : shippingCompanies,
		routes: hasError ? { routes: [] } : routes,
	});

	// 범례 관리 - 에러가 있으면 빈 데이터로 초기화
	const {
		clientShippingLegends,
		clientRouteLegends,
		clientVesselSizeLegends,
		clientVesselSizeLegendsTEU,
		setClientShippingLegends,
		setClientRouteLegends,
		setClientVesselSizeLegendsTEU,
		handleAddShippingLegend,
		handleAddRouteLegend,
		handleAddVesselSizeLegendTEU,
	} = useLegendManagement({ etcSetting: hasError ? null : etcSetting });

	const {
		terminalFilterSettings: clientTerminalFilterSettings,
		portSections,
		bnpTerminalFilterSettings,
		pusTerminalFilterSettings,
		moveTerminalFilter,
		movePortSection,
		handleToggleTerminalFilter,
	} = useTerminalManagement({ terminalFilterSettings: hasError ? null : terminalFilterSettings });

	// 유효성 검증
	const validation = useEtcSettingValidation({
		shippingLegends: clientShippingLegends,
		routeLegends: clientRouteLegends,
		vesselSizeLegends: clientVesselSizeLegends,
	});

	const { isPending: isSavePending, mutate: saveEtcSetting } = useSaveEtcSetting({
		terminalFilterSettings: clientTerminalFilterSettings,
		shippingLegends: clientShippingLegends,
		routeLegends: clientRouteLegends,
		vesselSizeLegends: clientVesselSizeLegends,
	});

	if (hasError) {
		toast.error('기타 설정 조회에 실패했습니다.');
	}

	return (
		<div id="etc-setting">
			{(isLoading || isSavePending) && <VesselLoader />}

			{/* 상단 메뉴 */}
			<div className="flex flex-row items-center justify-between">
				<Breadcrumb topMenuTitle="기타 설정" sideMenuTitle="개인화 설정" />
				<Button
					variant="secondary"
					className="h-[4rem] w-[9rem] rounded-[1rem] px-[3rem] py-0 text-white"
					disabled={!validation.isValid || hasError}
					onClick={() => {
						saveEtcSetting();
					}}
				>
					<p className="text-17 font-bold">{isSavePending ? '저장중...' : '저장'}</p>
				</Button>
			</div>

			<div className="flex flex-col gap-[2rem]">
				{/* 색상 설정 */}
				<div className="flex flex-row rounded-[1.5rem] bg-white p-[4rem]">
					{/* 부제 */}
					<div className="flex h-[4.1rem] w-[25rem] flex-shrink-0 flex-row items-center gap-[1rem]">
						<p className="text-25 font-bold">색상 설정</p>

						<Tooltip>
							<TooltipTrigger>
								<Error className="text-primary" />
							</TooltipTrigger>
							<TooltipContent className="bg-primary rounded-[1rem] p-[1rem]" side="right" align="start" alignOffset={-45}>
								<p className="text-12 font-semibold text-white">
									선박 모니터링의 접안 선박과 <br />
									선석 스케줄 카드의 색상을 설정합니다.
								</p>
							</TooltipContent>
						</Tooltip>
					</div>

					<div className="flex flex-col gap-[5rem]">
						{/* 선사 색상 설정 */}
						<div className="flex flex-row gap-[3rem] pr-[40rem]">
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
								<LegendSearchInput
									clientLegends={clientShippingLegends}
									items={uniqueShippingCompanies}
									onItemSelect={handleAddShippingLegend}
									legendType="shipping"
									placeholder="선사명 검색"
								/>

								<LegendColorSetting
									items={uniqueShippingCompanies}
									clientLegends={clientShippingLegends}
									setClientLegends={setClientShippingLegends}
									onAddLegend={handleAddShippingLegend}
									legendType="shipping"
									colorStorageKey="shippingLegends"
								/>
							</div>
						</div>

						{/* 항로 색상 설정 */}
						<div className="flex flex-row gap-[3rem] pr-[40rem]">
							<div className="flex flex-col gap-[1rem]">
								<p className="text-17 font-bold">항로</p>
								<div className="flex flex-col gap-[0.5rem]">
									<p className="bg-sub text-primary flex h-[2.3rem] w-[23rem] items-center justify-baseline rounded-[0.4rem] p-[1rem] font-semibold">
										선석 스케줄(G)
									</p>
								</div>
							</div>
							<div className="flex flex-col gap-[1.5rem]">
								<LegendSearchInput
									items={uniqueRoutes}
									onItemSelect={handleAddRouteLegend}
									clientLegends={clientRouteLegends}
									legendType="route"
									placeholder="항로명 검색"
								/>

								<LegendColorSetting
									items={uniqueRoutes}
									clientLegends={clientRouteLegends}
									setClientLegends={setClientRouteLegends}
									onAddLegend={handleAddRouteLegend}
									legendType="route"
									colorStorageKey="routeLegends"
								/>
							</div>
						</div>

						{/* 선박 사이즈(TEU) 색상 설정 */}
						<div className="flex flex-row gap-[3rem] pr-[40rem]">
							<div className="flex flex-col gap-[1rem]">
								<p className="text-17 font-bold">선박 사이즈(TEU)</p>
								<div className="flex flex-col gap-[0.5rem]">
									<p className="bg-sub text-primary flex h-[2.3rem] w-[23rem] items-center justify-baseline rounded-[0.4rem] p-[1rem] font-semibold">
										선박 모니터링
									</p>
								</div>
							</div>
							<div className="flex flex-col gap-[1.5rem]">
								<VesselSizeLegendColorSetting
									clientLegends={clientVesselSizeLegendsTEU}
									setClientLegends={setClientVesselSizeLegendsTEU}
									onAddLegend={handleAddVesselSizeLegendTEU}
									unit="TEU"
									duplicateColorIds={validation.vesselSizeDuplicates.duplicateColorIds}
									duplicateRangeIds={validation.vesselSizeDuplicates.duplicateRangeIds}
									rangeErrors={validation.vesselSizeRangeErrors}
								/>
							</div>
						</div>
					</div>
				</div>

				<div className="mb-[4rem] flex flex-row rounded-[1.5rem] bg-white p-[4rem]">
					{/* 부제 */}
					<div className="flex h-[4.1rem] w-[25rem] flex-shrink-0 flex-row items-center gap-[1rem]">
						<p className="text-25 font-bold">터미널 설정</p>

						<Tooltip>
							<TooltipTrigger>
								<Error className="text-primary" />
							</TooltipTrigger>
							<TooltipContent className="bg-primary rounded-[1rem] p-[1rem]" side="right" align="start" alignOffset={-45}>
								<p className="text-12 font-semibold text-white">
									터미널 표시 우선순위와 <br />
									활성화 여부를 설정합니다.
								</p>
							</TooltipContent>
						</Tooltip>
					</div>
					{!hasError && !isLoading ? (
						<div className="flex flex-row gap-[3.1rem]">
							{portSections.map((portSection, sectionIndex) => (
								<PortSection
									key={portSection.portCode}
									portSection={portSection}
									sectionIndex={sectionIndex}
									movePortSection={movePortSection}
									terminalFilterSettings={portSection.portCode === 'BNP' ? bnpTerminalFilterSettings : pusTerminalFilterSettings}
									onToggleTerminalFilter={handleToggleTerminalFilter}
									moveTerminalFilter={moveTerminalFilter}
								/>
							))}
						</div>
					) : (
						<></>
					)}
				</div>
			</div>
		</div>
	);
};

export default EtcSettingPage;
