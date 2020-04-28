import * as functions from 'firebase-functions';

const admin = require('firebase-admin');
admin.initializeApp();
const db = admin.firestore();

export const createUser = functions.auth.user().onCreate(user => {
  db.doc(`users/${user.uid}`).set({
    userId: user.uid,
    avatorImage: user.photoURL,
    userName: user.displayName,
    liked: 0,
  });
});
