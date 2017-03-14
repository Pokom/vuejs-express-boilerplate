import mongoose from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';
import httpStatus from 'http-status';
import APIError from '../helpers/APIError';
const deepPopulate = require('mongoose-deep-populate')(mongoose);

/**
 * User Schema
 */
const UserSchema = new mongoose.Schema({
  mobileNumber: {
    type: String,
    match: [/^[1-9][0-9]{9}$/, 'The value of path {PATH} ({VALUE}) is not a valid mobile number.']
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  albums: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Album' }]
});

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

/**
 * Methods
 */
UserSchema.method({
});

/**
 * Statics
 */
UserSchema.statics = {
  /**
   * Get user
   * @param {ObjectId} id - The objectId of user.
   * @returns {Promise<User, APIError>}
   */
  get (id) {
    return this.findById(id)
      .exec()
      .then((user) => {
        if (user) {
          return user;
        }
        const err = new APIError('No such user exists!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },

  /**
   * List users in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of users to be skipped.
   * @param {number} limit - Limit number of users to be returned.
   * @returns {Promise<User[]>}
   */
  list ({ skip = 0, limit = 50 } = {}) {
    return this.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .exec();
  },
  /**
   * Register a user through passports proxy
   * @param {User} user - the new User objet to save
   * @param {String} password - password
   * @returns {Promise<User, APIError>}
   */
  registerUser (user, password) {
    return new Promise((resolve, reject) => {
      this.register(user, password, (error) => {
        if (error) {
          const err = new APIError(`${error.message}`, httpStatus.BAD_REQUEST, true);
          return reject(err);
        }
        return resolve(user);
      });
    });
  },

  updateUser (userId, user) {
    return new Promise((resolve, reject) => {
      const query = { _id: mongoose.Types.ObjectId(userId) };
      const options = { new: true };
      this.findOneAndUpdate(query, user, options, (err, savedDocument) => {
        if (err) {
          return reject(err);
        }
        return resolve(savedDocument);
      });
    });
  },
  listAlbums ({ limit, skip, user }) {
    return new Promise((resolve, reject) => {
      const { _id } = user;
      this.findById(_id, 'albums', (err, albums) => {
        if (err) {
          return reject(err);
        }
        return resolve(albums);
      });
    });
  }
};

UserSchema.plugin(passportLocalMongoose);
UserSchema.plugin(deepPopulate);
/**
 * @typedef User
 */
export default mongoose.model('User', UserSchema);
