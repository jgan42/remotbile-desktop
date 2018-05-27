'use strict';

class Firebase {

  constructor() {
    const config = require('./config');
    this.admin = require('firebase-admin');

    this.admin.initializeApp({
      credential: this.admin.credential.cert(config.firebase.serviceAccount),
      databaseURL: config.firebase.databaseURL,
    });
    this.db = this.admin.database();
  }

  watchOrientation(onOrientationChange) {
    return this.db.ref('orientation').on('value', snap => {
      onOrientationChange(snap.val());
    });
  }

  watchRange(onRangeChange) {
    return this.db.ref('range').on('value', snap => {
      onRangeChange(snap.val());
    });
  }

  watchClick(onClickChange) {
    return this.db.ref('click').on('value', snap => {
      onClickChange(snap.val());
    });
  }

}

module.exports = new Firebase();
