'use client';

import { useState, useEffect } from 'react';

import {
	getColorSettings,
	updateDefaultColor,
	getDefaultColor,
	type ColorSettings,
	type DefaultColors,
} from '@/app/user/etc-setting/_store/local-storage/ColorStorage';

export const useColorSettings = () => {
	const [colorSettings, setColorSettingsState] = useState<ColorSettings | null>(null);
	const [isClient, setIsClient] = useState(false);

	useEffect(() => {
		setIsClient(true);
		setColorSettingsState(getColorSettings());
	}, []);

	useEffect(() => {
		if (!isClient) {
			return;
		}

		const handleStorageChange = (e: StorageEvent) => {
			if (e.key === 'colorSettings' && e.newValue) {
				try {
					const newSettings = JSON.parse(e.newValue) as ColorSettings;
					setColorSettingsState(newSettings);
				} catch (error) {
					console.error('Failed to parse color settings from storage event:', error);
				}
			}
		};

		window.addEventListener('storage', handleStorageChange);
		return () => window.removeEventListener('storage', handleStorageChange);
	}, [isClient]);

	const updateColor = (key: keyof DefaultColors, color: string) => {
		if (!isClient) {
			return;
		}

		updateDefaultColor(key, color);
		setColorSettingsState(getColorSettings());
	};

	const getColor = (key: keyof DefaultColors): string => {
		if (!isClient) {
			// 서버 사이드에서는 기본값 반환
			const defaultSettings = getColorSettings();
			return defaultSettings.state.defaultColors[key];
		}
		return getDefaultColor(key);
	};

	return {
		colorSettings,
		updateColor,
		getColor,
		isClient,
	};
};
