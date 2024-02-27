import { View, Text, ScrollView, TouchableOpacity, Image, FlatList, LogBox  } from 'react-native'
import { Styles } from '../styles/MangaPageStyles'
import { mangaApi } from '../utils/mangaDex'
import { useEffect, useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import dataStorage from '../utils/DataStorage'

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

    const [isLoading, setIsLoading] = useState(true);

    const [isLiked, setIsLiked] = useState(false)

    const likeManga = async () => {
        const likedMangas = await dataStorage.getLikedMangas()

        if (likedMangas.includes(manga.id)) {
            await dataStorage.UnLikeManga(manga.id)
            setIsLiked(false)
        } else {
            await dataStorage.LikeManga(manga.id)
            setIsLiked(true)
        }
    }

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

        dataStorage.getLikedMangas().then(likedMangas => {
            setIsLiked(likedMangas.includes(mangaId))
        })

        LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    }, [])

    useEffect(() => {
        dataStorage.getLikedMangas().then(likedMangas => {
            setIsLiked(likedMangas.includes(mangaId))
        })
    }, [isLiked])

    return (
        <ScrollView style={Styles.container}>

            <View style={Styles.container}>
                <View style={{ position: 'relative', backgroundColor: '#000', width: '100%', height: 220 }}>
                    { manga.cover 
                        ? <Image style={{ width: '100%', height: '100%' }} source={{ uri: manga.cover }} />
                        : <Ionicons name="book-outline" size={100} color="#fff" />
                    }
                </View>

                
                {/* Like manga */}
                <View style={Styles.likeContainer}>
                    <TouchableOpacity
                        onPress={() => likeManga()}
                    >
                        { isLiked
                            ? <Ionicons name="heart" size={36} color="#FF0000" />
                            : <Ionicons name="heart" size={36} color="#000" />
                        }
                    </TouchableOpacity>
                </View>


                <View style={Styles.infoContainer}>
                    <Text style={Styles.title}>{manga.title}</Text>
                    <Text style={Styles.description}>{manga.description}</Text>  
                    <Text style={Styles.description}>Status: {manga.status}</Text>
                    <Text style={Styles.description}>Ano: {manga.year}</Text>
                </View>
            </View>

            <FlatList
                data={chapters}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={Styles.chapter}
                        onPress={() => goToChapter(item.id)}
                    >
                        <Text style={Styles.chapterText}>{item.chapter}</Text>
                        <Ionicons name="chevron-forward-outline" size={24} color="#d4d4d4" />
                    </TouchableOpacity>
                )}
                keyExtractor={item => item.id}
            />
            
        </ScrollView>
    )
}