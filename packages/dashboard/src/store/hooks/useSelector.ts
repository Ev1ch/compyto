import { useSelector as useReduxSelector } from 'react-redux';

import type { State } from '../domain';

const useSelector = useReduxSelector.withTypes<State>();

export default useSelector;
