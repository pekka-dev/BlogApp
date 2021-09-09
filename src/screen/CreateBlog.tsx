import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from './RootStackParams';
import {useNavigation} from '@react-navigation/native';
import {useBlog} from '../context/BlogContext';
import {useAuth} from '../context/AuthContext';
import {Button, Text, TextInput} from 'react-native-paper';
import {Blog} from '../model/Blog';

type createBlogScreenProps = NativeStackNavigationProp<
  RootStackParamList,
  'CreateBlog'
>;

const CreateBlog: React.FC = () => {
  const navigation = useNavigation<createBlogScreenProps>();
  const {auth} = useAuth();
  const {createBlog} = useBlog();
  const [body, setBody] = useState('');

  const handleSubmitBlog = () => {
    if (!auth) return;
    let blog: Blog = {
      user: auth.username,
      body: body,
      date: new Date().getTime().toString(),
    };
    createBlog(blog).then(() => {
      navigation.goBack();
    });
  };

  return (
    <View style={styles.main}>
      <View style={styles.content}>
        <Text style={styles.tUsername}>{auth?.username}</Text>
        <TextInput
          style={styles.tiBody}
          mode="outlined"
          multiline={true}
          numberOfLines={4}
          onChangeText={setBody}
          value={body}
        />
        <Button
          style={styles.bSubmit}
          mode="contained"
          onPress={handleSubmitBlog}>
          Create
        </Button>
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
  tUsername: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  tiBody: {
    marginTop: 16,
  },
  bSubmit: {
    marginTop: 16,
  },
});

export default CreateBlog;
