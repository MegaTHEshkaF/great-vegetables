import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';

import { RegionProvider } from '@/hooks/RegionContext';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const colorScheme = useColorScheme();
    const [loaded] = useFonts({
        SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    });

    useEffect(() => {
        if (loaded) {
        SplashScreen.hideAsync();
        }
    }, [loaded]);

    if (!loaded) {
        return null;
    }

    return (
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <RegionProvider>
                <Stack>
                    <Stack.Screen name="(tabs)" options={{ headerShown: false }}/>
                    <Stack.Screen name="veggy-kind/[veggieId]" options={{ title: 'Выберите сорт' }}/>
                    <Stack.Screen name="veggy-kind/[veggieId]/[kindId]" options={{ title: 'Информация' }}/>
                    <Stack.Screen name="+not-found" />
                </Stack>
                <StatusBar style="auto" />
            </RegionProvider>
        </ThemeProvider>
    );
}
