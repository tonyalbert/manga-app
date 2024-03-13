
import { 
    View, 
    Text, 
    TextInput, 
    Image, 
    ScrollView, 
    TouchableOpacity, 
    StyleSheet, 
    Platform, 
    LogBox, 
    ActivityIndicator,
    RefreshControl,
    Button
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { mangaApi } from '../utils/mangaDex';
import { useEffect, useState, useCallback, useContext } from 'react';
import dataStorage from '../utils/DataStorage';
import axios from 'axios';
import { FlatList } from 'react-native-gesture-handler';
import ConfigContext from '../context/configContext';

interface mangaList {
    id: string
    title: string
    description: string
    year: number
    status: string
    lastVolume: number
    lastChapter: number
    cover: string
}

export const Home = ({ navigation }: { navigation: any }) => {

    const [mangaList, setMangaList] = useState([]);

    const [refreshing, setRefreshing] = useState(false);

    const [favoritesMangas, setFavoritesMangas] = useState([]);

    const [tags, setTags] = useState([]);

    const [activeTag, setActiveTag] = useState('');

    const [isLoading, setIsLoading] = useState(true);

    const goToManga = (id: string) => {
        navigation.navigate('Manga', { mangaId: id })
    }

    const goToFavoriteManga = () => {
        navigation.navigate('Favoritos')
    }

    const filterManga = (title: string) => {
        setActiveTag('');
        mangaApi.getMangaList(5, title).then(mangaList => {
            setMangaList(mangaList);
        })
    }

    const filterTags = (tag: string) => {
        setIsLoading(true);
        setActiveTag(tag);
        if (activeTag === tag) {
            setActiveTag('');
            mangaApi.getMangaList().then(mangaList => {
                setMangaList(mangaList);
                setIsLoading(false);
            })
            return;
        }
        mangaApi.getMangaList(10, '', [tag]).then(mangaList => {
            setMangaList(mangaList);
            setIsLoading(false);
        })
    }

    const atualizarFavoritos = () => {
        dataStorage.getLikedMangas().then(likedMangas => {

            setFavoritesMangas(likedMangas)

            mangaApi.getLikedMangas(likedMangas).then(mangas => {
                setFavoritesMangas(mangas)
            })
        });
    }

    const getMangaListAndTags = () => {
        setIsLoading(true);
        mangaApi.getMangaList().then(mangaList => {
            setMangaList(mangaList);
            setIsLoading(false);
            setRefreshing(false);
        })

        mangaApi.getTags().then(tags => {
            setTags(tags);
        })
    }

    useEffect(() => {

        getMangaListAndTags();

        dataStorage.getLikedMangas().then(likedMangas => {

            setFavoritesMangas(likedMangas)

            mangaApi.getLikedMangas(likedMangas).then(mangas => {
                setFavoritesMangas(mangas)
            })
        });

        LogBox.ignoreLogs(['VirtualizedLists should never be nested']);

    }, [])

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setActiveTag('');
        getMangaListAndTags();
        atualizarFavoritos();
      }, []);

    function truncateText(text = '') {
        if (text.length <= 42) {
          return text;
        }
        return text.substring(0, 15 - 3) + '...';
      }

    return (
        <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />} style={Styles.container}>
            <StatusBar backgroundColor="#EB5757" style="light" />
            
            <View style={Styles.header}>
               
                <View style={Styles.welcome}>
                    <View>
                        <Text style={Styles.welcomeText}>Welcome to MangaRabbit</Text>
                        <Text style={Styles.welcomeSubText}>Explore the world of manga</Text>
                    </View>
                </View>

                <View style={Styles.inputContainer}>
                    <Ionicons name="search" size={24} color="#8E8E93" />
                    <TextInput onChangeText={filterManga} placeholder="Search here" style={Styles.input} />
                    <TouchableOpacity activeOpacity={1} onPress={goToFavoriteManga}>
                        <Ionicons name="heart" size={24} color="#EB5757" />
                    </TouchableOpacity>
                </View>

                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={Styles.tagsContainer}>
                    <TouchableOpacity activeOpacity={1} style={activeTag === '' ? Styles.tagActive : Styles.tag} onPress={() => filterManga('')}>
                        <Text style={Styles.tagText}>All</Text>
                    </TouchableOpacity>
                    {tags.map((tag, index) => (
                        <TouchableOpacity activeOpacity={1} style={activeTag === tag.id ? Styles.tagActive : Styles.tag} key={index} onPress={() => filterTags(tag.id)}>
                            <Text style={Styles.tagText}>{tag.name}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>

                
            </View>
            
            {!isLoading && activeTag === '' ? <Text style={Styles.title}>Popular mangas</Text> : null}
            <View style={Styles.body}>
                <View style={{flex: 1, width: '100%'}}>
                    {isLoading ? <ActivityIndicator size="large" color="#EB5757" />: null}
                </View>
                {!isLoading ?
                    mangaList.map((manga, index) => (
                        <View style={Styles.cardContainer} key={index}>
                            <TouchableOpacity activeOpacity={1} style={Styles.card} onPress={() => goToManga(manga.id)}>
                                <Image style={Styles.cardImage} source={{ uri: manga.cover }} />
                                <Text style={Styles.cardTitle}>{truncateText(manga.title)}</Text>
                                {manga.year ? <Text style={Styles.cardYear}>{manga.year}</Text> : null}
                            </TouchableOpacity>
                        </View>
                    ))
                : null}
            </View>

        </ScrollView>
    )
}

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        
    },
    header: {
        paddingTop: Platform.OS === 'android' ? 45 : 0,
    },
    welcome: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 15,
    },
    welcomeText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#EB5757'
    },
    welcomeSubText: {
        fontSize: 18,
        marginTop: 5,
        marginBottom: 20,
        fontWeight: '300',
        color: '#000'
    },
    inputContainer: {
        flexDirection: 'row',
        borderColor: '#8E8E93',
        borderWidth: 1,
        borderRadius: 10,
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 15,
        marginHorizontal: 15,
    },
    input: {
        flex: 1,
        marginLeft: 10
    },
    tagsContainer: {
        marginVertical: 20,
        paddingHorizontal: 15
    },
    tag: {
        marginRight: 10,
        backgroundColor: '#EB5757',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 10
    },
    tagActive: {
        marginRight: 10,
        backgroundColor: 'black',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 10
    },
    tagText: {
        color: '#fff'
    },
    favoritesContainer: {

    },
    title: {
        fontSize: 18,
        paddingHorizontal: 20,
        fontWeight: '300',
        color: '#000'
    },
    favoritesList: {
        
    },
    favorites: {
        marginRight: 10,
        paddingHorizontal: 10,
        width: 150,
    },
    lastItemMargin: {
        marginRight: 10, // Ou a margem que você deseja aplicar ao último item
    },
    favoritesImage: {
        width: 150,
        height: 250,
        borderRadius: 15
    },
    favoritesTitle: {
        marginTop: 5,
        fontSize: 14,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    favoritesYear: {
        marginTop: 5,
        fontSize: 12,
        color: '#666',
        textAlign: 'center',
    },
    body: {
        height: '100%',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    cardContainer: {
        width: '50%',
        padding: 10,
        alignItems: 'center',
    },
    card: {
        padding: 10,
        borderRadius: 15,
        alignItems: 'center',
    },
    cardImage: {
        width: 150,
        height: 250,
        borderRadius: 15
    },
    cardTitle: {
        marginTop: 5,
        fontSize: 14,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    cardYear: {
        marginTop: 5,
        fontSize: 12,
        color: '#666',
        textAlign: 'center',
    }
})