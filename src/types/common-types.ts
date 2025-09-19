/* eslint-disable @typescript-eslint/no-explicit-any */
export type jwtType = {
	iat: string;
	exp: number;
	iss: string;
	jti: string;
	ver: string;
};
export type responseApi<T> = {
	statusCode: number;
	result: T | null;
	resultMessage: string;
	message: string;
};

export type responseIncidentData<T> = {
	body: {
		items: T;
	};
};

export type params = {
	[key: string]: number | string | string[] | number[] | boolean | { [key: string]: any };
};

export type errorHandleType = {
	statusCode?: number;
	error: unknown;
};

export type requestOptions = {
	url: string;
	requiresToken?: boolean;
};

export type getRequestOptions = requestOptions & {
	params?: params | null;
};

export type deleteRequestOptions = requestOptions & {
	params?: params | null;
};

export type postRequestOptions = requestOptions & {
	params?: params | null;
	body: { [key: string]: unknown } | FormData | null;
};

export type multipartRequestOptions = requestOptions & {
	body: FormData | null;
};
