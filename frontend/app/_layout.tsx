import React from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { CabinProvider } from '../src/context/CabinContext';
import { COLORS } from '../src/constants/theme';

export default function RootLayout() {
  return (
    <CabinProvider>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: COLORS.background },
          animation: 'slide_from_right',
        }}
      />
    </CabinProvider>
  );
}
