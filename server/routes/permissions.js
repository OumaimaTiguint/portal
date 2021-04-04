const router = require('express').Router();
let Permission = require('../models/permission.model');

router.get('/', (req, res) => {
    Permission.find()
        .then(l => res.json(l))
        .catch(err => res.status(400).json('Error: ' + err))
});

router.post('/update/:id', (req, res) => {
    User.findById(req.params.id)
        .then(l => {
            l.userId = req.body.userId;
            l.catalog = req.body.catalog;
            l.proposals1 = req.body.proposals1;
            l.proposals2 = req.body.proposals2;
            l.people = req.body.people;
            l.orders = req.body.orders

            l.save()
                .then(()=> res.json('Permissions updated!'))
                .catch((err)=> res.status(400).json('Error: ' + err))
        })
        .catch(err=> res.status(400).json('Error: ' + err))
});

router.post('/add',(req, res) => { 
    const userId = req.body.userId;
    const catalog = req.body.catalog;
    const proposals1 = req.body.proposals1;
    const proposals2 = req.body.proposals2;
    const people = req.body.people;
    const orders = req.body.orders;
    const newPermission = new Permission({
        userId,
        catalog,
        proposals1,
        proposals2,
        people,
        orders
    });

    newPermission.save()
        .then(()=> res.json('Permission added!'))
        .catch((err)=> res.status(400).json('Error: ' + err))
})

module.exports = router;