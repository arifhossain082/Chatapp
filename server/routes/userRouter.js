const router = require('express').Router();
const userController = require('../controller/userController');

/**
 * Get user by id
 */
router.get('/:id', userController.getUserById);

/**
 * Update user by ID
 * @method put
 */
router.put('/:userId', userController.updateUser);


/**
 * Get all user from the DB
 * -Filter
 * -Sort
 * -pagenation
 * -select
 * @method Get
 * @route api/v1/users:sort["by, "name]
 * @visibility private
 */
router.get('/', userController.getAllUser);

/**
 * Create a new User
 * @method post
 */
router.post('/', userController.createNewUser)


module.exports = router;