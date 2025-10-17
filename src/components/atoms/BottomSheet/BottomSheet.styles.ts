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
        elevation: 24,
        padding: 20,
    },
    handle: {
        alignSelf: 'center',
        width: 80,
        height: 6, borderRadius: 10,
        backgroundColor: '#444',
        marginBottom: 8,
    },
    handleContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: 30,
    }
})