import axios from 'axios';
import dataStorage from '../utils/DataStorage'

axios.defaults.baseURL = 'https://api.mangadex.org';

class MangaApi {

    public async getManga(id: string) {
        const response = await axios.get(`/manga/${id}`,
            {
                params: {
                    includes: ['cover_art']
                }
            }
        );

        const manga = response.data.data;

        const fileName = manga.relationships[2]?.attributes?.fileName || '';

        const data = {
            id: response.data.data.id,
            title: response.data.data.attributes.title.en,
            description: response.data.data.attributes.description.pt ? response.data.data.attributes.description.pt : response.data.data.attributes.description.en,
            year: response.data.data.attributes.year,
            status: response.data.data.attributes.status,
            lastVolume: response.data.data.attributes.lastVolume,
            lastChapter: response.data.data.attributes.lastChapter,
            cover: fileName ? `https://uploads.mangadex.org/covers/${response.data.data.id}/${fileName}` : 'https://th.bing.com/th/id/OIG2.38ZS2m8wm3EbF7odr3Xh?pid=ImgGn'
        }

        return data;
    }

    public async getMangaList(limit: number = 20, title: string = '', includedTags: string[] = [], favoritoTag: boolean = false, favoritos: string[] = []) {

        const response = await axios.get('/manga', {
            params: {
                limit: limit,
                title: title,
                availableTranslatedLanguage: ['pt-br'],
                includedTags: includedTags,
                excludedTags: [],
                includes: ['cover_art'],
            }
        });

        const resApi = response.data.data;

        const mangaList = [];

        for (const manga of resApi) {
            try {
                const fileName = manga.relationships[2]?.attributes?.fileName || '';
                const data = {
                    id: manga.id,
                    title: manga.attributes.title.en,
                    description: manga.attributes.description.pt ? manga.attributes.description.pt : manga.attributes.description.en,
                    year: manga.attributes.year,
                    status: manga.attributes.status,
                    lastVolume: manga.attributes.lastVolume,
                    lastChapter: manga.attributes.lastChapter,
                    cover: fileName ? `https://uploads.mangadex.org/covers/${manga.id}/${fileName}` : 'https://th.bing.com/th/id/OIG2.38ZS2m8wm3EbF7odr3Xh?pid=ImgGn'
                };

                mangaList.push(data);
            } catch (error) {
                console.error('Error processing manga:', error);
            }
        }

        return mangaList;      
    }

    public async getLikedMangas(mangas: string[]) {

        const data: any[] = [];
    
        for (const likedManga of mangas) {
            const response = await axios.get(`/manga/${likedManga}`,
                {
                    params: {
                        includes: ['cover_art']
                    }
                }
            );
            const manga = response.data.data;
    
            const fileName = manga.relationships[2]?.attributes?.fileName || '';
    
            const mangaData = {
                id: manga.id,
                title: manga.attributes.title.en,
                description: manga.attributes.description.pt ? manga.attributes.description.pt : manga.attributes.description.en,
                year: manga.attributes.year,
                status: manga.attributes.status,
                lastVolume: manga.attributes.lastVolume,
                lastChapter: manga.attributes.lastChapter,
                cover: fileName ? `https://uploads.mangadex.org/covers/${manga.id}/${fileName}` : 'https://th.bing.com/th/id/OIG2.38ZS2m8wm3EbF7odr3Xh?pid=ImgGn'
            };
    
            data.push(mangaData);
        }
    
        return data;
    }

    public async getMangaChapters(id: string = 'ab8cbb82-d0ed-45a7-8ffe-4bfa6d43d79c') {
        try {
            const response = await axios.get(`/manga/${id}/aggregate`, {
                params: {
                    translatedLanguage: ['pt-br']
                }
            });

            // Extrair os capítulos da resposta
            const chapters: any[] = this.extractChapters(response.data);

            return chapters;
        } catch (error) {
            console.error('Erro ao obter os dados do servidor:', error);
        }
    }

    private extractChapters(apiResponse: any): any[] {
        const chapters: any[] = [];

        for (const volumeKey in apiResponse.volumes) {
            const volume = apiResponse.volumes[volumeKey];
            for (const chapterKey in volume.chapters) {
                chapters.push(volume.chapters[chapterKey]);
            }
        }

        return chapters;
    }

    public async getChapterData(id: string) {
        const response = await axios.get(`/at-home/server/${id}`);

        const hash = response.data.chapter.hash
        const pages = [];

        response.data.chapter.data.forEach(page => {
            pages.push(`https://uploads.mangadex.org/data/${hash}/${page}`)
        })

        const data = {
            hash: hash,
            pages: pages
        }
        
        return data;
    }

    public async getChapterPages(hash: string, page: string[]) {

        try {
            const response = await axios.get(`https://uploads.mangadex.org/data/${hash}/${page}`);
    
            return response
        } catch (error) {
            console.log(error)
        }
    }

    public async getTags (limit: number = 5) {
        const response = await axios.get('/manga/tag');
        const data = response.data.data;

        const tags = [];

        data.map(tag => {
            const actualTag = {
                id: tag.id,
                name: tag.attributes.name.en
            }
            tags.push(actualTag)
        })

        return tags
    }
    
}

export const mangaApi = new MangaApi();
/* mangaApi.getMangaChapters(); */