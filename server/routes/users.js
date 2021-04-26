const router = require('express').Router();
let User = require('../models/user.model');

router.get('/', (req, res) => {
    User.find()
        .then(l => res.json(l))
        .catch(err => res.status(400).json('Error: ' + err))
});

router.get('/:id', (req, res) => {
    User.findById(req.params.id)
        .then(qst => res.json(qst))
        .catch(err=> res.status(400).json('Error: ' + err))
});

router.route('/delete/:id').delete((req, res) => {
    User.findByIdAndDelete(req.params.id)
        .then(() => res.json('User deleted!'))
        .catch(err=> res.status(400).json('Error: ' + err))
});

router.post('/update/:id', (req, res) => {
    User.findById(req.params.id)
        .then(l => {
            l.name = req.body.name;
            l.email = req.body.email;
            l.role = req.body.role;
            l.active = req.body.active;

            l.save()
                .then(()=> res.json('User updated!'))
                .catch((err)=> res.status(400).json('Error: ' + err))
        })
        .catch(err=> res.status(400).json('Error: ' + err))
});

router.post('/add',(req, res) => { 
    const name = req.body.name;
    const email = req.body.email;
    const role = req.body.role;
    const active = req.body.active;
    const newUser = new User({
        name,
        email,
        role,
        active
    });

    newUser.save()
        .then(()=> res.json('User added!'))
        .catch((err)=> res.status(400).json('Error: ' + err))
})

module.exports = router;