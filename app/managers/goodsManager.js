const Memcached = require('memcached');
const memcached = new Memcached('127.0.0.1:11211');

function getLastKey () {
    return new Promise((resolve, reject) => {
        memcached.get('last_key', (err, data) => {
            if (!data)
                resolve(0);
            else
                resolve(data);
        });
    });
}

function setLastKey (data) {
    return new Promise((resolve, reject) => {
        memcached.set('last_key', data, 20000, (err) => {
            if (err)
                reject(err);
            else
                resolve();
        });
    });
}

module.exports = {
    getItemById: function getItemById(key) {
        return new Promise((resolve, reject) => {
            memcached.get(key, (err, data) => {
                if (err)
                    reject(err);
                else
                    resolve(data);
            });
        });
    },
    addItem: async function addItem(data) {
        let key = await getLastKey();
        return new Promise((resolve, reject) => {
            memcached.set(key, data, 10000, (err) => {
                if (err)
                    reject(err);
                else {
                    console.log('Key: ' + key);
                    key = key + 1;
                    setLastKey(key);
                    resolve(key - 1);
                }
            });
        });
    },
    deleteItemById: function deleteItemById(key) {
        return new Promise((resolve, reject) => {
            memcached.del(key, (err) => {
                if(err)
                    reject(err);
                else
                    resolve();
            });
        });
    }
};