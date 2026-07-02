const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname,"public")));

app.use((req, res) => {
    res.status(404).send('Not Found');
});

app.listen(3000, () => console.log('"Server running on port 3000'));
