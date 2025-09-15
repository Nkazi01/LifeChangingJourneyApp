import React, { useEffect, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { 
  useFonts, 
  Poppins_400Regular, 
  Poppins_500Medium, 
  Poppins_600SemiBold,
  Poppins_700Bold,
  Poppins_400Regular_Italic
} from '@expo-google-fonts/poppins';

// Keep splash screen visible until fonts are loaded
SplashScreen.preventAutoHideAsync().catch(() => {});

export const FontLoader = ({ children }) => {
  const [fontsLoaded] = useFonts({
    'Poppins_400': Poppins_400Regular,
    'Poppins_400_Italic': Poppins_400Regular_Italic,
    'Poppins_500': Poppins_500Medium,
    'Poppins_600': Poppins_600SemiBold,
    'Poppins_700': Poppins_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded) {
      // Hide splash screen once fonts are loaded
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return <>{children}</>;
};
