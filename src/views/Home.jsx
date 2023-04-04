import { StyleSheet, Text, View, Button } from 'react-native';
import { useQuery } from '@apollo/client';
import { useNavigation } from '@react-navigation/native';

import { ME_QUERY } from '../lib/gql/index';
import { TOKEN_KEY } from '../lib/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function Home() {
	const { loading, error, data } = useQuery(ME_QUERY);
	const navigation = useNavigation();

	async function handleSubmit() {
		const tokendelete = TOKEN_KEY;
		const res = await AsyncStorage.removeItem(tokendelete);
	}

	console.log(data, loading);

	return (
		<View style={styles.container}>
			<Text style={styles.h1}>Home</Text>
			<View style={styles.content}>
				<Text>Bonjour {data && data.me.username} !</Text>
				<Button
					title="S'identifier"
					onPress={() => {
						navigation.navigate('Login');
					}}
				/>
				<Button 
					title="Logout" 
					onPress={handleSubmit}
				/>
				<Button 
					title="GetPlaces" 
					onPress={() => {
						navigation.navigate('GetPlaces');
					}}
				/>
				<Button 
					title="CreatePlaces" 
					onPress={() => {
						navigation.navigate('CreatePlaces');
					}}
				/>
				<Button 
					title="DeletePlaces" 
					onPress={() => {
						navigation.navigate('DeletePlaces');
					}}
				/>
				<Button 
					title="UpdatePlaces" 
					onPress={() => {
						navigation.navigate('UpdatePlaces');
					}}
				/>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
	},
	h1: {
		fontSize: 40,
		fontWeight: 500,
		paddingVertical: 20,
		backgroundColor: '#14171c',
		width: '100%',
		textAlign: 'center',
		color: 'white',
	},
	content: {
		flex: 0,
	},
});
