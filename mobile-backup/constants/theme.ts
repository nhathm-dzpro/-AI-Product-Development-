import { MD3LightTheme } from 'react-native-paper';

export const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#E8590C',
    secondaryContainer: '#FFE8CC',
  },
};

export const colors = {
  primary: '#E8590C',
  background: '#FFF8F2',
  surface: '#FFFFFF',
  muted: '#868E96',
  text: '#212529',
  border: '#E9ECEF',
  success: '#2F9E44',
  warning: '#E67700',
  danger: '#E03131',
};

export const spacing = { xs: 4, sm: 8, md: 16, lg: 24, xl: 32 };
