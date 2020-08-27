const mongoose = require('mongoose')
// 'mongodb://127.0.0.1:27017/spicy_corner'
// process.env.MONGODB_URL
mongoose.connect('mongodb://127.0.0.1:27017/spicy_corner', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true 
})