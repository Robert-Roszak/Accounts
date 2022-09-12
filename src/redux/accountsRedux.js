import Axios from 'axios';

const reducerName = 'accounts';
const createActionName = (name) => `app/${reducerName}/${name}`;

const FETCH_START = createActionName('FETCH_START');
const FETCH_SUCCESS = createActionName('FETCH_SUCCESS');
const FETCH_ERROR = createActionName('FETCH_ERROR');

export const fetchStarted = () => ({ type: FETCH_START });
export const fetchSuccess = payload => ({ payload, type: FETCH_SUCCESS });
export const fetchError = payload => ({ payload, type: FETCH_ERROR });

export const handleAccounts = (accountTypes, accounts) => {
	if (accounts && accountTypes) {
		for (let i = 0; i < accounts.length; i++) {
			const accountTypeCode = accounts[i].accountType;
			if (typeof accountTypeCode !== 'undefined') {
				for (let j = 0; j < accountTypes.length; j++) {
					const accountTypeId = accountTypes[j].id;
					if (accountTypeCode === accountTypeId) {
						accounts[i].title = accountTypes[j].title;
						break;
					}
				}
			}
		}
	}
	return accounts;
};

export const fetchAccounts = () => {
	return (dispatch) => {
		dispatch(fetchStarted());
		const accountTypesURL = 'https://recruitmentdb-508d.restdb.io/rest/accountTypes';
		const accountsURL = 'https://recruitmentdb-508d.restdb.io/rest/accounts';
		const header = {headers: {'x-apikey': '5d9f48133cbe87164d4bb12c'}};
		const requestOne = Axios.get(accountTypesURL, header);
		const requestTwo = Axios.get(accountsURL, header);

		Axios.all([requestOne, requestTwo]).
			then(Axios.spread((...responses) => {
				const accountTypes = responses[0].data;
				const accounts = responses[1].data;
				const accountsMerged = handleAccounts(accountTypes, accounts);
				
				dispatch(fetchSuccess(accountsMerged));
			}))
			.catch(err => {
				dispatch(fetchError(err.message || true));
			});
	};
};

export const reducer = (statePart = [], action = {}) => {
	switch (action.type) {
	case FETCH_START: {
		return {
			...statePart,
			loading: {
				active: true,
				error: false,
			},
		};
	}
	case FETCH_SUCCESS: {
		return {
			...statePart,
			loading: {
				active: false,
				error: false,
			},
			data: action.payload,
		};
	}
	case FETCH_ERROR: {
		return {
			...statePart,
			loading: {
				active: false,
				error: action.payload,
			},
		};
	}
	default:
		return statePart;
	}
};
