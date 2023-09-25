// const { open } = require("sqlite");
// const sqlite3 = require("sqlite3").verbose();
// let db = null;
// const initializeDatabase = async () => {
//   db = await open({
//     filename: "database.db",
//     driver: sqlite3.Database,
//   });
//   const sqlq = `delete from chatdata`;
//   const resp = await db.run(sqlq);
//   console.log(resp);
// };
// initializeDatabase();
const jwt_decode = require("jwt-decode");
var obj = { a: "a", b: "b" };
var encoded = btoa(JSON.stringify(obj));

console.log(jwt_decode(encoded));
