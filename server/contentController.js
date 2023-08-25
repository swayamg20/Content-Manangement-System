const Workshop = require('../t19models/content/Workshop');

const workshops = {};

workshops.get = (req, res) => {
    Workshop.find({}).then(hits => {
        res.status(200).json(hits);
    }).catch(err => {
        res.status(500).json({message: 'There was error fetching the workshop content', err: JSON.stringify(err)});
    });
};

workshops.create = (req, res) => {
    if (!req.body.name || !req.body.date || !req.body.order) {
        res.status(400).json({message: 'Malformed request'});
        return;
    }
    req.body.name = decodeURIComponent(req.body.name);
    var ws = new Workshop;
    ws.name = req.body.name;
    ws.date = req.body.date;
    ws.order = req.body.order;
    ws.content = [];
    ws.save((err, doc) => {
        if (err) {
            res.status(500).json({message: 'Error while creating the new document'});
        } else {
            res.status(200).json({message: 'New workshop created'});
        }
    });
};

workshops.update = (req, res) => {
    if (!req.body.name || !req.body.date || !req.body.order || !req.params.name) {
        res.status(400).json({message: 'Malformed request'});
        return;
    }
    req.body.name = decodeURIComponent(req.body.name);
    Workshop.findOne({name: req.params.name}).then(hit => {
        if (!hit) {
            res.status(400).json({message: 'Document not found'});
            return;
        }
        hit.name = req.body.name;
        hit.date = new Date(req.body.date).toDateString();
        hit.order = req.body.order;
        hit.tabs = req.body.tabs;
        hit.save().then(doc => {
            res.status(200).json({message: 'workshop updated'});
        }).catch(err => {
            res.status(500).json({message: 'wrror while creating doc', err});
        });
    });
};

workshops.delete = (req, res) => {
    if (!req.params.name) {
        res.status(400).json({message: 'Malformed request'});
        return;
    }
    req.body.name = decodeURIComponent(req.body.name);
    Workshop.findOne({name: req.params.name}).then(hit => {
        if (!hit) {
            res.status(400).json({message: 'Document not found'});
            return;
        }
        console.log(req.body);
        Workshop.findOneAndRemove({ name: req.params.name }, err => {
            if (err)
                res.status(500).json({message: 'error while deleting workshop'});
            else
                res.status(200).json({message: 'workshop deleted'});
        });
    });
};

module.exports.workshops = workshops;
