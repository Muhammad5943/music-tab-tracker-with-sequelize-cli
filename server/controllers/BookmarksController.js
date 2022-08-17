const { 
     Bookmark,
     Song
} = require('../models')

module.exports = {
     async index (req, res) {
          try {
              const userId = req.user.id
              const { songId } = req.query
              const where = {
                  UserId: userId
              }

              if (songId) {
                  where.SongId = songId
              }
  
              const bookmarks = await Bookmark.findAll({
                  where: where,
                  include: [
                      {
                          model: Song
                      }
                  ]
              })
                // .map(bookmark => bookmark.toJSON())
                // .map(bookmark => _.extend(
                //     {},
                //     bookmark.Song,
                //     bookmark
                // ))

                // console.log(bookmarks);
              res.status(200).send(bookmarks)
          } catch (err) {
               res.status(500).send({
                    error: 'an error has occured trying to fetch the bookmark'
               })
          }
     },

     async post (req, res) {
          try {
              const userId = req.user.id
            //   console.log('userId = ', userId);
              const { songId } = req.body
              const bookmark = await Bookmark.findOne({
                  where: {
                      SongId: songId,
                      UserId: userId
                  }
              })

          //     console.log(bookmark);
              
              if (bookmark) {
                  return res.status(400).send({
                      error: 'you already have this set as a bookmark'
                  })
              }
  
          //     const bookmark = req.body
          //     const newBookmark = await Bookmark.create(req.body) 
              const newBookmark = await Bookmark.create({
                  SongId: songId,
                  UserId: userId
              })
  
          //     res.send(newBookmark)
               res.status(200).send(newBookmark)
          } catch (err) {
              console.log(err);
              res.status(500).send({
                  error: 'an error has occured trying to created bookmark'
              })
          }
     },
  
     async delete (req, res) {
          try {
               const userId = req.user.id
               const { bookmarkId } = req.params

                // const bookmark = await Bookmark.findByPk(bookmarkId) (used in development)
                // console.log(bookmark);

               const bookmark = await Bookmark.findOne({
                    where: {
                         id: bookmarkId,
                         UserId: userId
                    }
               })
               if (!bookmark) {
                    return res.status(403).send({
                         error: 'you do not access to this bookmark'
                    })
               }

               await bookmark.destroy()
               res.send(bookmark)
          } catch (err) {
               res.status(500).send({
                    error: 'an error has occured trying to delete bookmark'
               })
          }
     }
}