import { StyleSheet } from 'react-native';
import { colors } from '../constants'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.LIGHTGREY
    },
    cardStyle: {
        margin:5,
        borderRadius:0,
        borderColor:colors.BLUE, 
        padding:10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6,
    },
    rowView: {
        justifyContent:'space-between',
        flexDirection:'row'
    },
    title: {
        fontWeight:'bold',
        fontSize:17
    },
    loadingViewStyle: {
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center'
    },
    errorBtn: {
        width: 100, 
        margin: 10, 
        backgroundColor: colors.GREEN
    }
})

export { styles }