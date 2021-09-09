import React, {useEffect} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from './RootStackParams';
import {useAuth} from '../context/AuthContext';
import {useBlog} from '../context/BlogContext';
import Blog from '../component/Blog';
import {Button} from 'react-native-paper';

type homeScreenProps = NativeStackNavigationProp<RootStackParamList, 'Home'>;

const Home: React.FC = () => {
  const navigation = useNavigation<homeScreenProps>();
  const {auth, logoutUser} = useAuth();
  const {blogs} = useBlog();

  useEffect(() => {
    if (!auth) {
      navigation.reset({index: 0, routes: [{name: 'Login'}]});
    }
  }, [auth]);

  return (
    <View style={styles.main}>
      <View style={styles.content}>
        <Button style={styles.bLogout} mode="contained" onPress={logoutUser}>
          Logout
        </Button>
        <Button
          style={styles.bCreate}
          mode="contained"
          onPress={() => {
            navigation.navigate('CreateBlog');
          }}>
          Create
        </Button>
        <FlatList
          data={blogs}
          renderItem={({item}) => (
            <Blog
              user={item.user}
              body={item.body}
              date={new Date(parseInt(item.date))}
            />
          )}
          keyExtractor={item => item.user + item.date}
        />
      </View>
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
  bLogout: {
    marginBottom: 8,
  },
  bCreate: {
    marginBottom: 8,
  },
});

export default Home;
