import { StyleSheet } from 'react-native';
import { colors } from '../constants'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.LIGHTGREY
    },
    cardStyle: {
        margin:5,
        borderRadius:5,
        borderColor:colors.BLUE, 
        padding:10,
        justifyContent:'center'
    }
})

export { styles }