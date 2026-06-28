<p align="center">
  <img src="https://raw.githubusercontent.com/beeax/beeax/main/packages/beeax-ui/logo.png" width="136" height="136" alt="beeax-ui logo" />
</p>

# beeax-ui

BeeAX's open-source React UI component library: components, icons, and design tokens built on a zero-runtime, CSS-variable styling layer.

# Installation

```bash
npm install beeax-ui
```

`react`, `react-dom`, and `monaco-editor` are peer dependencies (install them in your app). `monaco-editor` is only required if you use the code editor components.

# Usage

Import the base styles once, pick a theme stylesheet, and wrap your app in `ThemeProvider`:

```tsx
import { ThemeProvider } from 'beeax-ui/theme-constants';
import { Button } from 'beeax-ui/input';

import 'beeax-ui/style.css';
import 'beeax-ui/theme-light.css';

export const App = () => (
  <ThemeProvider colorScheme="light">
    <Button title="Click me" />
  </ThemeProvider>
);
```

Components are available from the root entry point or from a specific subpath for better tree-shaking:

```tsx
import { Button } from 'beeax-ui';
import { Button } from 'beeax-ui/input';
```

# Entry points

| Subpath | Contents |
| --- | --- |
| `beeax-ui` | All components, icons, theme tokens, and utilities |
| `beeax-ui/accessibility` | Accessibility helpers |
| `beeax-ui/assets` | Logos and static assets |
| `beeax-ui/data-display` | Avatars, chips, tags, and other display components |
| `beeax-ui/feedback` | Progress bars, loaders, and status feedback |
| `beeax-ui/icon` | Icon components and the icon provider |
| `beeax-ui/input` | Buttons, toggles, and form inputs |
| `beeax-ui/json-visualizer` | JSON tree viewer |
| `beeax-ui/layout` | Layout primitives |
| `beeax-ui/navigation` | Menus, links, and navigation components |
| `beeax-ui/surfaces` | Cards, tooltips, and surface components |
| `beeax-ui/testing` | Storybook and test decorators |
| `beeax-ui/theme` | Theme types and helpers |
| `beeax-ui/theme-constants` | Design tokens, `ThemeProvider`, and `useTheme` |
| `beeax-ui/typography` | Text and typography components |
| `beeax-ui/utilities` | Hooks and shared utilities |

# Theming

- `beeax-ui/style.css` ships the base reset and component styles. Import it once.
- `beeax-ui/theme-light.css` and `beeax-ui/theme-dark.css` define the design-token CSS variables for each color scheme.
- `ThemeProvider` exposes the active theme through `useTheme()` and applies the `light` / `dark` class. Pass `applyToRoot={false}` with `overrides` to scope a theme to a subtree instead of the document root.

# Development

```bash
npx nx build beeax-ui                 # Build the library (dual ESM/CJS + types)
npx nx storybook:serve:dev beeax-ui   # Run Storybook
npx nx test beeax-ui                  # Run unit tests
```

# License

beeax-ui is released under the [AGPL-3.0](https://github.com/beeax/beeax/blob/main/packages/beeax-ui/LICENSE) license.
