const express = require('express')
const app = express();
const cors = require('cors')
require('./models/index')
app.use(express.json());
const port = process.env.PORT || 4000;

app.use(cors());

app.get('/', (req, res) => {
    res.send('v.1.0.13')
})

app.use('/api/users', require('./routes/User'));
app.use('/api/entries', require('./routes/TimeEntry'));
app.use('/api/tasks', require('./routes/Task'));

app.listen(port, () => {
    console.log('server running on port: ' + port);
})