# @mirawision/chrome-wings

A TypeScript library for managing Chrome extension state across different contexts using a simple and intuitive API. Chrome Wings provides a seamless way to handle state management in various parts of your Chrome extension, including background scripts, content scripts, popup windows, and side panels.

## Features

### Context-Specific State Management
- **Global State**: Manage state in the extension's background context using `GlobalWing`
- **Local State**: Handle state in content scripts with `LocalWing`
- **Popup State**: Manage state in extension popup windows using `PopupWing`
- **Side Panel State**: Handle state in the extension's side panel with `SideWing`

### Key Benefits
- **Type Safety**: Built with TypeScript for robust type checking and better development experience
- **Seamless Communication**: Automatic state synchronization between different extension contexts
- **Simple API**: Intuitive interface similar to React's useState
- **Efficient Updates**: Smart update propagation to minimize unnecessary rerenders
- **Context Isolation**: Each context maintains its own state while staying in sync

## Installation

```bash
npm install @mirawision/chrome-wings
```

or 

```bash
yarn add @mirawision/chrome-wings
```

## Usage

Here's a quick overview of how to use Chrome Wings in different contexts:

### Global State (Background Script)

```typescript
import { GlobalWing } from '@mirawision/chrome-wings';

// Define your state type
interface UserState {
  isLoggedIn: boolean;
  username: string;
}

// Initialize global state
const userWing = new GlobalWing<UserState>('user', {
  isLoggedIn: false,
  username: ''
});

// Update state
userWing.setState({
  isLoggedIn: true,
  username: 'john.doe'
});
```

### Local State (Content Script)

```typescript
import { LocalWing } from '@mirawision/chrome-wings';

// Define your state type
interface PageState {
  darkMode: boolean;
  fontSize: number;
}

// Initialize local state
const pageWing = new LocalWing<PageState>('page', {
  darkMode: false,
  fontSize: 16
});

// Update state
pageWing.setState({
  darkMode: true
});
```

### Popup State

```typescript
import { PopupWing } from '@mirawision/chrome-wings';

// Define your state type
interface SettingsState {
  notifications: boolean;
  theme: 'light' | 'dark';
}

// Initialize popup state
const settingsWing = new PopupWing<SettingsState>('settings', {
  notifications: true,
  theme: 'light'
});

// Listen for state changes
settingsWing.subscribe((state) => {
  console.log('Settings updated:', state);
});
```

### Side Panel State

```typescript
import { SideWing } from '@mirawision/chrome-wings';

// Define your state type
interface PanelState {
  isExpanded: boolean;
  selectedTab: string;
}

// Initialize side panel state
const panelWing = new SideWing<PanelState>('panel', {
  isExpanded: false,
  selectedTab: 'home'
});

// Update specific properties
panelWing.setState({
  isExpanded: true
});
```

## Contributing

Contributions are always welcome! Feel free to open issues or submit pull requests.

## License

This project is licensed under the MIT License.