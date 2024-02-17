import { View, Text, ScrollView, TouchableOpacity, Touchable, Button, Image } from 'react-native'
import { mangaApi } from '../utils/mangaDex'
import { useEffect, useState } from 'react'
import { Styles } from '../styles/MangaPagesStyles'
import { StatusBar } from 'expo-status-bar'

interface chapterData {
    hash: string
    pages: any[]
}

export const MangaPages = ({ route }) => {
    const { chapterId } = route.params;

    const [chapterData, setChapterData] = useState<chapterData>({
        hash: '',
        pages: []
    });

    const [activePage, setPage] = useState(0);

    const back = () => {
        if (activePage > 0) {
            setPage(activePage - 1)
        }
    }

    const next = () => {
        if (activePage < chapterData.pages.length - 1) {
            setPage(activePage + 1)
        }
    }

    useEffect(() => {
        mangaApi.getChapterData(chapterId).then(chapterData => {
            setChapterData(chapterData)
        })

    }, [])

    return (
        <View style={Styles.container}>
            <StatusBar backgroundColor='black' />
            <Image style={Styles.image} source={{ uri: `https://uploads.mangadex.org/data/${chapterData.hash}/${chapterData.pages[activePage]}` }} />
            <TouchableOpacity style={Styles.backButton} onPress={() => activePage > 0 ? setPage(activePage - 1) : null}></TouchableOpacity>
            <TouchableOpacity style={Styles.nextButton} onPress={() => activePage < chapterData.pages.length - 1 ? setPage(activePage + 1) : null}></TouchableOpacity>
        </View>
    )
}