import API from './axios.config'

const user = {
    getAllUser: () => {
        const url = '/user/get-all';
        return API.get(url);
    },
    createUser: (params) => {
        const url = '/user/create';
        return API.post(url, params);
    },
    updateUser: (user_id, params) => {
        const url = '/user/update/${user_id}';
        return API.put(url, params);
    },
    deleteUser: (user_id) => {
        const url = 'user/delete/${user_id}';
        return API.delete(url);
    }
}

export default user;