const Park = require('../models/park');

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
    dummyParks.forEach((park) => {
        park.save();
    });


}