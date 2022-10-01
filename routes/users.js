const express = require('express');
const router = new express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const { DB_URI } = require('../config');

/** GET / - get list of users.
 *
 * => {users: [{username, first_name, last_name, phone}, ...]}
 *
 **/
router.get('/', async (req, res, next) => {
	const all = await User.all();
	return res.json({ all });
});

/** GET /:username - get detail of users.
 *
 * => {user: {username, first_name, last_name, phone, join_at, last_login_at}}
 *
 **/
router.get('/:username', async (req, res, next) => {
	try {
		const user = await User.get(req.params.username);
		console.log('------>', user);
		return res.json({ user });
	} catch (e) {
		next(e);
	}
});

/** GET /:username/to - get messages to user
 *
 * => {messages: [{id,
 *                 body,
 *                 sent_at,
 *                 read_at,
 *                 from_user: {username, first_name, last_name, phone}}, ...]}
 *
 **/
router.get('/:username/to', async (req, res, next) => {
	try {
		let messages = await User.messagesTo(req.params.username);
		return res.json({ messages });
	} catch (e) {}
});

/** GET /:username/from - get messages from user
 *
 * => {messages: [{id,
 *                 body,
 *                 sent_at,
 *                 read_at,
 *                 to_user: {username, first_name, last_name, phone}}, ...]}
 *
 **/
router.get('/:username/from', async (req, res, next) => {
	const messages = User.messagesFrom(req.params.username);
	return res.json({ messages });
});

module.exports = router;
