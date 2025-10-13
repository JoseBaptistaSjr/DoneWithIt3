import React from 'react';
import { View, StyleSheet, Platform, TextInput, StatusBar, TouchableWithoutFeedback, Modal, Button} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useState } from 'react';


import defaultStyles from '../config/styles';
import AppText from './AppText';

function AppPicker({icon, placeholder, ...otherProps}) {
    const [modalVisible, setModalVisible] = useState(false);


    return (
        <>
        <TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
          <View style={styles.container}>
            {icon && <MaterialCommunityIcons name={icon} size={20} color={defaultStyles.colors.medium} style={styles.icon} />}
            <AppText style={styles.text}>{placeholder}</AppText>
            <MaterialCommunityIcons name="chevron-down" size={20} color={defaultStyles.colors.medium} />
          </View>
        </TouchableWithoutFeedback>
        <Modal visible={modalVisible} animationType="slide">
          <Button title="Close" onPress={() => setModalVisible(false)} />
        </Modal>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: defaultStyles.colors.light,
        borderRadius: 25,
        flexDirection: 'row',
        width: '100%',
        padding: 15,
        marginVertical: 20,
        marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    icon: {
        marginRight: 10,
        alignSelf: 'center',
    },
    text: {
        flex: 1,
    },
})

export default AppPicker;