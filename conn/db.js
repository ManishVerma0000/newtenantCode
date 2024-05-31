const mongoose = require('mongoose');
const conn = mongoose.connect(process.env.CONNURL).then((res) => {
    console.log('connected')
}).catch((err) => {
    console.log(err.message)
})

module.exports = conn