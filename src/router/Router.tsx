import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home } from "../pages/Home";
import { MangaPage } from "../pages/Manga";
import { MangaPages } from "../pages/MangaPages";
import { LikedMangas } from "../pages/LikedMangas";

const Stack = createNativeStackNavigator();

export const Router = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
                <Stack.Screen options={{ headerShown: false }} name="Home" component={Home} />
                <Stack.Screen options={{ headerShown: true, title: '' }} name="Manga" component={MangaPage} />
                <Stack.Screen name="Chapter" component={MangaPages} />
                <Stack.Screen options={{ headerShown: true }} name="Favoritos" component={LikedMangas} />
            </Stack.Navigator>
        </NavigationContainer>        
    )
}