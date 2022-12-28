// fetch('https://jsonplaceholder.typicode.com/users')
//   .then(function (response) {
//     console.log('response: ', response);
//     return response.json();
//   })
//   .then(function (data) {
//     console.log('data: ', data);
//   })
//   .catch(function (err) {
//     console.log('There was an error: ', err );
//   })

// data:  (10) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]

// 2
/*
fetch('https://jsonplaceholder.typicode.com/users')
  .then(response => response.json())
  .then(data => console.log('data: ', data))
  .catch(err => console.log('There was an error: ', err ))
*/

// 3
/*
// post
fetch('https://jsonplaceholder.typicode.com/users', {
  method: 'POST',
  headers: {
    'authorization': 'Bearer 123'
  },
  body: JSON.stringify({
    data: 456
  })
})
  .then(response => response.json())
  .then(data => console.log('data: ', data))
  .catch(err => console.log('There was an error: ', err ))
*/
