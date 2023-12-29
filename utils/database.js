
//Load module
const  Sequelize  = require('sequelize');


//To connect to the database, you must create a Sequelize instance

const sequelize = new Sequelize('node_platform', 'root', 'won5892123', {
  host: 'localhost:8000',
  dialect: 'mysql',
  operatorAliases:false,
});


module.exports = sequelize


















// //initialize pool
// // const db = sql => {
// //   return new Promise( ( resolve, reject ) => {
// let connection = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "won5892123",
//     database: 'node_platform',
//   }).promise()
// ;


// connection.connect((error) => {
//   if(error){
//       console.error(error);
//       return;
//   }
//   console.log('The database is successfully connected.');
// })

// const connectionPromise = connection.promise();

// // console.log('test2');
// // connection.db( sql, ( err, rows ) => {
// //     if ( err )
// //     {
// //         connection.end();
// //         reject( err );
// //     }
// //     else
// //     {
// //         connection.end();
// //         resolve( rows );
// //     }
// // });
// // ;

  

// module.exports = connectionPromise;