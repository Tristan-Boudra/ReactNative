import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { useState } from 'react';
import { useMutation } from '@apollo/client';

import { CREATE_PLACE_MUTATION, GET_PLACES_QUERY } from '../lib/gql/index';
import { useUserStore } from '../lib/store/user';

export function CreatePlaces() {
	const [createPlaces] = useMutation(CREATE_PLACE_MUTATION, {
		refetchQueries: [
		  {query: GET_PLACES_QUERY},
		],
	  });

	const { setConnected } = useUserStore();

	const [form, setForm] = useState({
        title: '',
        address: '',
        longitude: '',
        latitude: '',
	});

	function onChangeText(name, value) {
		setForm({
			...form,
			[name]: value,
		});
	}

	async function handleSubmit() {
		const res = await createPlaces({
			variables: {
				input: {
                    title: form.title,
                    address: form.address,
                    longitude: Number(form.longitude),
                    latitude: Number(form.latitude),
					publishedAt: new Date(),
				},
			},
		});

		console.log(res);
	}

	return (
		<View>
			<Text>Create Place</Text>
			<View>
                <TextInput
                    style={styles.input}
					placeholder='title'
                    onChangeText={(value) => onChangeText('title', value)}
                    value={form.title}
                />
                <TextInput
                    style={styles.input}
					placeholder='address'
                    onChangeText={(value) => onChangeText('address', value)}
                    value={form.address}
                />
                <TextInput
                    style={styles.input}
					placeholder='longitude'
                    onChangeText={(value) => onChangeText('longitude', value)}
                    value={form.longitude}
                />
                <TextInput
                    style={styles.input}
					placeholder='latitude'
                    onChangeText={(value) => onChangeText('latitude', value)}
                    value={form.latitude}
                />
				<Button title="Create place" color="#f194ff" onPress={handleSubmit} />
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	input: {
		height: 40,
		margin: 12,
		borderWidth: 1,
		padding: 10,
	},
});
