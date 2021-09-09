import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, View, ActivityIndicator, FlatList, Pressable, StyleSheet } from 'react-native';
import { getEpisodes } from '../appstate/actions/ApiCalls';
import { setTempData } from '../appstate/actions/TempData';
import { connect } from 'react-redux';
import { styles } from '../constants/styles';
import { Image, Card, Button } from 'react-native-elements'
import { colors } from '../constants';

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
        props.navigation.navigate('EpisodeInfo', { name: name })
    }

    const fetchAfterError = () => {
        setError(false)
        setLoading(true)
        getEpisodesList()
    }

    const renderList = ({ item }) => {
        return (
            <Pressable
                onPress={() => goToEpisodeInfo(item.url, item.name)}>
                <Card containerStyle={styles.cardStyle}>
                    <View style={{ flexDirection: 'row' }}>
                        <Image
                            source={require('../assets/images/controler.png')}
                            style={{ width: 30, height: 30, marginRight: 10 }}
                        />
                        <View style={{ flex: 1 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={stylesLocal.title}>{item.name}</Text>
                            </View>
                            <Text style={{ fontStyle: 'italic' }}>Seson {parseInt(item.episode.split('S').pop().split('E')[0])} Episode {parseInt(item.episode.split('E').pop())}</Text>
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
                <View style={{ alignItems: 'center' }}>
                    <Text style={{ textAlign: 'center', marginTop: 10 }}>Ooops something went wrong</Text>
                    <Button
                        title='Try again'
                        onPress={fetchAfterError}
                        buttonStyle={styles.errorBtn}
                    />
                </View>
                :
                <>
                    {loading ?
                        <View style={styles.loadingViewStyle}>
                            <ActivityIndicator size="large" color='grey' />
                        </View>
                        :
                        <View style={{ flex: 1 }} nestedScrollEnabled={true}>
                            <FlatList
                                data={props.episodes}
                                keyExtractor={item => item.id}
                                renderItem={renderList}
                                style={stylesLocal.episodeList}
                                bounces={false}
                                ListHeaderComponent={() => {
                                    return (
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
    },
    imageStyle: {
        width: '100%',
        height: 200,
        resizeMode: 'contain',
    },
    title: { 
        color: colors.GREEN, 
        fontSize: 17, 
        flex: 1, 
        flexWrap: 'wrap' }
})