import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../../../redux/store';
import { render, screen } from '@testing-library/react';
import { MainComponent } from './Main';

describe('Main view', () => {
	test('Renders correctly', () => {
		const component = render(
			<Provider store={store}>
				<MainComponent />
			</Provider>
		);
		expect(component).toBeTruthy();
	});

	test('Renders spinner', () => {
		render(
			<Provider store={store}>
				<MainComponent />
			</Provider>
		);

		const element = screen.getByTestId('spinner');
		expect(element).toBeTruthy();
	});

});
