# FARI Icons

A versatile icons library that provides raw SVG icons, JavaScript-based icons, and Vue components.

---

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
  - [Raw SVG](#raw-svg)
  - [JavaScript Icons](#javascript-icons)
  - [Vue Components](#vue-components)
  - [Vue Component Example](#vue-component-example)

---

## Installation

```sh
npm i @fari-brussels/icons
```

## Usage

### Raw SVG

```js
import { Check } from '@fari-brussels/icons/svg';
```

### JavaScript Icons

```js
import { Check } from '@fari-brussels/icons/js';
```

### Vue Components

```js
import { CheckIcon } from '@fari-brussels/icons/vue';
```

### Vue Component Example

```vue
<template>
  <CheckIcon color="primary" class="stroke-color-primary" />
</template>
```

---

This documentation provides an overview of how to use FARI Icons in different formats, ensuring flexibility across various projects.



A CSS library that exports both plain CSS and Sass (SCSS).

---

## Table of Contents

- [FARI Icons](#fari-icons)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Usage](#usage)
    - [Raw SVG](#raw-svg)
    - [JavaScript Icons](#javascript-icons)
    - [Vue Components](#vue-components)
    - [Vue Component Example](#vue-component-example)
  - [Table of Contents](#table-of-contents-1)
  - [Installation](#installation-1)
  - [Usage](#usage-1)
    - [Plain CSS](#plain-css)
    - [Sass](#sass)
  - [Classes](#classes)
    - [Borders](#borders)
      - [Extended Borders](#extended-borders)
    - [Colors](#colors)
      - [Text Colors](#text-colors)
      - [Background Colors](#background-colors)
      - [Stroke \& Fill](#stroke--fill)
    - [Spacing](#spacing)
    - [Padding](#padding)
    - [Typography](#typography)
  - [Variables](#variables)
    - [Border Variables](#border-variables)
    - [Color Variables](#color-variables)
    - [Spacing Variables](#spacing-variables)
    - [Typography Variables](#typography-variables)

---

## Installation

```sh
npm i @fari-brussels/style
```

## Usage

### Plain CSS

```scss
@use '@fari-brussels/style';
```

### Sass

```scss
@use '@fari-brussels/style/sass' as *; // or any other namespace
```

## Classes

### Borders

| Class | Property |
|--------|------------|
| `rounded-none` | `border-radius: 0` |
| `rounded-md` | `border-radius: 1rem` |
| `rounded-lg` | `border-radius: 3rem` |

#### Extended Borders

| Class | Property |
|------------------|------------------------------|
| `rounded-es-none` | `border-end-start-radius: 0` |
| `rounded-es-md` | `border-end-start-radius: 1rem` |
| `rounded-es-lg` | `border-end-start-radius: 3rem` |
| `rounded-ee-none` | `border-end-end-radius: 0` |
| `rounded-ee-md` | `border-end-end-radius: 1rem` |
| `rounded-ee-lg` | `border-end-end-radius: 3rem` |

### Colors

#### Text Colors

| Class | Property |
|------------|------------------|
| `color-blue` | `color: #183e91` |
| `color-primary` | `color: #2e4fbf` |
| `color-white` | `color: #f6f6f6` |
| `color-black` | `color: #181716` |

#### Background Colors

| Class | Property |
|----------------|----------------------|
| `bg-color-blue` | `background-color: #183e91` |
| `bg-color-primary` | `background-color: #2e4fbf` |
| `bg-color-white` | `background-color: #f6f6f6` |
| `bg-color-black` | `background-color: #181716` |

#### Stroke & Fill

| Class | Property |
|-----------------|----------------------|
| `stroke-color-blue` | `stroke: #183e91` |
| `fill-color-blue` | `fill: #183e91` |

### Spacing

| Class | Property |
|-----------|------------------|
| `m-none` | `margin: 0` |
| `m-xs` | `margin: 0.75rem` |
| `m-sm` | `margin: 1.75rem` |
| `m-md` | `margin: 2rem` |

### Padding

| Class | Property |
|----------|------------------|
| `p-none` | `padding: 0` |
| `p-xs` | `padding: 0.75rem` |
| `p-sm` | `padding: 1.75rem` |
| `p-md` | `padding: 2rem` |

### Typography

| Class | Property |
|-----------------|---------------------------|
| `font-family-base` | `font-family: 'Inter', sans-serif` |
| `font-size-base` | `font-size: 16px` |
| `font-size-title` | `font-size: 4.5rem` |

---

## Variables

### Border Variables

```scss
$none: 0;
$border-md: 1rem;
$border-lg: 3rem;
```

### Color Variables

```scss
$blue: #183e91;
$primary: #2e4fbf;
$white: #f6f6f6;
$black: #181716;
```

### Spacing Variables

```scss
$space-xs: 0.75rem;
$space-sm: 1.75rem;
$space-md: 2rem;
$space-lg: 3rem;
```

### Typography Variables

```scss
$inter: 'Inter', sans-serif;
$base: 16px;
$title: 4.5rem;
```

---

