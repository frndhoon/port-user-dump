'use client';

import React, { ReactNode } from 'react';

import TanstackQueryProvider from '@/provider/TanstackQueryProvider';

const Provider = ({ children }: { children: ReactNode }) => {
	return <TanstackQueryProvider>{children}</TanstackQueryProvider>;
};

export default Provider;
