

class User {
    constructor(username, password) {
        this._id = Math.random();
        this.username = username;
        this.password = password;
    }
    save() {
        return users.push(this);
    }
    static findById(id, callback) {
        let user = users.find(user => {
            return user._id === id;
        })
        if(!user) {
            return callback(null);
        }

        return callback(user);
    }
    static deleteById(id, callback) {
        let index = users.findIndex(user => {
            return user._id === id;
        })
        if(index === -1) {
            return callback(null);
        }
        users.splice(index, 1);
        return callback(users);
    }
}

module.exports = User;