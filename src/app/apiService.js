import axios from 'axios'

const httpClient = axios.create({
    baseURL: 'https://minhasfinancas-ratacheski-api.herokuapp.com/'
})

class ApiService {
    constructor(apiUrl){
        this.apiUrl = apiUrl;
    }

    post(url, object){
        const requestUrl = `${this.apiUrl}${url}`
        return httpClient.post(requestUrl, object);
    }

    put(url, object){        
        const requestUrl = `${this.apiUrl}${url}`
        return httpClient.put(requestUrl, object);
    }

    delete(url){
        const requestUrl = `${this.apiUrl}${url}`
        return httpClient.delete(requestUrl);
    }

    get(url){
        const requestUrl = `${this.apiUrl}${url}`
        return httpClient.get(requestUrl);
    }
}

export default ApiService;