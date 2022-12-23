const router = require('express').Router();
<<<<<<< HEAD
const withAuth = require('../../utils/auth');

=======
>>>>>>> 255277c392d0af7ba1ac49a3ecec0f334f97ec6f
const {
  createUser,
  getSingleUser,
  saveArtist,
  deleteArtist,
  login,
} = require('../../controllers/user-controller');

// import middleware
const { authMiddleware } = require('../../utils/auth');

// put authMiddleware anywhere we need to send a token for verification of user
router.route('/').post(createUser).put(authMiddleware, saveArtist);

router.route('/login').post(login);

router.route('/me').get(authMiddleware, getSingleUser);

router.route('/artists/:artistId').delete(authMiddleware, deleteArtist);

module.exports = router;
