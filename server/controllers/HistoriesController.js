const { 
     History,
     Song
} = require('../models')

const _ = require('lodash')

module.exports = {
     async index (req, res) {
          try {
              const userId = req.user.id
            //   const { userId /* (used it before implement jwt-passport) */ } = req.query
              const histories = await History.findAll({
                  where: {
                      UserId: userId
                  },
                  include: [
                      {
                          model: Song
                      }
                  ]
              })
                // .map(history => history.toJSON())
                // .map(history => _.extend(
                //     {},
                //     history.Song,
                //     history
                // ))

              res.status(200).send(_.uniqBy(histories, history => history.SongId))
          } catch (err) {
               res.status(500).send({
                    error: 'an error has occured trying to fetch the history'
               })
          }
     },

     async post (req, res) {
        try {
            /* const userId = req.user.id (come from passport user authenticated) */
            const userId = req.user.id /* req.query */
            const { /* userId, */ songId } = req.body
            const history = await History.create({
                SongId: songId,
                UserId: userId
            })


            res.send(history)
        } catch (err) {
            console.log(err);
            res.status(500).send({
                error: 'an error has occured trying to created history object'
            })
        }
    }
}