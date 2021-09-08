import React from 'react';
import { SafeAreaView, Text, View, Image } from 'react-native';
import { connect } from 'react-redux';

const CharacterDetails = (props) => {
    return (
        <SafeAreaView>
            <View>
                <Text>Character Details</Text>
<Image 
source={{uri: props.info.image}}
style={{width:100, height:100}}
/>
                <Text>{props.info.name}</Text>
            </View>
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
