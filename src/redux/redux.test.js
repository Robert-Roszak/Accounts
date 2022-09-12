import { handleAccounts } from './accountsRedux';

describe('Redux tests', () => {
	test('handleAccounts() should add title key to accounts', () => {
		const accountTypes = [{id: 'IGSB', title: 'Spread bet account'}];
		const accounts = [{accountType: 'IGSB'}];
		const accountsMerged = handleAccounts(accountTypes, accounts);
		expect(handleAccounts(accountTypes, accounts)).toBeDefined();
		expect(accountsMerged).toBeInstanceOf(Array);
		expect(accountsMerged[0].title).toBe('Spread bet account');
	});
});