import { StyleSheet, Text, ScrollView, View } from 'react-native';
import { useQuery } from '@apollo/client';
import { GET_PLACES_QUERY } from '../lib/gql';
export function GetPlaces() {
	const { loading, error, data } = useQuery(GET_PLACES_QUERY);

	if (loading) return <Text>Loading...</Text>;
	if (error) return <Text>Error: {error.message}</Text>;

	return (
		<ScrollView>
			<Text>GetPlaces</Text>
			<View>
				{data.places.data.map((place, idxplaces) => (
					<View key={place.id} style={styles.place}>
						<Text>{place.attributes.title}</Text>
						<Text>{place.attributes.address}</Text>
						<Text>{place.attributes.longitude}</Text>
						<Text>{place.attributes.latitude}</Text>
					</View>
				))}
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	place: {
		border: '1px solid black',
		margin: 10,
		padding: 10,
	},
});
