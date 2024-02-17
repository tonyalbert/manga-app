import { View, Text, ScrollView, TouchableOpacity, Image, FlatList } from 'react-native'
import { Styles } from '../styles/MangaPageStyles'
import { mangaApi } from '../utils/mangaDex'
import { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar'

interface Manga {
    id: string
    title: string
    description: string
    year: number
    status: string
    lastVolume: number
    lastChapter: number
    cover: string
    
}

interface chapters {
    id: string
    chapter: number
    pages: number
}

export const MangaPage = ({ route, navigation }) => {

    const { mangaId } = route.params

    const [manga, setManga] = useState<Manga>({
        id: '',
        title: '',
        description: '',
        year: 0,
        status: '',
        lastVolume: 0,
        lastChapter: 0,
        cover: ''
    });

    const [chapters, setChapters] = useState<chapters[]>([]);

    const [isLoading, setIsLoading] = useState(true)

    const goToChapter = (id: string) => {
        navigation.navigate('Chapter', { chapterId: id })
    }

    useEffect(() => {
        mangaApi.getManga(mangaId).then(manga => {
            setManga(manga)
        })

        mangaApi.getMangaChapters(mangaId).then(chapters => {
            setChapters(chapters)
            setIsLoading(false)
        })
    }, [])

    return (
        <ScrollView style={Styles.container}>

            <StatusBar translucent/>
            <View style={Styles.topContainer}>
                <Image source={{ uri: manga.cover }} style={Styles.image} />
                <Text style={Styles.title}>{manga.title}</Text>
            </View>

            {
                chapters.map(chapter => {
                    return (
                        <View style={Styles.chapterList} key={chapter.id}>
                            <TouchableOpacity style={Styles.chapter} onPress={() => goToChapter(chapter.id)}>
                                <Text>{chapter.chapter}</Text>
                            </TouchableOpacity>
                        </View>
                    )
                })
            }
        </ScrollView>
    )
}