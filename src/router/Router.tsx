import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home } from "../pages/Home";
import { MangaPage } from "../pages/Manga";
import { MangaPages } from "../pages/MangaPages";

const Stack = createNativeStackNavigator();

export const Router = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="Manga" component={MangaPage} />
                <Stack.Screen name="Chapter" component={MangaPages} />
            </Stack.Navigator>
        </NavigationContainer>        
    )
}