import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, View, ActivityIndicator, FlatList, Image, Pressable } from 'react-native';
import { getEpisodeInfo } from '../appstate/actions/ApiCalls'
import { setTempData } from '../appstate/actions/TempData'
import { connect } from 'react-redux';

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
                showCharacterDetails(item)
            }}>
                <Image
                    source={{ uri: item.image }}
                    style={{ width: 50, height: 50 }}
                />
                <Text>{item.name}</Text>
            </Pressable>
        )
    }

    const showCharacterDetails = (data) => {
        props.setTempData(data)
        props.navigation.navigate('CharacterDetails')
    }

    return (
        <SafeAreaView>
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
                        <View>
                            <Text>{props.episodeDetails.name}</Text>
                            <Text>{props.episodeDetails.air_date}</Text>
                            <Text>Seson: {parseInt(props.episodeDetails.episode.split('S').pop().split('E')[0])}</Text>
                            <Text>Episode number: {parseInt(props.episodeDetails.episode.split('E').pop())}</Text>
                            <Text>Characters:</Text>
                            <FlatList
                                data={props.characterList}
                                keyExtractor={item => item.id}
                                renderItem={renderCharacters}
                                numColumns={3}
                            />
                        </View>}
                </>
            }

        </SafeAreaView>
    );
}

function mapStateToProps(state) {
    console.log(state);
    return {
        url: state.TempDataReducer.tempData,
        episodeDetails: state.ApiReducer.episodeDetails,
        characterList: state.ApiReducer.characterList,

    }
}

export default connect(mapStateToProps, { getEpisodeInfo, setTempData })(EpisodeInfo);