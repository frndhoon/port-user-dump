import { Query, defaultShouldDehydrateQuery, keepPreviousData } from '@tanstack/react-query';

export const queryClientOptions = {
	defaultOptions: {
		queries: {
			retry: 1,
			refetchOnMount: true,
			refetchOnWindowFocus: false,
			refetchOnReconnect: false,
			placeholderData: keepPreviousData,
		},
		dehydrate: {
			shouldDehydrateQuery: (query: Query) => defaultShouldDehydrateQuery(query) || query.state.status === 'pending',
		},
	},
};
