import { createContext } from 'react';
import { Adapter } from '@textbus/adapter-react';

export const AdapterContext = createContext<Adapter>(null as any)
