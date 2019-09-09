const express = require('express');

const db = require('./data/dbConfig');

const router = express.Router();

router.get('/', (req, res) => {
    db('accounts')
        .then(accounts => {
            res.status(200).json(accounts);
        })
        .catch(err => {
            res.status(500).json({ message: 'Failed to get accounts' });
        });
});


router.post('/', (req, res) => {
    db('accounts').insert({ name: 'Lisa', age: '12' })
        .then(accounts => {
            res.json(accounts);
        })
        .catch(err => {
            res.status(404).json({ message: 'Account not found.' });
        });
});


router.put('/:id', (req, res) => {
    db('accounts')
      .where({ id: req.params.id })
      .update(req.body)
      .then(count => {
        if (count) {
          res.status(200).json({ message: `${count} record(s) updated` });
        } else {
          res.status(404).json({ message: 'Account not found' });
        }
      })
      .catch(() => {
        res.status(500).json({ message: 'Could not update the account' });
      });
  });
  

  router.delete('/:id', (req, res) => {
    db('accounts')
      .where({ id: req.params.id })
      .del()
      .then(count => {
        res.status(200).json({ message: `${count} record(s) deleted` });
      })
      .catch(() => {
        res.status(500).json({ message: 'Could not remove the account' });
      });
  });

