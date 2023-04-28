const express = require('express');
const app = express();

app.set('view engine', 'pug');

app.use(express.static('public'));

app.use((req, res, next) => {
  const date = new Date();
  const dayOfWeek = date.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
  const hourOfDay = date.getHours(); // 0 = midnight, 1 = 1am, ..., 23 = 11pm
  if (dayOfWeek >= 1 && dayOfWeek <= 5 && hourOfDay >= 9 && hourOfDay < 22) {
    // Allow access to the application during working hours
    next();
  } else {
    // Return a message indicating that the application is not available
    res.status(403).send('The application is only available during working hours (Monday to Friday, from 9 to 17)');
  }
});

app.get('/', (req, res) => {
  res.render('index', { title: 'Home Page' });
});

app.get('/services', (req, res) => {
  res.render('services', { title: 'Our Services' });
});

app.get('/contacts', (req, res) => {
  res.render('contacts', { title: 'Contact Us' });
});

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
