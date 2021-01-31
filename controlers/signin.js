const handleSignin = ((db, bcrypt) => (req, res) => {
    const { email, password } = req.body;
    if( !email || !password) {
        return res.status(400).json('user/pass doesnt match')
    }
    db.select('email', 'hash') .from ('login')
        .where('email', '=', req.body.email)
        .then( data => {
            //console.log(data)
            const isValid = bcrypt.compareSync(password, data[0].hash)
            if(isValid){
                return db.select('*') .from ('users')
                .where('email', '=', email)
                .then(user => {
                    res.json(user[0])
                })
                .catch(err => res.status(400).json('wrong credentials'))
            } else {
                res.status(400).json('wrong credentials')
            }
        })
        .catch(err => res.status(400).json('user or pass doesnt match'))
        
    // Load hash from your password DB.
    //bcrypt.compare("bacon", hash, function(err, res) {
    // res == true
    //console.log(res);
    //});
    //bcrypt.compare("veggies", hash, function(err, res) {
    // res = false
    //console.log(res);
    //});
   /*  if(req.body.email === database.users[0].email && req.body.password === database.users[0].password){
        //res.json('success!');
        res.json(database.users[0]);
    } else {
        res.status(400).json('user or pass doesnt match')
    } */ // used for dummy database in server.js
}); // dont have to use transaction here cuz we are not modifying data, we just are checking

module.exports = {
    handleSignin: handleSignin
}