import { StyleSheet, Platform } from 'react-native';

export const Styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingTop: Platform.OS === 'android' ? 50 : 0,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        backgroundColor: '#F4F3FD',
        borderRadius: 10,
    },
    input: {
        width: '100%',
        paddingVertical: 10,
        paddingHorizontal: 20
    },
    CardsContainer: {
        paddingVertical: 20,
    },
    card: {
        flexDirection: 'row',
        marginBottom: 20,
        backgroundColor: '#F4F3FD'
    },
    cardImage: {
        width: 100,
        height: 100
    },
    cardContent: {
        marginLeft: 20
    },
    cardTitle: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    cardyear: {
        
    },
    cardStatus: {
        
    }
});