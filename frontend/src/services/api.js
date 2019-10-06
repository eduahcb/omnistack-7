export default class ApiService {

    constructor (defaultUrl) {
        this._url = defaultUrl;
    }

    async get(url = '/') {

        try {
            const res = await fetch(this._url + url);
            const data = await res.json();
            return data;
        }
        catch (erro) {
            return erro;
        }

    }
    
    async post(url, data) {

        try {
            const res = await fetch(`${this._url}${url}`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            const result = await res.json();
            return result;
        }
        catch (erro) {
            return erro;
        }

    }
}