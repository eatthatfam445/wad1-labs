'use strict';
import { v2 as cloudinary } from "cloudinary";
import logger from '../utils/logger.js';
import JsonStore from './json-store.js';

const userStore = {

  store: new JsonStore('./models/user-store.json', { users: [] }),
  collection: 'users',

  getAllUsers() {
    return this.store.findAll(this.collection);
  },
  
  getUserById(id) {
    return this.store.findOneBy(this.collection, (user => user.id === id));
  },
  
  getUserByEmail(email) {
    return this.store.findOneBy(this.collection, (user => user.email === email));
  },
  
 async addUser(user, file, callback) {
  try {
    if (file) {
      user.picture = await this.store.addToCloudinary(file);
    }
    this.store.addCollection(this.collection, user);
    callback();
  } catch (error) {
    logger.error(error);
    callback(error);
  }
}
}

export default userStore;
