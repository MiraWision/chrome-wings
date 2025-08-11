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
  user: {
    name: string;
    preferences: {
      theme: 'light' | 'dark';
    };
  } | null;
}

// Create a global service to manage user state
class UserService extends GlobalWing<UserState> {
  constructor() {
    super('user', { user: null });
  }

  // Initialize user data
  async loadUser() {
    const userData = await fetchUserData(); // Your API call
    this.setState({ user: userData });
  }
}

const userService = new UserService();
```

### Local State (Content Script)

```typescript
import { LocalWing } from '@mirawision/chrome-wings';

// Define your state type
interface UserState {
  user: {
    name: string;
    preferences: {
      theme: 'light' | 'dark';
    };
  } | null;
}

// Create a local service to access user state
class UserLocalService extends LocalWing<UserState> {
  constructor() {
    super('user', { user: null });
  }

  // Update user preferences
  async updateTheme(theme: 'light' | 'dark') {
    if (!this.state.user) return;
    
    this.setState({
      user: {
        ...this.state.user,
        preferences: { ...this.state.user.preferences, theme }
      }
    });
  }
}

const userLocalService = new UserLocalService();
```

### Popup State

```typescript
import { PopupWing } from '@mirawision/chrome-wings';

// Define your state type
interface UserState {
  user: {
    name: string;
    preferences: {
      theme: 'light' | 'dark';
    };
  } | null;
}

// Create a popup service to manage user preferences
class UserPopupService extends PopupWing<UserState> {
  constructor() {
    super('user', { user: null });
  }

  // Update user preferences
  async updateTheme(theme: 'light' | 'dark') {
    if (!this.state.user) return;
    
    this.setState({
      user: {
        ...this.state.user,
        preferences: { ...this.state.user.preferences, theme }
      }
    });
  }

  // Initialize UI based on current state
  initializeUI() {
    this.subscribe((state) => {
      if (state.user) {
        const themeSwitch = document.getElementById('theme-switch');
        if (themeSwitch) {
          (themeSwitch as HTMLInputElement).checked = 
            state.user.preferences.theme === 'dark';
        }
      }
    });
  }
}

const userPopupService = new UserPopupService();
```

### Side Panel State

```typescript
import { SideWing } from '@mirawision/chrome-wings';

// Define your state type
interface UserState {
  user: {
    name: string;
    preferences: {
      theme: 'light' | 'dark';
    };
  } | null;
}

// Create a side panel service to manage user preferences
class UserSideService extends SideWing<UserState> {
  constructor() {
    super('user', { user: null });
  }

  // Update user preferences
  async updateTheme(theme: 'light' | 'dark') {
    if (!this.state.user) return;
    
    this.setState({
      user: {
        ...this.state.user,
        preferences: { ...this.state.user.preferences, theme }
      }
    });
  }

  // Apply theme to side panel
  initializeSidePanel() {
    this.subscribe((state) => {
      if (state.user) {
        document.body.className = state.user.preferences.theme;
      }
    });
  }
}

const userSideService = new UserSideService();
```

## Contributing

Contributions are always welcome! Feel free to open issues or submit pull requests.

## License

This project is licensed under the MIT License.