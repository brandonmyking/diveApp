import React from 'react';
import { StyleSheet, View, Text, Picker, Switch, Button, Modal, Image, ScrollView, ImageBackground, Dimensions } from 'react-native';
import { Icon, Input } from 'react-native-elements';
import { Notifications } from 'expo';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import ImageZoom from 'react-native-image-pan-zoom';
import { connect } from 'react-redux';
import { addDive } from '../redux/ActionCreators';

const initialState = {
    letter: '',
    ndl: false,
    showModal: false,
    location: '',
    depth: '',
    date: '',
    startTime: '',
    endTime: '',
    totalTime: '',
    ndlExplain: ''
}

const mapDispatchToProps = dispatch => ({
    addDive: (dive) => dispatch(addDive(dive))
});

class AddDive extends React.Component {
    constructor(props) {
        super(props);
        this.state = initialState
    }


    toggleModal() {
        this.setState({showModal: !this.state.showModal});
    }


    async obtainNotificationPermission() {
        let permission = await Permissions.getAsync(Permissions.USER_FACING_NOTIFICATIONS)
        if (permission.status !== 'granted') {
            permission = await Permissions.askAsync(Permissions.USER_FACING_NOTIFICATIONS);
            if (permission.status !== 'granted') {
                Alert.alert('Permission not granted to show notification');
            }
        }
        return permission;
    }

    async presentLocalNotification() {
        let notification = {
            title: 'Your Dive',
            body: JSON.stringify(this.state),
            ios: {
                sound: true,
                _displayInForeground: true
            }
        }
        await this.obtainNotificationPermission();
        Notifications.presentLocalNotificationAsync(notification);
    }

    handleSubmit(dive) {
        this.props.addDive(dive);
        this.presentLocalNotification();
        this.clearForms();
    }

    clearForms() {
        this.setState(initialState)
    }

    getLocation = async () => {
        let locationPermission = await Permissions.askAsync(Permissions.LOCATION);
        if (locationPermission.status === 'granted') {
            let latLong = await Location.getCurrentPositionAsync({});
            let location = await Location.reverseGeocodeAsync({latitude: latLong.coords.latitude, longitude: latLong.coords.longitude});
            let {city, region, name} = location[0];
            this.setState({location: `${name} ${city}, ${region}`});
        }
        
    }

    
    render() {
        return(
            <View style={styles.container}>
                <Input 
                    placeholder='Date'
                    leftIcon={{type: 'font-awesome', name: 'calendar-plus-o'}} 
                    onChangeText={date => this.setState({date})}
                    value={this.state.date}
                    containerStyle={styles.formInput}
                    leftIconContainerStyle={styles.leftIcon}  
                />
                <Input 
                    placeholder='Location'
                    leftIcon={{type: 'font-awesome', name: 'compass', size: 30}} 
                    onChangeText={location => this.setState({location})}
                    value={this.state.location}
                    containerStyle={styles.formInput}
                    leftIconContainerStyle={styles.leftIcon}  
                />
                <Button 
                        title='Use Current Location'
                        color='green'
                        onPress={this.getLocation}
                        accessibilityLabel='Find the current location'
                    />
                <Input 
                    placeholder='Depth'
                    leftIcon={{name: 'swap-vert', size: 30}} 
                    onChangeText={depth => this.setState({depth})}
                    value={this.state.depth}
                    containerStyle={styles.formInput}
                    leftIconContainerStyle={styles.leftIcon}  
                />
                <Input 
                    placeholder='Start Time'
                    leftIcon={{type: 'font-awesome', name: 'clock-o'}} 
                    onChangeText={startTime => this.setState({startTime})}
                    value={this.state.startTime}
                    containerStyle={styles.formInput}
                    leftIconContainerStyle={styles.leftIcon}  
                />
                <Input 
                    placeholder='End Time'
                    leftIcon={{type: 'font-awesome', name: 'clock-o'}} 
                    onChangeText={endTime => this.setState({endTime})}
                    value={this.state.endTime}
                    containerStyle={styles.formInput}
                    leftIconContainerStyle={styles.leftIcon}  
                />
                <Input 
                    placeholder='Total Time'
                    leftIcon={{type: 'font-awesome', name: 'clock-o'}} 
                    onChangeText={totalTime => this.setState({totalTime})}
                    value={this.state.totalTime}
                    containerStyle={styles.formInput}
                    leftIconContainerStyle={styles.leftIcon}  
                />
                <Input 
                    placeholder='Dive Letter'
                    leftIcon={{name: 'sort-by-alpha'}} 
                    onChangeText={letter => this.setState({letter})}
                    value={this.state.letter}
                    containerStyle={styles.formInput}
                    leftIconContainerStyle={styles.leftIcon}  
                />
                <Button 
                    title='View NOAA tables'
                    style={styles.formLabel}
                    onPress={() => this.toggleModal()}
                />
                    
                <View style={styles.formRow}>
                    <Text style={styles.formLabel}>50% of NDL exceeded?</Text>
                    <Switch
                        style={styles.formItem}
                        value={this.state.ndl}
                        trackColor='#512DA8'
                        onValueChange={(value) => this.setState({ndl: value})}
                    >
                    </Switch>
                </View>
                {this.state.ndl && 
                    <Input 
                        placeholder='Please explain'
                        leftIcon={{style: 'font-awesome', name: 'comment'}} 
                        onChangeText={ndlExplain => this.setState({ndlExplain})}
                        value={this.state.ndlExplain}
                        containerStyle={styles.formInput}
                        leftIconContainerStyle={styles.leftIcon}  
                    />
                }
                <View style={styles.formRow}>
                    <Button 
                        title='Add'
                        color='blue'
                        onPress={() => this.handleSubmit(this.state)}
                        accessibilityLabel='Add a new dive'
                    />
                    <Button 
                        title='Clear'
                        color='gray'
                        onPress={() => this.clearForms()}
                        accessibilityLabel='Clear current entries'
                    />
                </View>
                <Modal
                    transparent={false}
                    visible={this.state.showModal}
                    onRequestClose={() => this.toggleModal()}
                >
                    <View>
                        <ImageZoom
                            cropHeight={Dimensions.get('window').height}
                            cropWidth={Dimensions.get('window').width}
                            imageHeight={Dimensions.get('window').height}
                            imageWidth={Dimensions.get('window').width}
                        >
                        <ImageBackground 
                            source={require('../assets/images/NOAA.jpg')}
                            resizeMode='contain'
                            style={{width: '100%', height: '90%', justifyContent: 'flex-end'}}
                        >
                        <Button 
                                onPress={() => this.toggleModal()}
                                color='green'
                                title='Close'
                            />
                        </ImageBackground>

                        </ImageZoom>
                        
                        
                        
                    </View>
                </Modal>
            </View>
        );
    }
    
}

const styles = StyleSheet.create({
    formRow: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
        margin: 10,
    },
    formLabel: {
        fontSize: 18,
        flex: 2
    },
    formItem: {
        flex: 1
    },
    modal: {
        justifyContent: 'center',
        margin: 40,
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'black',
        marginBottom: 20
    },
    formInput: {
        margin: 10
    },
    leftIcon: {
        marginRight: 10
    },
    container: {
        justifyContent: 'center',
        margin: 20
    },
})

export default connect(null, mapDispatchToProps)(AddDive);