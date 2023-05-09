import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import UserList from './components/UserList';
import { Button, Icon } from '@rneui/themed';
import UserForm from './components/UserForm';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { UsersProvider } from './components/UserContext';

const Stack = createNativeStackNavigator();

export default function App() {

  
  
  const screenOptions = {
    headerStyle: {
      backgroundColor: '#f4511e'
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold'
    }
  }
  return (
    <UsersProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName='UserList'
          screenOptions={screenOptions}>
          <Stack.Screen
            name="UserList"
            component={UserList}
            options={({navigation}) => {
              return {
                title: 'Lista de Usuários',
                headerRight: () => (
                  <Button
                  onPress={() => navigation.navigate('UserForm')}
                  type='clear'
                  icon={<Icon name='add' size={25} color="white"/>}>

                  </Button>
                )              
              }
            }}>

          </Stack.Screen>
          
          <Stack.Screen name="UserForm" component={UserForm}
            options={{
              title: 'Formulário de Usuários'
            }}>

          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </UsersProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  text:{
    fontSize: 25,
  }
});
