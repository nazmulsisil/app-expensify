import * as firebase from 'firebase';
import expenses from '../tests/fixtures/expenses';

var config = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID
};

firebase.initializeApp(config);

const database = firebase.database();

export { firebase, database as default };

// database.ref().remove();

// database.ref('expenses').push(expenses[0]);
// database.ref('expenses').push(expenses[1]);
// database.ref('expenses').push(expenses[2]);

// database.ref('expenses').on('value', snapshot => {
//   const expensesDB = [];
//   snapshot.forEach(childSnapshot => {
//     expensesDB.push({
//       ...childSnapshot.val(),
//       id: childSnapshot.key
//     });
//   });

//   console.log(expensesDB);
// });

// database.ref('expenses').on('child_removed', snapshot => {
//   console.log('Some or one property of expenses got deleted.');
//   console.log(snapshot.key, snapshot.val());
// });

// database.ref('expenses').on('child_changed', snapshot => {
//   console.log('Some or one property of expenses got changes.');
//   console.log(snapshot.key, snapshot.val());
// });

// database.ref().on('value', snapshot => {
//   const { name, job } = snapshot.val();
//   const { company, title } = job;
//   console.log(`${name} is a ${title} at ${company}`);
// });

// setTimeout(function() {
//   database.ref().update({
//     name: 'Nazz',
//     'job/company': 'NazzTech',
//     'job/title': 'Programmer'
//   });
// }, 5000);

// database
//   .ref()
//   .set({
//     name: 'sisil',
//     age: 26,
//     stressLevel: 6,
//     job: {
//       title: 'Software developer',
//       company: 'Google'
//     },
//     location: {
//       city: 'Philadelphia',
//       country: 'United States'
//     }
//   })
//   .then(() => {
//     console.log('Data is saved!');
//   })
//   .catch(e => {
//     console.log('This failed.', e);
//   });

// database.ref().update({
//   stressLevel: 9,
//   'job/company': 'Amazon',
//   'location/city': 'Seattle'
// });
