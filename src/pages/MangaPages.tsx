import React, { useEffect, useState } from 'react';
import { View, Image, TouchableOpacity, Text } from 'react-native';
import { mangaApi } from '../utils/mangaDex';
import { Styles } from '../styles/MangaPagesStyles';
import { StatusBar } from 'expo-status-bar';
import { ReactNativeZoomableView } from '@openspacelabs/react-native-zoomable-view';

interface chapterData {
    hash: string;
    pages: string[];
}

export const MangaPages = ({ route, navigation }) => {
    const { chapterId } = route.params;

    const [chapterData, setChapterData] = useState<chapterData>({
        hash: '',
        pages: [] as string[] // Definindo inicialmente como uma matriz de strings
    });

    const [activePage, setActivePage] = useState(0);

    useEffect(() => {
        mangaApi.getChapterData(chapterId).then(chapterData => {
            setChapterData(chapterData as chapterData);
            
            chapterData.pages.forEach(pageUrl => {
                Image.prefetch(pageUrl);
            });
        });

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
            <ReactNativeZoomableView
                style={Styles.mangaContainer}
                doubleTapZoomToCenter={true}
                maxZoom={2.7}
                minZoom={1}
                zoomStep={2.7}
                initialZoom={1}
                bindToBorders={true}
                onTransform={() => {}}
            >
                <StatusBar backgroundColor='black' />
                <Image style={Styles.image} source={{ uri: chapterData.pages[activePage] }} />
            </ReactNativeZoomableView>
            <TouchableOpacity style={Styles.backButton} onPress={navigateToPreviousPage}></TouchableOpacity>
            <TouchableOpacity style={Styles.nextButton} onPress={navigateToNextPage}></TouchableOpacity>
            <Text style={Styles.pageNumber}>{activePage + 1}/{chapterData.pages.length}</Text>
        </View>
    );
};
