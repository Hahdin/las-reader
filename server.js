import express from 'express'
const port = process.env.PORT || 5555
const app = express()
import path  from 'path'
app.use(express.static('dist'))
app.get('/*', (req, res) =>{
  res.sendFile(path.resolve(__dirname+ '/../dist/index.html'), function (err) {
  //res.sendFile(path.join(__dirname, '/dist/index.html'), (err) =>{
    if (err)
      res.status(500).send(err)
  })
})
app.listen(port, () =>{
  console.log(`Server listening on port ${port}`)
})