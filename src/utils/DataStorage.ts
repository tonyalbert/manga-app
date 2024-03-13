import AsyncStorage from '@react-native-async-storage/async-storage';

class DataStorage {
    private static likedMangas: string[] = [];

    public async LikeManga(id: string) {
        DataStorage.likedMangas.push(id);
        await AsyncStorage.setItem('likedMangas', JSON.stringify(DataStorage.likedMangas));
    }

    public async UnLikeManga(id: string) {
        if (!DataStorage.likedMangas.includes(id)) {
            return;
        }
        const index = DataStorage.likedMangas.indexOf(id);
        if (index > -1) {
            DataStorage.likedMangas.splice(index, 1);
            await AsyncStorage.setItem('likedMangas', JSON.stringify(DataStorage.likedMangas));
        }
    }

    public async getLikedMangas() {
        const likedMangas = await AsyncStorage.getItem('likedMangas');
        if (likedMangas) {
            DataStorage.likedMangas = JSON.parse(likedMangas);
        }
        return DataStorage.likedMangas;
    }

    /* clear */
    public async clearLikedMangas() {
        DataStorage.likedMangas = [];
        await AsyncStorage.setItem('likedMangas', JSON.stringify(DataStorage.likedMangas));
    }

    public async saveLastReadChapter(mangaId: string, chapterId: string) {
        try {
            const key = `readChapters_${mangaId}`;

            const existingChapters = await AsyncStorage.getItem(key);
            let updatedChapters = [];
    
            if (existingChapters) {
                updatedChapters = JSON.parse(existingChapters);
            }
    
            updatedChapters.push(chapterId);
    
            await AsyncStorage.setItem(key, JSON.stringify(updatedChapters));
        } catch (error) {
            console.error('Erro ao salvar o último capítulo lido:', error);
        }
    }

    public async getReadChapters(mangaId: string) {
        try {
            const key = `readChapters_${mangaId}`;
            const readChapters = await AsyncStorage.getItem(key);
            return readChapters ? JSON.parse(readChapters) : [];
        } catch (error) {
            console.error('Erro ao obter os capítulos lidos:', error);
            return [];
        }
    }

}



const dataStorage = new DataStorage();
export default dataStorage;