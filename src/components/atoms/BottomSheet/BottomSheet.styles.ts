import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    backdrop: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0)',
    },
    sheetContainer: {
        position: 'absolute',
        left: 0, right: 0, bottom: 0,
    },
    sheet: {
        backgroundColor: '#111',
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        padding: 16,
        elevation: 24,
    },
    handle: {
        alignSelf: 'center',
        width: 40,
        height: 4, borderRadius: 2,
        backgroundColor: '#444',
        marginBottom: 8,
    }
})