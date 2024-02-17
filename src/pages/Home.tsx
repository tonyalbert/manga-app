
import { View, Text, TextInput, Image, ScrollView, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Styles } from '../styles/HomeStyles';
import { Ionicons } from '@expo/vector-icons';
import { mangaApi } from '../utils/mangaDex';
import { useEffect, useState } from 'react';

export const Home = ({ navigation }: { navigation: any }) => {

    const [mangaList, setMangaList] = useState([]);

    const goToManga = (id: string) => {
        navigation.navigate('Manga', { mangaId: id })
    }

    const filterManga = (title: string) => {
        mangaApi.getMangaList(5, title).then(mangaList => {
            setMangaList(mangaList);
        })
    }

    useEffect(() => {
        mangaApi.getMangaList().then(mangaList => {
            setMangaList(mangaList);
        })
    }, [])

    return (
        <ScrollView style={Styles.container}>
            <StatusBar backgroundColor='#fff' />

            <View style={Styles.inputContainer}>
                <Ionicons name="search" size={24} color="#B8B8D2" />
                <TextInput onChangeText={filterManga} placeholder="Pesquisar" style={Styles.input} />
            </View>

            <View style={Styles.CardsContainer}>
                {
                    mangaList.map(manga => {
                        return (
                            <TouchableOpacity onPress={() => goToManga(manga.id)} key={manga.id} style={Styles.card}>
                                <Image style={Styles.cardImage} source={{ uri: manga.cover }} />
                                <View style={Styles.cardContent}>
                                    <Text style={Styles.cardTitle}>{manga.title}</Text>
                                    <Text style={Styles.cardyear}>{manga.year}</Text>
                                    <Text style={Styles.cardStatus}>{manga.status}</Text>
                                </View>
                            </TouchableOpacity>
                        )
                    })
                }
            </View>

        </ScrollView>
    )
}