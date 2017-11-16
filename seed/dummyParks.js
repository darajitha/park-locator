const Park = require('../models/park');
const Slot = require('../models/slot');

const dummyParks = [
    new Park({
        title: 'park1',
        position: {
            lat: 6.927079,
            lng: 79.891244
        },
        icon: 'mp.png'
    }),
    new Park({
        title: 'park2',
        position: {
            lat: 6.927079,
            lng: 79.862244
        },
        icon: 'mp.png'
    }),
    new Park({
        title: 'park3',
        position: {
            lat: 6.927079,
            lng: 79.823244
        },
        icon: 'mp.png'
    })
];

module.exports = () => {
    Park.remove().exec();
    Slot.remove().exec();
    dummyParks.forEach((park) => {
        park.save();

        const dummySlots = [
            new Slot({title: park.title + ' slot 1', isReserved: false, issReservePending:false, park: park._id}),
            new Slot({title: park.title + ' slot 2', isReserved: false, issReservePending:false, park: park._id}),
            new Slot({title: park.title + ' slot 2', isReserved: false, issReservePending:false, park: park._id}),
        ];

        dummySlots.forEach(slot => slot.save());

    });


}