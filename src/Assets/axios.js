import axios from 'axios';
import { api } from './api';
export default instance = axios.create({
    baseURL: api,
});