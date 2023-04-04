import { useState, useEffect } from 'react';
import { Login } from './src/views/Login';
import { Home } from './src/views/Home';
import { StyleSheet, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import * as SecureStore from 'expo-secure-store';
import { TOKEN_KEY } from './src/lib/constants/index';
import { useUserStore } from './src/lib/store/user';
import { GetPlaces } from './src/views/GetPlaces';
import { CreatePlaces } from './src/views/CreatePlaces';
import { deletePlaces } from './src/views/DeletePlaces';
import { updatePlaces } from './src/views/UpdatePlaces';

const httpLink = createHttpLink({
	uri: 'https://digitalcampus.nerdy-bear.com/graphql',
});

const authLink = setContext(async (_, { headers }) => {
	const token = await SecureStore.getItemAsync(TOKEN_KEY);
	// return the headers to the context so httpLink can read them
	return {
		headers: {
			...headers,
			authorization: token ? `Bearer ${token}` : '',
		},
	};
});

const client = new ApolloClient({
	link: authLink.concat(httpLink),
	cache: new InMemoryCache(),
});

const Stack = createNativeStackNavigator();

const Loader = () => <Text>Loading...</Text>;

function App() {
	const [connected, setConnected] = useState(undefined);
	const { connected: connectedStore } = useUserStore();

	useEffect(() => {
		async function checkToken() {
			const token = await SecureStore.getItemAsync(TOKEN_KEY);
			if (!token) return setConnected(false);

			return setConnected(true);
		}

		checkToken();
	}, [connectedStore]);

	return (
		<ApolloProvider client={client}>
			<NavigationContainer>
				<Stack.Navigator>
					{connected === undefined && <Stack.Screen name="Loader" component={Loader} />}
					{connected && (
						<>
							<Stack.Screen name="Home" component={Home} />
						</>
					)}
					{connected === true && (
						<>
							<Stack.Screen name="GetPlaces" component={GetPlaces} />
						</>
					)}
					{connected === true && (
						<>
							<Stack.Screen name="CreatePlaces" component={CreatePlaces} />
						</>
					)}
					{connected === true && (
						<>
							<Stack.Screen name="DeletePlaces" component={deletePlaces} />
						</>
					)}
					{connected === true && (
						<>
							<Stack.Screen name="UpdatePlaces" component={updatePlaces} />
						</>
					)}
					{connected === false && (
						<>
							<Stack.Screen name="Login" component={Login} />
						</>
					)}
				</Stack.Navigator>
			</NavigationContainer>
		</ApolloProvider>
	);
}

export default App;