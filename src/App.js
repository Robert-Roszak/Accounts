import { React } from 'react';
import { Provider } from 'react-redux';
import { store } from './redux/store';

import { Main } from './components/views/Main/Main';

const App = () => (
	<Provider store={store}>
		<Main />
	</Provider>
);

export default App;
