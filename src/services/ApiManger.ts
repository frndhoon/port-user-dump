import * as commonTypes from '@/types/common-types';

interface RequestConfig {
	url: string;
	data?: any;
	headers?: Record<string, string>;
	timeout?: number;
}

const buildQueryString = (params: Record<string, any>): string => {
	const searchParams = new URLSearchParams();

	Object.entries(params).forEach(([key, value]) => {
		if (value !== null && value !== undefined) {
			if (Array.isArray(value)) {
				value.forEach(item => searchParams.append(key, String(item)));
			} else {
				searchParams.append(key, String(value));
			}
		}
	});

	return searchParams.toString();
};

class ApiManager {
	public headers: Record<string, string> = {
		'Content-Type': 'application/json',
	};
	public timeout: number = 10000;
	private baseURL: string = '';

	constructor(baseURL: string = '') {
		this.baseURL = baseURL;
	}

	private async request<T>(config: RequestConfig & { method: string }): Promise<commonTypes.responseApi<T>> {
		const { url, data, headers, method } = config;
		let fullUrl = `${this.baseURL}${url}`;

		const requestConfig: RequestInit = {
			method,
			headers: {
				...this.headers,
				...headers,
			},
		};

		if (method === 'GET' && data) {
			const queryString = buildQueryString(data);
			if (queryString) {
				fullUrl += `?${queryString}`;
			}
		}

		if (method === 'POST' && data) {
			if (data instanceof FormData) {
				const headers = requestConfig.headers as Record<string, string>;
				delete headers['Content-Type'];
				requestConfig.body = data;
			} else {
				requestConfig.body = JSON.stringify(data);
			}
		}

		try {
			const response = await fetch(fullUrl, requestConfig);
			const responseData = await response.json();

			return responseData;
		} catch (error) {
			throw new Error(`API 요청 실패: ${error}`);
		}
	}

	// GET 요청
	async getRequest<T>(config: RequestConfig): Promise<commonTypes.responseApi<T>> {
		return this.request<T>({ ...config, method: 'GET' });
	}

	// POST 요청 (JSON)
	async postRequest<T>(config: RequestConfig): Promise<commonTypes.responseApi<T>> {
		return this.request<T>({ ...config, method: 'POST' });
	}

	// POST 요청 (멀티파트)
	async postMultipartRequest<T>(config: RequestConfig & { formData: FormData }): Promise<commonTypes.responseApi<T>> {
		const { formData, ...restConfig } = config;
		return this.request<T>({ ...restConfig, method: 'POST', data: formData });
	}
}

// 싱글톤 인스턴스
class ApiManagerSingleton {
	private static instance: ApiManager;

	static getInstance(config?: { baseURL?: string; timeout?: number; headers?: Record<string, string> }): ApiManager {
		if (!ApiManagerSingleton.instance) {
			ApiManagerSingleton.instance = new ApiManager(config?.baseURL);
			if (config?.timeout) {
				ApiManagerSingleton.instance.timeout = config.timeout;
			}
			if (config?.headers) {
				ApiManagerSingleton.instance.headers = { ...ApiManagerSingleton.instance.headers, ...config.headers };
			}
		}
		return ApiManagerSingleton.instance;
	}
}

export default ApiManager;
export { ApiManagerSingleton };
export type { RequestConfig };
