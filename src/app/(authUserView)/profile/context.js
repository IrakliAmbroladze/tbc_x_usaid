import { createContext } from 'react';
import {fetchUser} from './fetchUser'

export const ThemeContext = createContext('light');
export const AuthContext = createContext(null);

export const user = await fetchUser();