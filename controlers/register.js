const handleRegister = ((req, res, db, bcrypt) => {
    const { email, password, name } = req.body; 
    //data received from fronend
    if( !email || !password || !name) {
        return res.status(400).json('user/pass doesnt match')
    }
    const hash = bcrypt.hashSync(password);
    db.transaction(trx => {
        trx.insert({
            hash: hash,
            email: email
        })
        .into('login')
        .returning('email')
        .then(loginEmail => {
            return trx('users')
                .returning('*')
                .insert({
                    email: loginEmail[0], //since we are returning array
                    name: name,
                    joined: new Date()
                }).then( user => {
                    res.json(user[0]);
                })
                .then(trx.commit)
                .catch(trx.rollback)
        })
    }) 
    // check transaction in knex documentation - is used when two or more things needs to be done at a time
   
    /* bcrypt.hash(password, null, null, function(err, hash) {
        //console.log(hash);
        database.login.hash = hash;
    }); */ //used for asyncronous
    /* database.users.push({
        id: 125,
        name: name,
        email: email,
        password: password,
        entries: 0,
        joined: new Date()
    }) *///while using database dummy object in server.js file
    /* db('users')
        .returning('*')
        .insert({
            email: email,
            name: name,
            joined: new Date()
        }).then( user => {
            res.json(user[0]);
        })
        .catch( err => res.status(400).json('unable to join')) */
        //while using original database without transaction function
    //res.json(database.users[database.users.length - 1]); //dummy object in server.js
});

module.exports = {
    handleRegister: handleRegister
}