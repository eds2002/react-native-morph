# react-native-morph

> **Work in Progress** - A React Native library for creating smooth morphing transitions between screens, inspired by the [Family](https://family.co) wallet app.

## Features

- Auto morphing between screens with shared element transitions
- Works with React Navigation and Expo Router
- Minimal dependencies

## Installation

```bash
bun add react-native-morph react-native-screen-transitions @react-native-masked-view/masked-view
```

## Usage

```tsx
import { Morph } from 'react-native-morph';

// Wrap your navigator with Morph
<Morph borderRadius={24}>
  <Stack.Navigator>
    ...
  </Stack.Navigator>
</Morph>

// Mark elements that should morph
<Morph.Screen style={{ height: 300 }}>
  <YourContent />
</Morph.Screen>
```

## Dependencies

- [react-native-screen-transitions](https://github.com/eds2002/react-native-screen-transitions) - Screen transition primitives
- [@react-native-masked-view/masked-view](https://github.com/react-native-masked-view/masked-view) - Mask rendering

## License

MIT
