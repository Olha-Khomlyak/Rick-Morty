import React from 'react';
import { SafeAreaView, Text, View, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { styles } from '../constants/styles';
import { Card, Image } from 'react-native-elements'
import { colors } from '../constants';

const HEIGHT = Dimensions.get('window').height
const WIDTH = Dimensions.get('window').width

const CharacterDetails = (props) => {
    return (
        <SafeAreaView style={styles.container}>
            <Card containerStyle={[styles.cardStyle, { justifyContent: 'flex-start' }]}>
                <Image
                    source={{ uri: props.info.image }}
                    style={{ width: '100%', aspectRatio: 1 / 1, overflow: 'hidden' }}
                />
                <View style={{marginTop:10}}>
                <View style={styles.rowView}>
                    <Text style={styles.title}>Name:</Text>
                        <Text style={[styles.title, {color:colors.GREEN}]}>{props.info.name}</Text>
                </View>
                <View style={styles.rowView}>
                    <Text style={styles.title}>Gender:</Text>
                    <Text>{props.info.gender}</Text>
                </View>
                <View style={styles.rowView}>
                    <Text style={styles.title}>Species:</Text>
                    <Text>{props.info.species}</Text>
                </View>
                <View style={styles.rowView}>
                    <Text style={styles.title}>Origin:</Text>
                    <Text>{props.info.origin.name}</Text>
                </View>
                <View style={[styles.rowView,{ marginTop:10}]}>
                    <Text style={styles.title}>Status:</Text>
                        <Text style={{ color: props.info.status == 'Alive' ? colors.GREEN: colors.RED }}>{props.info.status}</Text>
                </View>
                </View>
            </Card>
        </SafeAreaView>
    );
}

function mapStateToProps(state) {
    console.log(state);
    return {
        info: state.TempDataReducer.tempData,

    }
}
export default connect(mapStateToProps, null)(CharacterDetails);
