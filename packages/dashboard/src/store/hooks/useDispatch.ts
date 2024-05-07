import { useDispatch as useReduxDispatch } from 'react-redux';

import type { Dispatch } from '../domain';

const useDispatch = useReduxDispatch.withTypes<Dispatch>();

export default useDispatch;
