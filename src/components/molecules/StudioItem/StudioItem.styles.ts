import { StyleSheet, Dimensions } from 'react-native';
const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');

export const studioItemStyles = StyleSheet.create({

    studioContainer: {
        width: 150,
        height: 150,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
    studioImage: {
        width: '80%',
        height: '80%'
    }

});