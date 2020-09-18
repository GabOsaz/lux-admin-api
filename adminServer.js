const express = require('express');
const path  = require('path');

const mongoose = require('mongoose');
mongoose.set('debug', true);
mongoose.Promise = global.Promise;

const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const app = express();

const fileUpload = require('express-fileupload');

const signup = require('./routes/api/signup');
const login = require('./routes/api/login');
const eventCenter = require('./routes/api/eventCenters');
const fileUploadRoute = require('./routes/api/fileUpload');
const reservedVenues = require('./routes/api/reserveVenue');

const db = process.env.MONGO_URI;

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cors());
app.use(cookieParser());

app.use('/api/signup', signup);
app.use('/api/login', login);
app.use('/api/eventCenters', eventCenter);
app.use('/api/fileUpload', fileUploadRoute);
app.use('/api/reservedVenues', reservedVenues);

app.use(fileUpload({
    useTempFiles: true
}));

mongoose.connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
    }
)
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err)
)

if(process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

const port = process.env.PORT || 5060

app.listen(port, () => console.log(`Server started on port ${port}`));