import React, { useContext } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { ListItem, Avatar } from '@rneui/base';
import { Button, Icon } from '@rneui/themed';
import { Alert } from 'react-native';
import UsersContext from './UserContext';

export default props => {


    
    const {state, dispatch} = useContext(UsersContext)

    function getActions(user){
        return (
            <>
                <Button
                    onPress={()=> props.navigation.navigate('UserForm', user)}
                    type='clear'
                    icon = {<Icon name='edit' size={25} color={'orange'} />}></Button>
                <Button
                    onPress={()=> confirmUserDeletion(user)}
                    type='clear'
                    icon = {<Icon name='delete' size={25} color={'red'} />}></Button>
            </>
        )
    }

    function confirmUserDeletion(user){
        Alert.alert('Excluir Usuário', 'Deseja Excluir o usuário?', [
            {
                text: 'Sim',
                onPress(){
                    dispatch({
                        type: 'deleteUser',
                        payload: user,
                    })
                }
            },
            {text: 'Não'}
        ])
    }

    function getUserItems({item: user}){
        return (
            <ListItem
                onPress={() => props.navigation.navigate('UserForm', user)}
                bottomDivider>
                <Avatar
                    rounded
                        source={{uri: user.avatarUrl}}
                />
                <ListItem.Content>
                    <ListItem.Title>{user.name}</ListItem.Title>
                    <ListItem.Subtitle>{user.email}</ListItem.Subtitle>
                </ListItem.Content>
                {getActions(user)}
            </ListItem>
        )
    }

    return(
        
        <View>
            <FlatList
                keyExtractor={user => user.id.toString()}
                data={state.users}
                renderItem={getUserItems}></FlatList>
        </View>
    );
}

const styles = StyleSheet.create({
    text: {
        fontSize: 20,
        marginBottom: 5,
        marginLeft: 10,
    },
})