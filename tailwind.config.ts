import type { Config } from "tailwindcss";

export default {
	darkMode: "class",
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				background: "#0f0f11", // Slightly warmer dark
				foreground: "#f4f4f5",

				border: "#26272b",
				input: "#1c1d21",
				ring: "#6366f1", // Indigo highlight

				primary: {
					DEFAULT: "#7c3aed",         // Vibrant purple
					foreground: "#ffffff",
				},
				secondary: {
					DEFAULT: "#f472b6",         // Pink
					foreground: "#1f2937",
				},
				destructive: {
					DEFAULT: "#ef4444",         // Red
					foreground: "#ffffff",
				},
				muted: {
					DEFAULT: "#3f3f46",         // Cool gray
					foreground: "#a1a1aa",
				},
				accent: {
					DEFAULT: "#10b981",         // Emerald green
					foreground: "#ffffff",
				},
				popover: {
					DEFAULT: "#1c1c1e",
					foreground: "#f4f4f5",
				},
				card: {
					DEFAULT: "#1a1a1c",
					foreground: "#f4f4f5",
				},
				sidebar: {
					DEFAULT: "#121212",
					foreground: "#e0e0e0",
					primary: "#7c3aed",
					"primary-foreground": "#ffffff",
					accent: "#10b981",
					"accent-foreground": "#ffffff",
					border: "#27272a",
					ring: "#6366f1",
				},
				zeroeffort: {
					50: "#ecfdf5",
					100: "#d1fae5",
					200: "#a7f3d0",
					300: "#6ee7b7",
					400: "#34d399",
					500: "#10b981", // keep brand color
					600: "#059669",
					700: "#047857",
					800: "#065f46",
					900: "#064e3b",
					950: "#022c22",
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'fade-in': {
					from: { opacity: '0' },
					to: { opacity: '1' }
				},
				'slide-in': {
					from: { transform: 'translateY(10px)', opacity: '0' },
					to: { transform: 'translateY(0)', opacity: '1' }
				},
				'pulse-slow': {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.8' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.3s ease-out',
				'slide-in': 'slide-in 0.4s ease-out',
				'pulse-slow': 'pulse-slow 3s infinite ease-in-out'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
