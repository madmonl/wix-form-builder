const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const db = require('./firebase/firebase');

const app = express();

app.use(express.static(path.join(__dirname, 'client', 'build')));
app.use(bodyParser.json());

app.get('/api/forms', (req, res) => db.ref('forms').once('value').then((snapshot) => {
  const forms = {};

  snapshot.forEach((child) => {
    const form = child.val();
    const submissions = form.submissions ? Object.values(form.submissions) : [];
    forms[child.key] = { ...form, submissions, id: child.key };
  });

  res.json(forms);
}));

app.post('/api/forms/submit/:id', (req, res) => {
  const submission = req.body;
  return db.ref(`forms/${req.params.id}/submissions`).push(submission).then(() => {
    res.json(req.body);
  });
});

app.post('/api/forms/', (req, res) => {
  const form = req.body;
  return db.ref('forms').push(form).then((snapshot) => {
    res.json({ ...form, id: snapshot.key });
  });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`form-builder is listening on port ${port}`);
