import axios from 'axios';

import { API_URL } from '../utils/constants';
import JwtHelper from './jwt';

class ApiHelper {
    static getOptions(){
        const token = JwtHelper.getJwt();
        let options = token ? { headers: { "auth-header": token } } : {};

        return options;
    }

    static get(path){
        return axios.get(`${API_URL}/${path}`, this.getOptions());
    }

    static post(path, data){
        return axios.post(`${API_URL}/${path}`, data ,this.getOptions());
    }

    static put(path, data){
        return axios.put(`${API_URL}/${path}`, data, this.getOptions());
    }

    static delete(path){
        return axios.delete(`${API_URL}/${path}`, this.getOptions());
    }
}

export default ApiHelper;