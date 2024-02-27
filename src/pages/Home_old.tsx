
import { View, Text, TextInput, Image, ScrollView, TouchableOpacity, TouchableWithoutFeedback, FlatList } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Styles } from '../styles/HomeStyles';
import { Ionicons } from '@expo/vector-icons';
import { mangaApi } from '../utils/mangaDex';
import { useEffect, useState } from 'react';
import axios from 'axios';

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

    const [tags, setTags] = useState([]);

    const [activeTag, setActiveTag] = useState('');

    const goToManga = (id: string) => {
        navigation.navigate('Manga', { mangaId: id })
    }

    const filterManga = (title: string) => {
        setActiveTag('');
        mangaApi.getMangaList(5, title).then(mangaList => {
            setMangaList(mangaList);
        })
    }

    const filterTags = (tag: string) => {
        setActiveTag(tag);
        if (activeTag === tag) {
            setActiveTag('');
            mangaApi.getMangaList().then(mangaList => {
                setMangaList(mangaList);
            })
            return;
        }
        mangaApi.getMangaList(10, '', [tag]).then(mangaList => {
            setMangaList(mangaList);
        })
    }

    useEffect(() => {
        mangaApi.getMangaList().then(mangaList => {
            setMangaList(mangaList);
        })

        mangaApi.getTags().then(tags => {
            setTags(tags);
        })

    }, [])

    function truncateText(text = '') {
        if (text.length <= 42) {
          return text;
        }
        return text.substring(0, 30 - 3) + '...';
      }

    return (
        <ScrollView style={Styles.container}>
            <StatusBar style='light' backgroundColor='#000' />

            <View style={Styles.header}> 
                <View style={Styles.inputContainer}>
                    <Ionicons name="search" size={24} color="#B8B8D2" />
                    <TextInput onChangeText={filterManga} placeholder="Pesquisar" style={Styles.input} />
                </View>
                

                <View style={Styles.tagsContainer}>
                    <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>

                            <TouchableOpacity onPress={() => filterTags('')} style={activeTag === '' ? Styles.activeTag : Styles.tag}>
                                <Text style={activeTag === '' ? Styles.activeTagText : Styles.tagText}>Todos</Text>
                            </TouchableOpacity>

                        {tags.map(tag => (
                            <TouchableOpacity onPress={() => filterTags(tag.id)} style={activeTag === tag.id ? Styles.activeTag : Styles.tag} key={tag.id}>
                                <Text style={activeTag === tag.id ? Styles.activeTagText : Styles.tagText}>{tag.name}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>
            </View>

            <View style={{width: '100%', height: '100%', flexDirection: 'row', flexWrap: 'wrap', paddingTop: 10, backgroundColor: '#fff', borderTopLeftRadius: 30, borderTopRightRadius: 30}}>
                {mangaList.map(manga => (

                    <View key={manga.id} style={{width: '50%', height: 350, paddingHorizontal: 20, paddingVertical: 25}}>
                        <TouchableOpacity style={Styles.manga}  onPress={() => goToManga(manga.id)}>
                            <Image source={{ uri: manga.cover }} style={Styles.mangaCover} />
                            <Text style={Styles.mangaTitle}>{truncateText(manga.title)}</Text>
                            <Text style={Styles.mangaYear}>{manga.year}</Text>
                            <Text style={Styles.mangaStatus}>{manga.status}</Text>
                        </TouchableOpacity>
                    </View>
                ))}
            </View>

        </ScrollView>
    )
}