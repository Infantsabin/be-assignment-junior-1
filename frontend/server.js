const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors('*'));
// for production routing
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('build/'));
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(
      path.resolve(__dirname, 'build', 'index.html')
    );
  });
}

const PORT = process.env.PORT || 8200;
var listener = app.listen(PORT, function () {
  console.log('Server Started on port ' + listener.address().port);
});