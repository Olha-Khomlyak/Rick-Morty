import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, View, ActivityIndicator, FlatList } from 'react-native';
import { getEpisodes } from '../appstate/actions/ApiCalls';
import { connect } from 'react-redux';

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
            })
    }

const renderList = ({item}) => {
    return(
        <View style={{borderWidth:1, margin:5}}>
            <Text>{item.name}</Text>
            <Text>{item.air_date}</Text>
        </View>
    )
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
                            <Text>HOME</Text>
                            <FlatList 
                            data={props.episodes}
                            keyExtractor={item => item.id}
                            renderItem={renderList}
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
        episodes: state.ApiReducer.episodeList
    }
}

export default connect(mapStateToProps, { getEpisodes })(Home);
