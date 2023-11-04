const express = require('express')

const app = express();

app.use(express.static('client/build'));
app.get('*', (req, res) => {
	return res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});


const PORT = process.env.PORT || 5000


app.listen(PORT, () => console.log(`server is listening on port ${PORT}`))