import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
admin.initializeApp();

import { markEventTried, shouldEventRun } from './utility.function';

const db = admin.firestore();

export const countUpLiked = functions.firestore
  .document('likes/{articleId}/likedUsers/{userId}')
  .onCreate(async (snap, context) => {
    const eventId = context.eventId;
    return shouldEventRun(eventId).then(async (should: boolean) => {
      if (should) {
        console.log(should);
        await db
          .doc(`articles/${context.params.articleId}`)
          .update('liked', admin.firestore.FieldValue.increment(1));
        return markEventTried(eventId);
      } else {
        return;
      }
    });
  });

