import { StyleSheet, Platform } from 'react-native';

export const Styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? 0 : 0,
        paddingBottom: 60,
        backgroundColor: 'black'
    },
    likedMangasContainer: {
        paddingHorizontal: 20,
        paddingBottom: 20
    },
    likedMangasText: {
        fontSize: 18
    },
    header: {
        backgroundColor: 'black',
        paddingTop: Platform.OS === 'android' ? 45 : 0,
        paddingBottom: 20
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    emptyText: {
        fontSize: 18
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 20,
        paddingHorizontal: 20,
        backgroundColor: '#fff',
        borderRadius: 50,
        borderColor: '#d4d4d4',
        borderWidth: 1
    },
    input: {
        width: '80%',
        paddingVertical: 10,
        paddingHorizontal: 20
    },
    tagsContainer: {
        flexDirection: 'row',
        height: 40,
        borderRadius: 3,
        marginTop: 20
    },
    tag: {
        margin: 5,
        paddingHorizontal: 10,
        paddingVertical: 5,
        backgroundColor: '#eee',
        borderRadius: 50,
    },
    activeTag: {
        margin: 5,
        paddingHorizontal: 10,
        paddingVertical: 5,
        backgroundColor: '#757575',
        borderRadius: 50,
    },
    tagText: {
        fontSize: 14
    },
    activeTagText: {
        fontSize: 14,
        color: '#fff'
    },
    manga: {
        paddingHorizontal: 10,
        paddingVertical: 10,
        marginBottom: 20,
        backgroundColor: '#fff',
        height: '100%',
        borderRadius: 15,
        borderColor: '#d4d4d4',
        borderWidth: 1
    },
    mangaCover: {
        width: '100%',
        height: 200,
        borderRadius: 15,
    },
    mangaTitle: {
        marginTop: 5,
        fontSize: 14,
        textAlign: 'center',
    },
    mangaYear: {
        marginTop: 5,
        fontSize: 12,
        color: '#666',
        textAlign: 'center',
    },
    mangaStatus: {
        marginTop: 5,
        fontSize: 12,
        color: '#666',
        textAlign: 'center',
    },


    floatingButton: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: 'black',
        borderRadius: 50,
        padding: 10
    }
});