import { StyleSheet, Dimensions } from "react-native";

export const Styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    topContainer: {
        
    },
    title: {
        position: 'absolute',
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
        top: 70,
        alignSelf: 'center'
    },
    image: {
        width: Dimensions.get('window').width,
        height: 300,
        resizeMode: 'cover'
    },
    chapterList: {
        padding: 20,
        backgroundColor: '#fff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        marginTop: -20
        
    },
    chapter: {
        backgroundColor: '#F4F3FD',
        padding: 10,
        borderRadius: 10,
        marginBottom: 5
    }
})