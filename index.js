// index.js
// where your node app starts

// init project
const express = require("express")
const app = express()

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
const cors = require("cors")
app.use(cors({ optionsSuccessStatus: 200 })) // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"))

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html")
})

// your first API endpoint...
app.get("/api/hello", (req, res) => {
  res.json({ greeting: "hello API" })
})

app.get("/api/:date?", (req, res) => {
  const dateParam = req.params.date
  let date = dateParam ? new Date(dateParam) : new Date()

  if (isNaN(date)) {
    date = new Date(Number(dateParam))

    if (isNaN(date)) {
      res.json({ error: "Invalid Date" })
      return
    }
  }

  res.json({
    unix: Date.parse(date),
    utc: date.toUTCString(),
  })
})

// Listen on port set in environment variable or default to 3000
const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("Your app is listening on port " + listener.address().port)
})
