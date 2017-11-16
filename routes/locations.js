const express = require('express');
const router = express.Router();
const Park = require('../models/park');
const Slot = require('../models/slot');

router.post("/all", function (req, res) {
    Park.find({}, function (err, parks) {
        if (err) throw err;

        if (!parks) {
            res.json({
                state: false,
                msg: "No Parks found"
            });
            return false;

        }

        res.json({state:true, parks:parks});
    })
});

router.post("/slots", function (req, res) {

    const parkTitle = req.body.parkTitle;
    
    Park.findOne({title: parkTitle}, function (err, park) {
        if (err) throw err;


        if (!park) {
            res.json({
                state: false,
                msg: "No Parks found"
            });
            return false;

        }else{
            Slot.find()
                .populate('lastReservedBy')
                .select('title isReserved issReservePending')
                .exec((err, slots) => {
                    if (err) throw err;
                    
                    if (!slots) {
                        res.json({
                            state: false,
                            msg: "No Slots found"
                        });
                        return false;
                    }

                    res.json({state:true, slots:slots});
                    
                });
        }

        
    })
});


module.exports = router;