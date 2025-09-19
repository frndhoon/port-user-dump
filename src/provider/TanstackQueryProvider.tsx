'use client';

import { PropsWithChildren, useState } from 'react';

import dynamic from 'next/dynamic';

import { QueryClientProvider } from '@tanstack/react-query';

import { getQueryClient } from '@/configs/tanstack-query/get-query-client';

// 개발 환경에서만 Devtools 로드
const ReactQueryDevtools = dynamic(() => import('@tanstack/react-query-devtools').then(mod => ({ default: mod.ReactQueryDevtools })), {
	ssr: false,
	loading: () => null,
});

const TanstackQueryProvider = ({ children }: PropsWithChildren) => {
	const [queryClient] = useState(() => getQueryClient());
	return (
		<QueryClientProvider client={queryClient}>
			{children}
			{process.env.NODE_ENV === 'development' && <ReactQueryDevtools initialIsOpen={false} />}
		</QueryClientProvider>
	);
};

export default TanstackQueryProvider;
