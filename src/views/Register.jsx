import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, TextInput } from 'react-native-web';
import { useMutation } from '@apollo/client';

import { useNavigation } from '@react-navigation/native';
import { REGISTER_MUTATION } from '../lib/gql';
import { TOKEN_KEY } from '../lib/constants';
import { useUserStore } from '../lib/store/user';

export function Register() {

    const [register] = useMutation(REGISTER_MUTATION);
	const navigation = useNavigation();
	const { setConnected } = useUserStore();

	const [form, setForm] = useState({
        nom: '',
        email: '',
		password: '',
	});

	function onChangeText(name, value) {
		setForm({
			...form,
			[name]: value,
		});
	}

	async function handleSubmit() {
		const res = await register({
			variables: {
				input: {
					nom: form.nom,
                    email: form.email,
					password: form.password,
				},
			},
		});

		await SecureStore.setItemAsync(TOKEN_KEY, res.data.register.jwt);
		setConnected(true);
	}
    
    return (
        <View style={styles.container}>
            <Text style={styles.h1}>Register</Text>
            <View style={styles.content}>
                <TextInput style={styles.input} onChangeText={(value) => onChangeText('nom', value)} value={form.nom} placeholder="nom" />
                <TextInput style={styles.input} onChangeText={(value) => onChangeText('email', value)} value={form.email} placeholder="email" />
                <TextInput style={styles.input} onChangeText={(value) => onChangeText('password', value)} value={form.password} placeholder="password" />
                <Button title="submit" onPress={handleSubmit} />
            </View>
        </View>
    )
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
        color: 'white'
    },
    content: {
        flex: 0
    },
    input: {
        border: '1px solid black',
        marginTop: '10px',
        marginBottom: '10px',
        padding: '10px',
        width: '100%'
    }
})