import { Button } from '@rneui/themed';
import React, { useState , useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TextInput } from 'react-native-paper';
import UsersContext from './UserContext';


export default ({route, navigation}) => {

    const [user, setUser] = useState(route.params ? route.params: {})
    const {dispatch} = useContext(UsersContext)

    return(
        <View style={style.form}>
            <Text>Nome</Text>
            <TextInput
                style={style.input}
                onChangeText={name => setUser({...user,name})}
                placeholder='Informe o Nome'
                value={user.name}
            />
            
            <TextInput
                style={style.input}
                onChangeText={email => setUser({...user,email})}
                placeholder='Informe o Email'
                value={user.email}
            />

            <TextInput
                style={style.input}
                onChangeText={avatarUrl => setUser({...user,avatarUrl})}
                placeholder='Informe o URI do avatar'
                value={user.avatarUrl}
            />

            <Button
                title="Salvar"
                onPress={()=> {
                    dispatch({
                        type: user.id ? 'updateUsers' : 'createUser',
                        payload: user,
                    })
                    navigation.goBack()
                }}></Button>
        </View>
    );
}

const style = StyleSheet.create({
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
    },
    form: {
        padding: 15,
    }
})