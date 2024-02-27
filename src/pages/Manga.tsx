import { View, Text, ScrollView, TouchableOpacity, Image, FlatList, LogBox, StyleSheet  } from 'react-native'
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

            {/* like button */}
            <View style={Styles.likeContainer}>
                <TouchableOpacity
                    style={Styles.likeButton}
                    onPress={likeManga}
                >
                    <Ionicons
                        name={isLiked ? 'heart' : 'heart-outline'}
                        size={34}
                        color={isLiked ? 'red' : 'black'}
                    />
                </TouchableOpacity> 
            </View>

            <View style={Styles.coverContainer}>
                <Image
                    source={{ uri: manga.cover }}
                    style={Styles.cover}
                />
            </View>

            <View style={Styles.infoContainer}>
                <Text style={Styles.title}>{manga.title}</Text>
                <Text style={Styles.year}>{manga.year}</Text>
                <Text style={Styles.year}>{manga.status}</Text>
                <Text>{manga.lastChapter}</Text>
                <Text>{manga.description}</Text>
            </View>

            <View style={Styles.chaptersContainer}>
                <FlatList
                    data={chapters}
                    numColumns={5}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={Styles.chapter} onPress={() => goToChapter(item.id)}>
                            <View>
                                <Text>{item.chapter}</Text>
                            </View>
                        </TouchableOpacity>
                    )}
                    keyExtractor={(item) => item.id}
                    style={{ 
                        width: '100%',
                     }}
                    contentContainerStyle={{ 
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        /* gap */
                        paddingVertical: 10
                     }}
                />
            </View>
            
        </ScrollView>
    )
}

const Styles = StyleSheet.create({
    container: {
        flex: 1
    },
    likeContainer: {
        position: 'absolute',
        top: 10,
        right: 10,
        padding: 10
    },
    likeButton: {
        padding: 10
    },
    coverContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 20
    },
    cover: {
        width: 200,
        height: 300,
        borderRadius: 30,
        resizeMode: 'contain'
    },
    infoContainer: {
        padding: 20,
        alignItems: 'center'
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    year: {
        fontSize: 12,
        paddingVertical: 5,
        color: '#666',
        textAlign: 'center',
    },
    chaptersContainer: {
        paddingHorizontal: 20
    },
    chapter: {
        width: 70,
        height: 50,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
        borderColor: '#d4d4d4',
        borderWidth: 1
    }
})