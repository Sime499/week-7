const express = require('express')
const mustacheExpress = require('mustache-express')
const app = express()


app.use(express.urlencoded())

app.engine('mustache', mustacheExpress())

app.set('views', './views')
app.set('view engine', 'mustache')

app.use(express.static('public'))

app.use(session({
    secret: 'THISISSECRETKEY',
    saveUninitialized: true,
    resave: true
}))



let trips = [{
    taskID: 1,
    title: 'Duluth',
    dateOfDeparture: '16/08/2021',
    dateOfReturn: '16/09/2021',
    imageUrl: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80'

}]

let users = [{ username: 'johndoe', password: 'password' }]


app.get('/trips', (req, res) => {

    res.render('index', { allTrips: trips })
})

app.post('/add-trip', (req, res) => {

    const tripTitle = req.body.tripTitle
    const tripimageUrl = req.body.tripimageUrl
    const tripdateOfDeparture = req.body.tripdateOfDeparture
    const tripdateOfReturn = req.body.tripdateOfReturn

    let trip = { title: tripTitle, imageUrl: tripimageUrl, dateOfDeparture: tripdateOfDeparture, dateOfReturn: tripdateOfReturn }

    trips.push(trip)
    res.redirect('/trips')
})

app.get('/', (req, res) => {
    res.render('index', { name: 'dave' })
})

app.get('/login', (req, res) => {
    res.render('login')

})

app.get('/register', (req, res) => {
    res.render('register')
})
app.post('/login', (req, res) => {
    const username = req.body.username
    const password = req.body.password
    const persistedUser = users.find(user => {
        return user.username == username && user.password == password
    })

    if (persistedUser) {
        if (req.session) {
            req.session.username = persistedUser.username
        }
        res.redirect('register')
    } else {
        res.render('login', { errorMessage: 'username or pasword error' })
    }
})

app.get('/register', (req, res) =>
res.render('/register', { username: req.session.username })

})

app.post('/register', (req, res) => {
    users.push({
        const id = date.now().tostring()
        const name = req.body.name,
            email: req.body.email,
            password: req.body.password
    })




    console.log(users)
})


app.post('/delete-trip', (req, res) => {

    const tripID = parseInt(req.body.tripID)

    trips = tasks.filter((trips) => {
        return trip.tripID != taskID
    })

    res.redirect('/trips')
})

app.listen(3000, () => {
    console.log('server is running...')
})