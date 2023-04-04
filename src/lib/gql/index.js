import { gql } from '@apollo/client';

// Login
export const LOGIN_MUTATION = gql`
	mutation ($input: UsersPermissionsLoginInput!) {
		login(input: $input) {
			jwt
			user {
				username
				email
			}
		}
	}
`;

export const ME_QUERY = gql`
	query {
		me {
			username
			email
		}
	}
`;

export const GET_PLACES_QUERY = gql`
	query {
		places {
			data {
				id
				attributes {
				  title
				  address
				  latitude
				  longitude
				}
			}
		}
	}
`;

// CreatePlace
export const CREATE_PLACE_MUTATION = gql `
	mutation PostPlace($input: PlaceInput!) {
		createPlace(data: $input) {
		  data {
			id
			attributes {
			  title
			  address
			  latitude
			  longitude
			}
		  }
		}
	}
`;

// UpdatePlace
export const UPDATE_PLACE_MUTATION = gql`
    mutation updatePlace ($id: ID!, $input: PlaceInput!) {
        updatePlace(id: $id, data: $input){
        data {
            id
            attributes {
            title,
            address,
            latitude,
            longitude
            }
        }
        }
    }
`;

// DeletePlace
export const DELETE_PLACE_MUTATION = gql `
	mutation deletePlace($id: ID!) { 
		deletePlace(id: $id) { 
			id
		} 
	}
`;

// Register
export const REGISTER_MUTATION = gql`
	mutation ($input: UsersPermissionsRegisterInput!) {
		register(input: $input) {
			jwt
			user {
				name
				email
				password
			}
		}
	}
`;

export const ME_REGISTER_QUERY = gql`
	query {
		me {
			username
			email
			password
		}
	}
`;

// Logout
export const LOGOUT_QUERY = gql`
	query {
		me {
			username
			email
		}
	}
`;

