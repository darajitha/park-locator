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
            Slot.findByParkId(park._id, (err, slots) => {
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

router.post("/reserve", function (req, res) {

    const slotId = req.body.slot;
    Slot.findOne({_id:slotId})
    .populate('lastReservedBy')
    .select('title isReserved isReservePending')
    .exec((err, slot) => {
        if (err) throw err;
        
        if (!slot) {
            res.json({
                state: false,
                msg: "No Slots found"
            });
            return false;
        }

        slot.isReservePending = true;

        slot.save(function (err, slot) {
            if (err) throw err;
            res.json({state:true, slot:slot});
        });        
        
    });
    
});

router.post("/lock", function (req, res) {
    
        const slotId = req.body.slot;
        Slot.findOne({_id:slotId})
        .populate('lastReservedBy')
        .select('title isReserved isReservePending')
        .exec((err, slot) => {
            if (err) throw err;
            
            if (!slot) {
                res.json({
                    state: false,
                    msg: "No Slots found"
                });
                return false;
            }
    
            slot.isReserved = true;
    
            slot.save(function (err, slot) {
                if (err) throw err;
                res.json({state:true, slot:slot});
            });        
            
        });
        
    });

    router.post("/unlock", function (req, res) {
        
            const slotId = req.body.slot;
            Slot.findOne({_id:slotId})
            .populate('lastReservedBy')
            .select('title isReserved isReservePending')
            .exec((err, slot) => {
                if (err) throw err;
                
                if (!slot) {
                    res.json({
                        state: false,
                        msg: "No Slots found"
                    });
                    return false;
                }
        
                slot.isReservePending = false;
                slot.isReserved = false;
        
                slot.save(function (err, slot) {
                    if (err) throw err;
                    res.json({state:true, slot:slot});
                });        
                
            });
            
        });

router.post("/slot", function (req, res) {
    
        const slotId = req.body.slot;
        Slot.findOne({_id:slotId})
        .populate('lastReservedBy')
        .select('title isReserved isReservePending')
        .exec((err, slot) => {
            if (err) throw err;
            
            if (!slot) {
                res.json({
                    state: false,
                    msg: "No Slots found"
                });
                return false;
            }
    
            
            res.json({state:true, slot:slot});
                   
            
        });
        
    });


module.exports = router;