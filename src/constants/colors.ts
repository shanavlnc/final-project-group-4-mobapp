export const theme = {
  // Core Colors
  primary: '#FF6B6B',       // Coral red - main brand color
  secondary: '#4ECDC4',     // Tiffany blue - secondary actions
  accent: '#FFBE0B',        // Golden yellow - highlights
  
  // Status Colors
  success: '#51CF66',       // Green - 
  warning: '#FCC419',       // Yellow 
  danger: '#FF6B6B',        // Coral red 
  info: '#339AF0',          // Blue 
  
  // Text Colors
  text: '#2E2E2E',          // Primary text
  textLight: '#7A7A7A',     // Secondary text
  textInverted: '#FFFFFF',  // Text on dark backgrounds
  
  // Backgrounds
  background: '#FFFFFF',    // App background
  cardBackground: '#F8F9FA',// Card backgrounds
  inputBackground: '#FFFFFF',// Form inputs
  
  // Borders & Dividers
  border: '#E9ECEF',        // Light borders
  divider: '#DEE2E6',       // Stronger dividers
  
  // Overlays
  overlay: 'rgba(0,0,0,0.5)', 
  
  // Platform Specific
  iosShadow: 'rgba(0,0,0,0.1)',
  androidElevation: 4,
};

export type ThemeColors = typeof theme;