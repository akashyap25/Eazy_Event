# EZEvent Color Guide

## 🎨 Unified Color Scheme

This document outlines the consistent color scheme used across the entire EZEvent application.

### Primary Colors

#### Blue (Primary)
- **50**: `#eff6ff` - Light backgrounds
- **100**: `#dbeafe` - Subtle highlights
- **200**: `#bfdbfe` - Borders and dividers
- **300**: `#93c5fd` - Disabled states
- **400**: `#60a5fa` - Hover states
- **500**: `#3b82f6` - **Main brand color**
- **600**: `#2563eb` - Active states
- **700**: `#1d4ed8` - Pressed states
- **800**: `#1e40af` - Dark text on light
- **900**: `#1e3a8a` - Headers and emphasis

#### Purple (Secondary)
- **50**: `#faf5ff` - Light backgrounds
- **100**: `#f3e8ff` - Subtle highlights
- **200**: `#e9d5ff` - Borders and dividers
- **300**: `#d8b4fe` - Disabled states
- **400**: `#c084fc` - Hover states
- **500**: `#a855f7` - **Secondary brand color**
- **600**: `#9333ea` - Active states
- **700**: `#7c3aed` - Pressed states
- **800**: `#6b21a8` - Dark text on light
- **900**: `#581c87` - Headers and emphasis

#### Yellow (Accent)
- **50**: `#fffbeb` - Light backgrounds
- **100**: `#fef3c7` - Subtle highlights
- **200**: `#fde68a` - Borders and dividers
- **300**: `#fcd34d` - Disabled states
- **400**: `#fbbf24` - Hover states
- **500**: `#f59e0b` - **Accent brand color**
- **600**: `#d97706` - Active states
- **700**: `#b45309` - Pressed states
- **800**: `#92400e` - Dark text on light
- **900**: `#78350f` - Headers and emphasis

### Neutral Colors

#### Gray Scale
- **50**: `#f9fafb` - Lightest backgrounds
- **100**: `#f3f4f6` - Card backgrounds
- **200**: `#e5e7eb` - Borders
- **300**: `#d1d5db` - Disabled text
- **400**: `#9ca3af` - Placeholder text
- **500**: `#6b7280` - Secondary text
- **600**: `#4b5563` - Primary text
- **700**: `#374151` - Headers
- **800**: `#1f2937` - Dark text
- **900**: `#111827` - Darkest text

### Status Colors

#### Success (Green)
- **50**: `#ecfdf5` - Success backgrounds
- **100**: `#d1fae5` - Success highlights
- **500**: `#10b981` - Success text/icons
- **600**: `#059669` - Success borders
- **700**: `#047857` - Dark success

#### Error (Red)
- **50**: `#fef2f2` - Error backgrounds
- **100**: `#fee2e2` - Error highlights
- **500**: `#ef4444` - Error text/icons
- **600**: `#dc2626` - Error borders
- **700**: `#b91c1c` - Dark error

#### Warning (Orange)
- **50**: `#fffbeb` - Warning backgrounds
- **100**: `#fef3c7` - Warning highlights
- **500**: `#f59e0b` - Warning text/icons
- **600**: `#d97706` - Warning borders
- **700**: `#b45309` - Dark warning

## 🎯 Button Variants

### Primary Button
```css
bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 shadow-md hover:shadow-lg border border-blue-600
```
- **Use for**: Main actions, CTAs, primary navigation
- **Text**: White
- **Background**: Blue 600
- **Hover**: Blue 700
- **Shadow**: Medium with hover enhancement

### Secondary Button
```css
bg-purple-600 text-white hover:bg-purple-700 focus:ring-purple-500 shadow-md hover:shadow-lg border border-purple-600
```
- **Use for**: Secondary actions, alternative CTAs
- **Text**: White
- **Background**: Purple 600
- **Hover**: Purple 700
- **Shadow**: Medium with hover enhancement

### Accent Button
```css
bg-yellow-500 text-gray-900 hover:bg-yellow-400 focus:ring-yellow-500 shadow-md hover:shadow-lg border border-yellow-500 font-semibold
```
- **Use for**: Highlighted actions, special CTAs
- **Text**: Gray 900 (dark)
- **Background**: Yellow 500
- **Hover**: Yellow 400
- **Weight**: Semibold for emphasis

### Outline Button
```css
border-2 border-blue-600 bg-transparent text-blue-600 hover:bg-blue-600 hover:text-white focus:ring-blue-500 shadow-sm hover:shadow-md
```
- **Use for**: Secondary actions, subtle CTAs
- **Text**: Blue 600
- **Background**: Transparent
- **Hover**: Blue 600 background with white text
- **Border**: 2px solid

### Ghost Button
```css
bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-gray-500 border border-transparent
```
- **Use for**: Subtle actions, tertiary buttons
- **Text**: Gray 700
- **Background**: Transparent
- **Hover**: Light gray background

## 🌈 Gradients

### Primary Gradient
```css
bg-gradient-to-r from-blue-600 to-purple-600
```
- **Use for**: Hero sections, major CTAs, branding
- **Direction**: Left to right
- **Colors**: Blue 600 to Purple 600

### Hero Background
```css
bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700
```
- **Use for**: Hero sections, major backgrounds
- **Direction**: Top-left to bottom-right
- **Colors**: Blue 600 → Purple 600 → Indigo 700

### Footer Background
```css
bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900
```
- **Use for**: Footer sections
- **Direction**: Top-left to bottom-right
- **Colors**: Gray 900 → Blue 900 → Purple 900

## 📱 Component-Specific Colors

### Header
- **Background**: White with backdrop blur
- **Logo**: Gradient (blue to purple)
- **Navigation**: Blue 600 active, gray 700 default
- **Buttons**: Primary blue and purple gradients

### Footer
- **Background**: Dark gradient (gray to blue to purple)
- **Text**: White and gray 300
- **Links**: Blue 400 with hover effects
- **Buttons**: Blue to purple gradient

### Cards
- **Background**: White
- **Border**: Gray 200
- **Shadow**: Gray 200 with hover enhancement
- **Text**: Gray 900 primary, gray 600 secondary

### Forms
- **Inputs**: White background, gray 300 border
- **Focus**: Blue 500 ring and border
- **Labels**: Gray 700
- **Placeholders**: Gray 400

## 🎨 Usage Guidelines

### Do's
- ✅ Use primary blue for main actions
- ✅ Use purple for secondary actions
- ✅ Use yellow for highlights and CTAs
- ✅ Maintain consistent contrast ratios
- ✅ Use gradients sparingly for emphasis
- ✅ Test colors in both light and dark contexts

### Don'ts
- ❌ Mix different color schemes
- ❌ Use low contrast combinations
- ❌ Overuse bright colors
- ❌ Ignore accessibility guidelines
- ❌ Use colors that don't match the brand

## 🔍 Accessibility

### Contrast Ratios
- **Normal text**: Minimum 4.5:1
- **Large text**: Minimum 3:1
- **UI components**: Minimum 3:1
- **Focus indicators**: Minimum 3:1

### Color Blindness
- Don't rely solely on color to convey information
- Use icons, text, or patterns alongside color
- Test with color blindness simulators
- Provide alternative indicators

## 🛠️ Implementation

### Tailwind Classes
```css
/* Primary */
.text-blue-600 .bg-blue-600 .border-blue-600

/* Secondary */
.text-purple-600 .bg-purple-600 .border-purple-600

/* Accent */
.text-yellow-500 .bg-yellow-500 .border-yellow-500

/* Gradients */
.bg-gradient-to-r .from-blue-600 .to-purple-600
```

### CSS Variables
```css
:root {
  --color-primary: #3b82f6;
  --color-secondary: #a855f7;
  --color-accent: #f59e0b;
  --color-success: #10b981;
  --color-error: #ef4444;
  --color-warning: #f59e0b;
}
```

This color guide ensures consistency across the entire EZEvent application and provides a foundation for future design decisions.