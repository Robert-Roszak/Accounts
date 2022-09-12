import React, { useEffect }  from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAccounts } from '../../../redux/accountsRedux';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Spinner from 'react-bootstrap/Spinner';
import Table from 'react-bootstrap/Table';

import PropTypes from 'prop-types';

import styles from './Main.module.scss';

const Component = () => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(fetchAccounts());
	},[dispatch]);

	const accounts = useSelector((state) => state.accounts.data);

	if (accounts) {
		return (
			<div className={styles.root}>
				<Container>
					<Row className='g-4'>
						<h2 className={styles.header}>Accounts</h2>
						<Table striped bordered hover size='sm'>
							<thead>
								<tr>
									<th>Name</th>
									<th>Profit & Loss</th>
									<th>Account type</th>
								</tr>
							</thead>
							<tbody>
								{accounts.map(account => {
									if (account.id !== undefined) return (
										<tr key={account._id}>
											<td>{account.name}</td>
											<td>{account.currency} {account.profitLoss}</td>
											<td>{account.title}</td>
										</tr>
									);
								})}
							</tbody>
						</Table>
					</Row>
				</Container>
			</div>
		);
	}
	else return (
		<Spinner data-testid='spinner' className={styles.center} animation='border' role='status' />
	);
};

Component.propTypes = {
	className: PropTypes.string,
	accounts: PropTypes.array
};

export {
	Component as Main,
	Component as MainComponent,
};
