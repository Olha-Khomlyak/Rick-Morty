import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/Home'
import EpisodeInfo from '../screens/EpisodeInfo'
import CharacterDetails from '../screens/CharacterDetails'
import { colors } from '../constants';

const Stack = createNativeStackNavigator();

export default function Navigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Home"
                    component={Home}
                    options={{
                        headerShown: false
                    }}
                />
                <Stack.Screen
                    name="EpisodeInfo"
                    component={EpisodeInfo}
                    options={({ route, navigation }) => ({
                        title: route.params.name,
                        headerStyle: {
                            backgroundColor: colors.LIGHTGREY,
                        },
                    })}
                />
                <Stack.Screen name="CharacterDetails" component={CharacterDetails} 
                    options={({ route, navigation }) => ({
                        title: route.params.name,
                        headerStyle: {
                            backgroundColor: colors.LIGHTGREY,
                        },
                    })}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}