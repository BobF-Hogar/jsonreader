import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  Button,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {PersistGate} from 'redux-persist/integration/react';

import {postSelector, setPostData} from '../redux/postSlice';
import {persistor} from '../redux/store';
import {actions} from '../redux/sagas';

export default function PostList() {
  const posts = useSelector(postSelector);
  const dispatch = useDispatch();

  const loadMessages = () => {
    dispatch({
      type: actions.fetchPosts,
      payload: {url: 'https://jsonplaceholder.typicode.com/posts'},
    });
  };

  const clearMessages = () => {
    dispatch(setPostData([]));
  };

  const renderPostItem = ({item}) => {
    return (
      <PersistGate
        loading={
          <View>
            <Text>Loading...</Text>
          </View>
        }
        persistor={persistor}>
        <View style={styles.postItem}>
          <View style={styles.postHeader}>
            <Text style={styles.postUser}>{item.userId}:</Text>
            <Text style={styles.postTitle}>{item.title}</Text>
          </View>
          <View style={styles.postText}>
            <Text>{item.body}</Text>
          </View>
        </View>
      </PersistGate>
    );
  };

  return (
    <SafeAreaView>
      <View style={styles.pageHeader}>
        <Text style={styles.pageTitle}>View Posts</Text>
        <View style={styles.pageHeader}>
          <Button title="Load" onPress={loadMessages} />
          <Button title="Clear" onPress={clearMessages} />
        </View>
      </View>
      <FlatList data={posts} renderItem={renderPostItem} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  pageHeader: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  pageTitle: {
    fontSize: 24,
    margin: 10,
  },
  postItem: {
    margin: 10,
  },
  postHeader: {
    display: 'flex',
    flexDirection: 'row',
  },
  postUser: {
    color: 'rgba(128, 128, 128, 0.5)',
    fontSize: 14,
    marginRight: 8,
    marginTop: 5,
  },
  postTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  postText: {
    marginTop: 4,
    paddingLeft: 20,
  },
});
