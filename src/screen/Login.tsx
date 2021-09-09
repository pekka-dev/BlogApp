import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {
  Button,
  TextInput,
  Snackbar,
  Text,
  DefaultTheme,
} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from './RootStackParams';
import {useAuth} from '../context/AuthContext';

type loginScreenProps = NativeStackNavigationProp<RootStackParamList, 'Login'>;

const Login: React.FC = () => {
  const navigation = useNavigation<loginScreenProps>();
  const {auth, loginUser} = useAuth();
  const [snackbar, setSnackbar] = useState({
    visibility: false,
    message: '',
  });
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (auth) {
      navigation.reset({index: 0, routes: [{name: 'Home'}]});
    }
  }, [auth]);

  const handleShowPassword = () => {
      setShowPassword(prevState => !prevState);
    },
    handleLoginUser = () => {
      loginUser(username, password)
        .then(authInstance => {
          if (authInstance) {
            navigation.reset({index: 0, routes: [{name: 'Home'}]});
            setSnackbar({
              visibility: true,
              message: 'Logged in!',
            });
          }
        })
        .catch(message => {
          setError(true);
          setSnackbar({
            visibility: true,
            message: message ? message : 'Something bad happened!',
          });
        });
    },
    handleSnackbarClose = () => {
      setSnackbar({
        visibility: false,
        message: '',
      });
    },
    handleOpenSignup = () => {
      navigation.navigate('Signup');
    };

  return (
    <View style={styles.main}>
      <View style={styles.content}>
        <TextInput
          style={styles.tiUsername}
          mode="outlined"
          label="Username"
          error={error}
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.tiPassword}
          mode="outlined"
          label="Password"
          error={error}
          secureTextEntry={!showPassword}
          right={
            password.length > 0 && (
              <TextInput.Icon
                name={showPassword ? 'eye-off' : 'eye'}
                onPress={handleShowPassword}
              />
            )
          }
          value={password}
          onChangeText={setPassword}
        />
        <Button mode="contained" onPress={handleLoginUser}>
          Login
        </Button>
        <Text style={styles.tCreateAccount} onPress={handleOpenSignup}>
          Create account
        </Text>
      </View>
      <Snackbar
        visible={snackbar.visibility}
        duration={2000}
        onDismiss={handleSnackbarClose}>
        {snackbar.message}
      </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    display: 'flex',
    flex: 1,
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    margin: 16,
  },
  tiUsername: {
    marginBottom: 16,
  },
  tiPassword: {
    marginBottom: 16,
  },
  tCreateAccount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: DefaultTheme.colors.primary,
    textAlign: 'center',
    marginTop: 8,
  },
});

export default Login;
