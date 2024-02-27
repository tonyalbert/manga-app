import React, { useEffect, useState } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { mangaApi } from '../utils/mangaDex';
import { Styles } from '../styles/MangaPagesStyles';
import { StatusBar } from 'expo-status-bar';
import Pinchable from 'react-native-pinchable';

interface chapterData {
    hash: string;
    pages: string[]; // Alterado para uma matriz de strings para armazenar os URLs das páginas
}

export const MangaPages = ({ route, navigation }) => {
    const { chapterId } = route.params;

    const [chapterData, setChapterData] = useState<chapterData>({
        hash: '',
        pages: [] as string[] // Definindo inicialmente como uma matriz de strings
    });

    const [activePage, setActivePage] = useState(0);

    const [pageLength, setPageLength] = useState(0);

    useEffect(() => {
        mangaApi.getChapterData(chapterId).then(chapterData => {
            setChapterData(chapterData as chapterData);
            
            chapterData.pages.forEach(pageUrl => {
                Image.prefetch(pageUrl);
            });
        });

        setPageLength(chapterData.pages.length);
    }, []);

    const navigateToPreviousPage = () => {
        if (activePage > 0) {
            setActivePage(activePage - 1);
        }
    };

    const navigateToNextPage = () => {
        if (activePage < chapterData.pages.length - 1) {
            setActivePage(activePage + 1);
        } else {
            navigation.goBack(); // Se estiver na última página, voltar
        }
    };

    return (
        <View style={Styles.container}>
            <StatusBar backgroundColor='black' />
            <Image style={Styles.image} source={{ uri: chapterData.pages[activePage] }} />
            <TouchableOpacity style={Styles.backButton} onPress={navigateToPreviousPage}></TouchableOpacity>
            <TouchableOpacity style={Styles.nextButton} onPress={navigateToNextPage}></TouchableOpacity>
        </View>
    );
};
