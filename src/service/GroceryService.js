import http from "../http-common";

const getAll = () => {
    return http.get("/grocery");
};

const getByName = name => {
    return http.get(`/grocery?name=${name}`);
};

const get = id => {
    return http.get(`/grocery/${id}`);
};

const getNeeded = () => {
    return http.get("/grocery/need");
}

const getPurchased = () => {
    return http.get("/grocery/purchased");
}

const getFavs = () => {
    return http.get("/grocery/favs");
}

const add = data => {
    return http.post("/grocery", data);
};

const edit = (id, data) => {
    return http.put(`/grocery/${id}`, data);
};

const remove = id => {
    return http.delete(`/grocery/${id}`);
};

const removeAll = () => {
    return http.delete(`/grocery`);
};

export default {
    getAll,
    get,
    getByName,
    getNeeded,
    getPurchased,
    getFavs,
    add,
    edit,
    remove,
    removeAll
};