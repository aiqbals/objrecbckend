const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: '65933865b1e440a9a54f81bceb3fc492'
});

const handleApiCall = (req, res) => {
    app.models
        .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
        .then(data => {
            res.json(data);
        })
        .catch(err => res.status(400).json('Unable to work with api'))
}


const handleImage = ((req, res, db) => {
    const { id } = req.body;
    db('users') .where ('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        //console.log(entries);
        res.json(entries[0]);
    })
    .catch(err => res.status(400).json('Unable to get entries'))
    /* let found = false;
    database.users.forEach(user => {
        found = true;
        if(user.id === id) {
            user.entries++
            return res.json(user.entries);
        } 
    })
    if(!found) {
        res.status(400).json('not found');
    } */
})

module.exports = {
    handleImage,
    handleApiCall
}