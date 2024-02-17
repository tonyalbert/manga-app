import axios from 'axios';

axios.defaults.baseURL = 'https://api.mangadex.org';

class MangaApi {

    public async getManga(id: string) {
        const response = await axios.get(`/manga/${id}`);
        
        const data = {
            id: response.data.data.id,
            title: response.data.data.attributes.title.en,
            description: response.data.data.attributes.description.pt ? response.data.data.attributes.description.pt : response.data.data.attributes.description.en,
            year: response.data.data.attributes.year,
            status: response.data.data.attributes.status,
            lastVolume: response.data.data.attributes.lastVolume,
            lastChapter: response.data.data.attributes.lastChapter,
            cover: 'https://multiversoanime.com.br/wp-content/uploads/2024/01/solo-leveling-1200x900.webp'
        }

        return data;
    }

    public async getMangaList(limit: number = 5, title: string = '') {

        const response = await axios.get('/manga', {
            params: {
                limit: limit,
                title: title,
                availableTranslatedLanguage: ['pt-br'],
                includes: ['cover-art']
            }
        });

        const resApi = response.data.data;
        

        const mangaList = [];

        resApi.map(manga => {

            const data = {
                id: manga.id,
                title: manga.attributes.title.en,
                description: manga.attributes.description.pt ? manga.attributes.description.pt : manga.attributes.description.en,
                year: manga.attributes.year,
                status: manga.attributes.status,
                lastVolume: manga.attributes.lastVolume,
                lastChapter: manga.attributes.lastChapter,
                cover: 'https://uploads.mangadex.org/covers/6b1eb93e-473a-4ab3-9922-1a66d2a29a4a/c5a3090c-4ca0-40a2-9102-e0ee0c6dac15.jpg'
            }
            
            mangaList.push(data);
        })

        console.log(mangaList)
        
        return mangaList;
    }

    public async getMangaChapters(id: string) {
        const response = await axios.get(`/manga/${id}/feed`,
        {
            params: {
                translatedLanguage: ['pt-br']
            }
        });

        const chapters = [];

        response.data.data.map(chapter => {
            chapters.push({
                id: chapter.id,
                chapter: chapter.attributes.chapter,
                pages: chapter.attributes.pages
            })
        })

        /* chapters.sort((a, b) => a.chapter - b.chapter); */
        
        return chapters;
    }

    public async getChapter(id: string) {
        const response = await axios.get(`/chapter/${id}`);
        
        return response.data
    }

    public async getChapterData(id: string) {
        const response = await axios.get(`/at-home/server/${id}`);

        const hash = response.data.chapter.hash
        const pages = [];

        response.data.chapter.data.forEach(page => {
            pages.push(page)
        })

        const data = {
            hash: hash,
            pages: pages
        }
        
        return data;
    }

    public async getChapterPages(hash: string, page: string[]) {

        console.log(`https://uploads.mangadex.org/data/${hash}/${page}`)

        try {
            const response = await axios.get(`https://uploads.mangadex.org/data/${hash}/${page}`);
            /* console.log(response) */
    
            return response
        } catch (error) {
            console.log(error)
        }
    }
    
}

export const mangaApi = new MangaApi();