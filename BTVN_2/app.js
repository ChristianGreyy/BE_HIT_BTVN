const express = require('express');

const app = express();

app.use(express.json());

const users = [
    {
        _id: '1',
        username: 'ChristianGrey',
        password: '123123',
    },
    {
        _id: '2',
        username: 'test',
        password: '123123',
    }
]

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
            callback(null);
        }
        callback(user);
    }
    static deleteById(id, callback) {
        let index = users.findIndex(user => {
            return user._id === id;
        })
        if(!users) {
            callback(null);
        }
        users.splice(index, 1);
        console.log(users);
        callback(users);
    }
}

app.get('/user', (req, res, next) => {
    res.json({
        msg: 'success',
        users,
    })
})

app.post('/signup', (req, res, next) => {
    const { username, password } = req.body;
    console.log(username, password);
    const user = new User(username, password);
    user.save();
    res.json({
        msg: 'Create user successfully'
    });
   
})

app.put('/edit/:idUser', (req, res, next) => {
    const { idUser } = req.params;
    const { username, password } = req.body;
    User.findById(idUser, user => {
        if(!user) {
            res.status(404).json('User not found');
        }
        user.username = username;
        user.password = password;
    })

    res.json({
        msg: 'Update user successfully'
    });
})

app.delete('/delete/:idUser', (req, res, next) => {
    const { idUser } = req.params;
    const { username, password } = req.body;
    User.deleteById(idUser, user => {
        if(!user) {
            res.status(404).json('User not found');
        }
        res.json({
            msg: 'Delete user successfully'
        });
    })

})

app.listen(3000, () => {
    console.log('listening on port 3000')
})