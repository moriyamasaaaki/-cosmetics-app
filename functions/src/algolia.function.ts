import * as functions from 'firebase-functions';
const algoliasearch = require("algoliasearch");

const ALGOLIA_ID = functions.config().algolia.app_id;
const ALGOLIA_ADMIN_KEY = functions.config().algolia.api_key;
const client = algoliasearch(ALGOLIA_ID, ALGOLIA_ADMIN_KEY);
const index = client.initIndex('article');

const addRecords = (item: any) => {
  const records = item.content.match(/[\s\S]{1,500}/gm).map((content: any, i: number) => {
    return {
      ...item,
      objectID: item.id + '-' + i,
      content
    }
  });

  return Promise.all(records.map((record: any) => index.saveObject(record)));
}

export const addIndex = (data: any) => {
  const item = data;
  // algoliaに追加するレコードのIDをドキュメントに含まれるIDと同じにする
  item.objectID = data.articleId;
  item.createdAt = item.createdAt.toMillis();

  if (item.content && item.content.length > 500) {
    return addRecords(item);
  } else {
    return index.saveObject(item);
  }
}

// 削除
export const removeIndex = (id: string) => {
  return index.deleteBy({ filters: `articleId:${id}` }); // 特定のidをもつレコードをすべて削除
}

// 更新
export const updateIndex = async (data: any) => {
  const item = data;
  item.objectID = data.articleId;
  item.updatedAt = item.updatedAt.toMillis(); // firestoreのタイムスタンプ型をミリ秒に変換
  item.createdAt = item.createdAt.toMillis(); // firestoreのタイムスタンプ型をミリ秒に変換
  await removeIndex(item.articleId); // まずは既存レコードを削除
  if (item.content && item.content.length > 500) {
    return addRecords(item);
  } else {
    return index.saveObject(item);
  }
}
