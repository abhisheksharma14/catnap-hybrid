import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase("catnap.db", 1.0);

export function init() {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS calenders (
                    id integer primary key not null, 
                    title text,
                    name text, 
                    color text,
                    source text,
                    isSynced int
                  );`,
        [],
        (txn, result) => resolve(result),
        (txn, err) => reject(err)
      );
    });
  });
}

export function addCalender(calender) {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql("INSERT INTO calenders (id, title, name, color, source, isSynced) values (?, ?, ?, ?, ?, ?);",
        [calender.id, calender.title, calender.name, calender.color, calender.source.name, calender.isSynced],
        (txn, result) => resolve(result),
        (txn, err) => reject(err.message)
      );
    });
  });
}

export function getCalenderById(id) {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT * FROM calenders where id = ?;`,
        [id],
        (txn, result) => resolve(result),
        (txn, err) => reject(err.message)
      );
    });
  });
}

export function getCalenders() {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT * FROM calenders;`,
        [],
        (txn, result) => resolve(result.rows._array),
        (txn, err) => reject(err.message)
      );
    });
  });
}

export function deleteCalenders() {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `DELETE FROM calenders;`,
        [],
        (txn, result) => resolve(result),
        (txn, err) => reject(err.message)
      );
    });
  });
}
