// localStorage 관리 유틸리티
export interface DefaultColors {
	shippingLegends: string;
	routeLegends: string;
	vesselSizeLegends: string;
	'vesselSizeLegends(teu)': string;
	'vesselSizeLegends(gt)': string;
}

export interface ColorSettings {
	state: {
		defaultColors: DefaultColors;
	};
}

const DEFAULT_COLOR_SETTINGS: ColorSettings = {
	state: {
		defaultColors: {
			shippingLegends: '#33388A',
			routeLegends: '#33388A',
			vesselSizeLegends: '#33388A',
			'vesselSizeLegends(teu)': '#33388A',
			'vesselSizeLegends(gt)': '#33388A',
		},
	},
};

const STORAGE_KEY = 'colorSettings';

export const getColorSettings = (unit?: 'GT' | 'TEU'): ColorSettings => {
	if (typeof window === 'undefined') {
		return DEFAULT_COLOR_SETTINGS;
	}

	try {
		const stored = localStorage.getItem(STORAGE_KEY + (unit ? `(${unit})` : ''));
		if (!stored) {
			return DEFAULT_COLOR_SETTINGS;
		}

		const parsed = JSON.parse(stored) as ColorSettings;
		return parsed;
	} catch (error) {
		console.error('Failed to parse color settings from localStorage:', error);
		return DEFAULT_COLOR_SETTINGS;
	}
};

export const setColorSettings = (settings: ColorSettings): void => {
	if (typeof window === 'undefined') {
		return;
	}

	try {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
	} catch (error) {
		console.error('Failed to save color settings to localStorage:', error);
	}
};

export const updateDefaultColor = (key: keyof DefaultColors, color: string): void => {
	const currentSettings = getColorSettings();
	const updatedSettings: ColorSettings = {
		...currentSettings,
		state: {
			...currentSettings.state,
			defaultColors: {
				...currentSettings.state.defaultColors,
				[key]: color,
			},
		},
	};
	setColorSettings(updatedSettings);
};

export const getDefaultColor = (key: keyof DefaultColors): string => {
	const settings = getColorSettings();
	return settings.state.defaultColors[key];
};
