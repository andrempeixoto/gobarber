import express from 'express';

const app = express();

app.get('/', (request, response) => {
  return response.json({message: 'Hey!'})
});

app.listen(3330, () => {
  console.log('🚀 Server started on port 3330')
});