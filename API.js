require('dotenv').config();
const express = require('express');
const app = express ();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Task Manager API is running');
});

const PORT = process.env.PORT || 3002

app.listen(PORT, () =>{
    console.log(`ÀPI is running on PORT ${PORT}`)
});
