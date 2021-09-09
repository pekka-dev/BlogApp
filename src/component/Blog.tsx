import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const Blog: React.FC<Props> = ({user, body, date}: Props) => {
  let dateStr = `${date.getDate()}, ${
    date.getMonth() + 1
  } - ${date.getFullYear()}`;
  return (
    <View style={styles.main}>
      <View style={styles.content}>
        <Text style={styles.tUser}>{user}</Text>
        <Text style={styles.tDate}>{dateStr}</Text>
        <Text style={styles.tBody}>{body}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    display: 'flex',
    flex: 1,
    borderStyle: 'solid',
    borderRadius: 4,
    borderWidth: 1,
    backgroundColor: 'white',
    marginBottom: 8,
  },
  content: {
    display: 'flex',
    flex: 1,
    marginRight: 16,
    marginLeft: 16,
    marginVertical: 4,
  },
  tUser: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  tDate: {
    fontSize: 10,
  },
  tBody: {
    fontSize: 12,
    flex: 1,
  },
});

interface Props {
  user: string;
  body: string;
  date: Date;
  children?: React.ReactNode;
}

export default Blog;
