import React from 'react';
import { StyleSheet, View, Text, FlatList, Button } from 'react-native';
import { Card } from 'react-native-elements';


export const DiveLog = (props) => {

    const dives = props.dives;

    const renderDiveItem = ({item, index}) => {
        return(
            <View key={index}>
                <Text>{item.location}</Text>
                <Text>{item.date}</Text>
            </View>
        );
    }

    return(
        <Card>
            <FlatList 
                data={dives}
                renderItem={renderDiveItem}
                keyExtractor={item => item.id.toString()}
            />
            <Button 
                    title='Reset Dives'
                    onPress={props.resetDives}
                />
        </Card>
    );
}