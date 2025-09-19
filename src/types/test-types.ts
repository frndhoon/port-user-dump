// API 요청/응답 타입 정의

// 사용자 관련 타입
export interface User {
	id: number;
	name: string;
	email: string;
	phone?: string;
	username?: string;
	website?: string;
	address?: {
		street: string;
		suite: string;
		city: string;
		zipcode: string;
		geo: {
			lat: string;
			lng: string;
		};
	};
	company?: {
		name: string;
		catchPhrase: string;
		bs: string;
	};
}

// 게시글 관련 타입
export interface Post {
	id: number;
	title: string;
	body: string;
	userId: number;
}

// 댓글 관련 타입
export interface Comment {
	id: number;
	postId: number;
	name: string;
	email: string;
	body: string;
}

// 앨범 관련 타입
export interface Album {
	id: number;
	title: string;
	userId: number;
}

// 사진 관련 타입
export interface Photo {
	id: number;
	albumId: number;
	title: string;
	url: string;
	thumbnailUrl: string;
}

// 할일 관련 타입
export interface Todo {
	id: number;
	title: string;
	completed: boolean;
	userId: number;
}

// 파일 업로드 관련 타입
export interface FileUploadResponse {
	success: boolean;
	fileId: string;
	fileName: string;
	fileSize: number;
	fileType: string;
	uploadedAt: string;
	url?: string;
}

// 파일 업로드 요청 타입
export interface FileUploadRequest {
	file: File;
	description?: string;
	category?: string;
	tags?: string[];
}

// 다중 파일 업로드 요청 타입
export interface MultipleFileUploadRequest {
	files: File[];
	metadata?: {
		category: string;
		tags: string[];
		description?: string;
	};
}

// API 요청 파라미터 타입
export interface ApiParams {
	page?: number;
	limit?: number;
	sort?: string;
	order?: 'asc' | 'desc';
	search?: string;
	status?: string;
	[key: string]: any;
}

// 사용자 생성 요청 타입
export interface CreateUserRequest {
	name: string;
	email: string;
	phone?: string;
	username?: string;
	website?: string;
}

// 게시글 생성 요청 타입
export interface CreatePostRequest {
	title: string;
	body: string;
	userId: number;
}

// 댓글 생성 요청 타입
export interface CreateCommentRequest {
	postId: number;
	name: string;
	email: string;
	body: string;
}
