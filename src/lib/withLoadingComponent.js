import branch from 'recompose/branch';
import renderComponent from 'recompose/renderComponent';

import { WrappedLoading } from '../components/Loading';

export default branch(({ loading = false }) => (!!loading), renderComponent(WrappedLoading));
