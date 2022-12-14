const AuthenticationController = require('./controllers/AuthenticationController')
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy')
const SongsController = require('./controllers/SongsController')
const BookmarksController = require('./controllers/BookmarksController')
const HistoriesController = require('./controllers/HistoriesController')

// middleware
const isAuthenticated = require('./policies/isAuthenticated')

module.exports = (app) => {
     /* Authentication */
     app.post('/register',
          AuthenticationControllerPolicy.register,
          AuthenticationController.register
     )
     app.post('/login',
          AuthenticationController.login
     )

     /* Song */
     app.get('/songs',
          SongsController.index
     )
     app.get('/songs/:songId',
          SongsController.show
     )
     app.post('/songs',
          // isAuthenticated,
          SongsController.post
     )
     app.put('/songs/:songId',
          // isAuthenticated,
          SongsController.put
     )

     /* Bookmark */
     app.get('/bookmarks',
          isAuthenticated,
          BookmarksController.index
     )
     app.post('/bookmarks',
          isAuthenticated,
          BookmarksController.post
     )
     app.delete('/bookmark/:bookmarkId', 
          isAuthenticated,
          BookmarksController.delete
     )
     
     /* History */
     app.get('/histories',
          isAuthenticated,
          HistoriesController.index
     )
     app.post('/histories',
          isAuthenticated,
          HistoriesController.post
     )
}