const router = require('express').Router();
const path = require('path');
// Import all of the API routes from /api/index.js 
const apiRoutes = require('./api');
// add prefix of `/api` to all of the api routes imported from the `api` directory
router.use('/api', apiRoutes);

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../client/public/index.html'));
  });

router.use((req, res) => res.send('Wrong route!'));

module.exports = router;