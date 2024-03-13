import { StyleSheet, Platform } from "react-native";

export const Styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black'
    },
    mangaContainer: {

        height: '100%',
        backgroundColor: 'black'
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain'
    },
    backButton: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        width: 70,
        padding: 10,
    },
    nextButton: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        width: 70,
        padding: 10,
    },
    pageNumber: {
        position: 'absolute',
        bottom: 0,
        right: 10,
        padding: 10,
        color: 'white'
    }
})