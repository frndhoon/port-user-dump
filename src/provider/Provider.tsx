'use client';

import React, { ReactNode } from 'react';

import ReactDNDProvider from '@/provider/ReactDNDProvider';
import TanstackQueryProvider from '@/provider/TanstackQueryProvider';

const Provider = ({ children }: { children: ReactNode }) => {
	return (
		<TanstackQueryProvider>
			<ReactDNDProvider>{children}</ReactDNDProvider>
		</TanstackQueryProvider>
	);
};

export default Provider;
