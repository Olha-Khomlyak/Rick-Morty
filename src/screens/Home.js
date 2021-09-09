import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, View, ActivityIndicator, FlatList, Pressable, Dimensions, ScrollView, StyleSheet } from 'react-native';
import { getEpisodes } from '../appstate/actions/ApiCalls';
import { setTempData } from '../appstate/actions/TempData';
import { connect } from 'react-redux';
import { styles } from '../constants/styles';
import { Image, Card } from 'react-native-elements'
import { colors } from '../constants';

const HEIGHT = Dimensions.get('window').height
const WIDTH = Dimensions.get('window').width

const Home = (props) => {

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)


    useEffect(() => {
        getEpisodesList()
    }, [])


    const getEpisodesList = () => {
        props.getEpisodes('2').then(
            () => {
                setLoading(false)
            },
            () => {
                setError(true)
                setLoading(false)
            })
    }

    const goToEpisodeInfo = (uri, name) => {
        props.setTempData(uri)
        props.navigation.navigate('EpisodeInfo', {name : name})
    }

    const renderList = ({ item }) => {
        return (
            <Pressable
                onPress={() => goToEpisodeInfo(item.url, item.name)}>
                <Card containerStyle={styles.cardStyle}>
                    <View style={{ flexDirection: 'row' }}>
                        <Image
                            source={require('../assets/images/controler.png')}
                            style={{ width: 30, height: 30 , marginRight:10}}
                        />
                        <View style={{flex:1}}>
                            <View style={{ flexDirection: 'row', alignItems:'center' }}> 
                            <Text style={{color:colors.GREEN, fontSize:17, flex:1, flexWrap:'wrap'}}>{item.name}</Text>
                            </View>
                             <Text style={{fontStyle:'italic'}}>Seson {parseInt(item.episode.split('S').pop().split('E')[0])} Episode {parseInt(item.episode.split('E').pop())}</Text>
                            <Text>Released: {item.air_date}</Text>
                        </View>
                    </View>

                </Card>
            </Pressable>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            {error ?
                <View>
                    <Text>Ooops something went wrong</Text>
                </View>
                :
                <>
                    {loading ?
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <ActivityIndicator size="large" color='grey' />
                        </View>
                        :
                         <View style={{ flex:1}} nestedScrollEnabled={true}>
                            <FlatList
                                data={props.episodes}
                                keyExtractor={item => item.id}
                                renderItem={renderList}
                                style={[stylesLocal.episodeList]}
                                ListHeaderComponent={() =>{
                                    return(
                                        <Image
                                            source={require('../assets/images/rick-and-morty.png')}
                                            style={stylesLocal.imageStyle}
                                        />
                                    )
                                }}
                            />
                        </View>
                        }
                </>
            }

        </SafeAreaView>
    );
}

function mapStateToProps(state) {
    console.log(state);
    return {
        episodes: state.ApiReducer.episodeList
    }
}

export default connect(mapStateToProps, { getEpisodes, setTempData })(Home);


const stylesLocal = StyleSheet.create({
    phrase: {
        position: 'absolute',
        bottom: 15,
        left: 5,
        color: colors.WHITE,
        fontSize: 17,
        fontWeight: 'bold'
    },
    episodeList: {
        marginVertical: 15,
        //height: HEIGHT - 100,
    },
    imageStyle: {
        width: '100%',
        height: 200,
        resizeMode: 'contain',
    }
})