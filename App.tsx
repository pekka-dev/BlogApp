import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import Home from './src/screen/Home';
import CreateBlog from './src/screen/CreateBlog';
import Login from './src/screen/Login';
import Signup from './src/screen/Signup';
import {AuthProvider} from './src/context/AuthContext';
import {RootStackParamList} from './src/screen/RootStackParams';
import {BlogProvider} from './src/context/BlogContext';

const Stack = createNativeStackNavigator<RootStackParamList>();

const theme = {
  ...DefaultTheme,
};

const App = () => {
  return (
    <AuthProvider>
      <BlogProvider>
        <PaperProvider theme={theme}>
          <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
              <Stack.Screen
                name="Home"
                component={Home}
                options={{title: 'Blogs'}}
              />
              <Stack.Screen name="CreateBlog" component={CreateBlog} />
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="Signup" component={Signup} />
            </Stack.Navigator>
          </NavigationContainer>
        </PaperProvider>
      </BlogProvider>
    </AuthProvider>
  );
};

export default App;
