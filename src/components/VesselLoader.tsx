'use client';

import Lottie from 'lottie-react';

import vesselAnimation from '@/assets/lottie/vessel-animation.json';

/**
 * @component 선박 로딩 애니메이션
 * @author 우정훈
 * @description 선박 애니메이션을 담당하는 컴포넌트입니다.
 */

const VesselLoader = () => {
	return (
		<div className={'fixed top-0 right-0 bottom-0 left-0 z-[99999] bg-black/50'}>
			<div className="flex h-full w-full items-center justify-center">
				<div className="flex size-[30rem] items-center justify-center overflow-hidden rounded-full bg-white/50 shadow-lg">
					<Lottie animationData={vesselAnimation} loop={true} autoplay={true} className="size-[25rem]" />
				</div>
			</div>
		</div>
	);
};

export { VesselLoader };
