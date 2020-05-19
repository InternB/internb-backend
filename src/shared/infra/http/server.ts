import express from 'express';

import '../typeorm';

const app = express();

app.get('/', (request, response) =>
  response.json({ message: 'Hello, InternB!' }),
);

app.listen(3333, () => {
  console.log('Server started on port 3333! 🚀 ');
});
