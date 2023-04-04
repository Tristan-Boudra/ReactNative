import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import { useMutation } from '@apollo/client';
import { DELETE_PLACE_MUTATION } from '../lib/gql/index';
export { deletePlaces };

export default function deletePlaces() {
  const [placeId, setPlaceId] = useState('');

  const [deletePlaces, { loading, error }] = useMutation(DELETE_PLACE_MUTATION, {
    onCompleted: () => {
      setPlaceId('');
      alert('Place deleted successfully!');
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const handleSubmit = () => {
    deletePlaces({
      variables: {
        id: placeId,
      },
    });
  };

  return (
    <ScrollView>
      <Text>Delete Place</Text>
      <TextInput
        style={styles.input}
        placeholder="Place ID"
        onChangeText={setPlaceId}
        value={placeId}
      />
      <Button title="Submit" onPress={handleSubmit} />
      {loading && <Text>Loading...</Text>}
      {error && <Text>Error: {error.message}</Text>}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});