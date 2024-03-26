import { ReactElement, ReactNode } from 'react';

type Provider = (props: { children: ReactNode }) => ReactElement;

export default Provider;
