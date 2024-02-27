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

}

const dataStorage = new DataStorage();
export default dataStorage;