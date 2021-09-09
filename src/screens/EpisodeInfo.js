import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, View, ActivityIndicator, FlatList, Pressable, Dimensions } from 'react-native';
import { getEpisodeInfo } from '../appstate/actions/ApiCalls'
import { setTempData } from '../appstate/actions/TempData'
import { connect } from 'react-redux';
import { styles } from '../constants/styles';
import { Button, Card, Image } from 'react-native-elements'

const WIDTH = Dimensions.get('window').width

const EpisodeInfo = (props) => {

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)


    useEffect(() => {
        getEpisodeDetails()
    }, [])

    const getEpisodeDetails = () => {
        props.getEpisodeInfo(props.url)
            .then(
                () => {
                    setLoading(false)
                },
                () => {
                    setError(true)
                })
    }

    const renderCharacters = ({ item }) => {
        return (
            <Pressable onPress={() => {
                showCharacterDetails(item, item.name)
            }}>
                <Card containerStyle={[styles.cardStyle, { width: WIDTH * .3, height: WIDTH * .3 + 40, padding: 0, justifyContent: 'space-between', alignItems: 'center' }]} >
                    <Image
                        source={{ uri: item.image }}
                        style={{ width: '100%', aspectRatio: 1 / 1, resizeMode: 'stretch', overflow: 'visible', }}
                    />
                    <Text style={{ textAlign: 'center' }} numberOfLines={2}>{item.name}</Text>
                </Card>
            </Pressable>
        )
    }

    const showCharacterDetails = (data, name) => {
        props.setTempData(data)
        props.navigation.navigate('CharacterDetails', { name: name })
    }

    const fetchAfterError = () =>{
        setError(false)
        setLoading(true)
        getEpisodeDetails()
    }

    return (
        <SafeAreaView style={styles.container}>
            {error ?
                <View>
                    <Text style={{textAlign:'center', marginTop:10}}>Ooops something went wrong</Text>
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
                        <View style={{ flex: 1 }}>
                            <View style={{ padding: 10 }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={styles.title}>Title: </Text>
                                    <Text style={{fontSize: 17}}>{props.episodeDetails.name}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={styles.title}>Release date: </Text>
                                    <Text style={{fontSize: 17}}>{props.episodeDetails.air_date}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={styles.title}>Seson: </Text>
                                    <Text style={{fontSize: 17}}>{parseInt(props.episodeDetails.episode.split('S').pop().split('E')[0])}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={styles.title}>Episode: </Text>
                                    <Text style={{ fontSize: 17 }}>{parseInt(props.episodeDetails.episode.split('E').pop())}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={styles.title}>Release date: </Text>
                                    <Text style={{fontSize: 17}}>{props.episodeDetails.air_date}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={styles.title}>Characters: </Text>
                                </View>
                            </View>
                            <FlatList
                                data={props.characterList}
                                keyExtractor={item => item.id}
                                renderItem={renderCharacters}
                                numColumns={3}
                                contentContainerStyle={{ marginBottom: 30 }} />
                        </View>}
                </>
            }

        </SafeAreaView>
    );
}

function mapStateToProps(state) {
    return {
        url: state.TempDataReducer.tempData,
        episodeDetails: state.ApiReducer.episodeDetails,
        characterList: state.ApiReducer.characterList,
    }
}

export default connect(mapStateToProps, { getEpisodeInfo, setTempData })(EpisodeInfo);