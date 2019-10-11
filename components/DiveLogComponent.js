import React from 'react';
import { StyleSheet, View, Text, FlatList, Button } from 'react-native';
import { Card } from 'react-native-elements';


export const DiveLog = (props) => {

    const dives = props.dives;

    const renderDiveItem = ({item, index}) => {
        const {location, date, depth, startTime, endTime, totalTime} = item;
        return(
            <View key={index}>
                <Text>I went diving at {location} on {date}. I started my dive at {startTime} and ended at {endTime} for a total time of {totalTime} time at {depth} feet.</Text>   
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
            <Text>{props.test}</Text>
            <Button 
                    title='Reset Dives'
                    onPress={props.resetDives}
                />
        </Card>
    );
}