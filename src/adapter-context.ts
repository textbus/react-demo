import { createContext } from 'react';
import { ReactAdapter } from '@textbus/adapter-react';

export const AdapterContext = createContext<ReactAdapter>(null as any)
