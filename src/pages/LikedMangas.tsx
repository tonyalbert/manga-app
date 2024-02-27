
import { View, Text, StyleSheet, Platform, TouchableOpacity, FlatList, Image, ScrollView } from 'react-native'
import { useEffect, useState } from 'react'
import { mangaApi } from '../utils/mangaDex'
import dataStorage from '../utils/DataStorage'

export const LikedMangas = ({ navigation }) => {

    const [likedMangas, setLikedMangas] = useState([])

    const goToManga = (id: string) => {
        navigation.navigate('Manga', { mangaId: id })
    }

    useEffect(() => {
        dataStorage.getLikedMangas().then(likedMangas => {

            setLikedMangas(likedMangas)

            mangaApi.getLikedMangas(likedMangas).then(mangas => {
                setLikedMangas(mangas)
                console.log(mangas)
            })
        });

    }, [])

    function truncateText(text = '') {
        if (text.length <= 42) {
            return text;
        }
        return text.substring(0, 30 - 3) + '...';
    }

    return (
        <ScrollView>
        <View style={Styles.container}>
            <View style={Styles.body}>
                {
                    likedMangas.map((manga, index) => (
                        <View style={Styles.cardContainer} key={index}>
                            <TouchableOpacity activeOpacity={1} style={Styles.card} onPress={() => goToManga(manga.id)}>
                                <Image style={Styles.cardImage} source={{ uri: manga.cover }} />
                                <Text style={Styles.cardTitle}>{truncateText(manga.title)}</Text>
                                {manga.year ? <Text style={Styles.cardYear}>{manga.year}</Text> : null}
                            </TouchableOpacity>
                        </View>
                    ))
                }
            </View>
        </View>
        </ScrollView>
    )
}

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? 0 : 0,
        paddingBottom: 60
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