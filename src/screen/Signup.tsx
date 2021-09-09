import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Button, TextInput, Snackbar} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from './RootStackParams';
import {useAuth} from '../context/AuthContext';

type signupScreenProps = NativeStackNavigationProp<RootStackParamList, 'Login'>;

const Signup: React.FC = () => {
  const navigation = useNavigation<signupScreenProps>();
  const {signup} = useAuth();
  const [snackbar, setSnackbar] = useState({
    visibility: false,
    message: '',
  });
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);

  const handleShowPassword = () => {
      setShowPassword(prevState => !prevState);
    },
    handleSignupUser = () => {
      signup(username, password)
        .then(authInstance => {
          if (authInstance) {
            setError(false);
            setSnackbar({
              visibility: true,
              message: 'Signed up!',
            });
            navigation.reset({index: 0, routes: [{name: 'Home'}]});
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
        <Button mode="contained" onPress={handleSignupUser}>
          Signup
        </Button>
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
});

export default Signup;
