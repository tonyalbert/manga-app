import { StyleSheet, Dimensions } from "react-native";

export const Styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    cover: {
        width: '100%',
        height: Dimensions.get('window').height * 0.4,
        resizeMode: 'contain',
        marginBottom: 20
    },
    infoContainer: {
        padding: 20,
        backgroundColor: '#fff',
    },
    likeContainer: {
        position: 'absolute',
        top: 10,
        right: 10,
        padding: 10
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center'
    },
    description: {
        fontSize: 14,
        marginBottom: 20,
        textAlign: 'center'
    },
    chapter: {
        backgroundColor: 'black',
        padding: 10,
        paddingHorizontal: 20,
        marginBottom: 5,
        borderColor: 'black',
        borderWidth: 1,
        marginTop: 20,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomRightRadius: 30,
        marginHorizontal: 20
    },
    chapterText: {
        color: 'white',
        fontSize: 20,
    }
})