import React, { useState } from 'react';
import { Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import { useMutation } from '@apollo/client';
import { UPDATE_PLACE_MUTATION } from '../lib/gql/index';
export { updatePlaces };

export default function updatePlaces() {
  const [id, setId] = useState('');
  const [title, setTitle] = useState('');
  const [address, setAddress] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  const [updatePlaces, { loading, error }] = useMutation(
    UPDATE_PLACE_MUTATION,
    {
      onCompleted: () => {
        setId('');
        setTitle('');
        setAddress('');
        setLatitude('');
        setLongitude('');
        alert('Place updated successfully!');
      },
      onError: (error) => {
        console.error(error);
      },
    }
  );

  const handleSubmit = () => {
    updatePlaces({
      variables: {
        id,
        input: {
          title,
          address,
          latitude: parseFloat(latitude),
          longitude: parseFloat(longitude),
        },
      },
    });
  };

  return (
    <ScrollView>
      <Text>Update a Place</Text>
      <TextInput
        style={styles.input}
        placeholder="Place ID"
        onChangeText={setId}
        value={id}
      />
      <TextInput
        style={styles.input}
        placeholder="Title"
        onChangeText={setTitle}
        value={title}
      />
      <TextInput
        style={styles.input}
        placeholder="Address"
        onChangeText={setAddress}
        value={address}
      />
      <TextInput
        style={styles.input}
        placeholder="Latitude"
        onChangeText={setLatitude}
        value={latitude}
      />
      <TextInput
        style={styles.input}
        placeholder="Longitude"
        onChangeText={setLongitude}
        value={longitude}
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