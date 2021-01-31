const handleProfile = ((req, res, db) => {
    const { id } = req.params;
    //let found = false;
    db.select('*') .from ('users').where({id})
    .then( user => {
        if(user.length){
            res.json(user[0])
        } else {
            res.status(400).json('not found')
        }
        //console.log(user[0]);
    })
    .catch(err => res.status(400).json('error getting user')) 
    //catch doesnt work cuz if there is no user, still there is an empty array which return true
/*     if(!found) {
        res.status(400).json('not found');
    } */
})

module.exports = {
    handleProfile: handleProfile
}