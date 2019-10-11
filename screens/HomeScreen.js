import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { DiveLog } from '../components/DiveLogComponent';
import { connect } from 'react-redux';
import { resetDives } from '../redux/ActionCreators';

const mapStateToProps = state => {
  return {
    dives: state.dives
  }
}

const mapDispatchToProps = dispatch => ({
  resetDives: () => dispatch(resetDives())
})

function HomeScreen(props) {
  return (
    <ScrollView style={styles.container}>
      <DiveLog dives={props.dives.data} resetDives={props.resetDives} />
    </ScrollView>
  );
}

HomeScreen.navigationOptions = {
  title: 'Dive Log',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);