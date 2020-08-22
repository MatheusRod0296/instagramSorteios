//Importa as dependências que acabamos de instalar
const express = require('express');
const path = require('path');

const app = express();

// Serve os arquivos estáticos da pasta dist (gerada pelo ng build)
app.use(express.static(__dirname + '/dist/sorteios-front'));

app.get('/*', function(req,res) {
    
res.sendFile(path.join(__dirname+'/dist/sorteios-front/index.html'));
});

// Inicia a aplicação pela porta configurada
const { PORT=3000, LOCAL_ADDRESS='0.0.0.0' } = process.env
app.listen(PORT, LOCAL_ADDRESS, () => {
  const address = server.address();
  console.log('server listening at', address);
});
