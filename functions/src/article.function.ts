import * as functions from 'firebase-functions';
import { addIndex, updateIndex, removeIndex } from './algolia.function';

export const createArticle = functions.firestore
  .document('articles/{articleId}')
  .onCreate(async (snap, context) => {
    return addIndex(snap.data());
  });

export const updateLessonMeta = functions.firestore
  .document('articles/{articleId}')
  .onUpdate(async (change, context) => {
    const newData = change.after.data();

    if (!newData) {
      throw new Error('データが存在しません');
    }

    return updateIndex(newData);
  });

export const deleteArticle = functions.firestore
  .document('articles/{articleId}')
  .onDelete(async (snapshot, context) => {
    return removeIndex(context.params.articleId);
  });
