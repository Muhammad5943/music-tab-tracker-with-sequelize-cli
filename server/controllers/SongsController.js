const { Song } = require('../models')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

module.exports = {
     async index (req, res) {
          try {
               let songs = null
               const search = req.query.search
               if (search) {
                    songs = await Song.findAll({
                         where: {
                         [Op.or]: [
                              {
                                   title: {
                                        [Op.like]: `%${search}%`
                                   }
                              },
                              {
                                   artist: {
                                        [Op.like]: `%${search}%`
                                   }
                              },
                              {
                                   genre: {
                                        [Op.like]: `%${search}%`
                                   }
                              },
                              {
                                   album: {
                                        [Op.like]: `%${search}%`
                                   }
                              }
                         ]
                    }}).then(songs => songs)
               } else {
                    songs = await Song.findAll({
                         limit: 10
                    })
               }

               res.status(200).send(songs)
          } catch (error) {
               return res.status(500).send({
                    error: 'An error has occured trying fetch the song'
               })
          }
     },

     async show (req, res) {
          try {
               const song = await Song.findByPk(req.params.songId)
               res.status(200).send(song)
          } catch (error) {
               return res.status(500).send({
                    error: 'An error has occured trying fetch the song'
               })
          }
     },
     
     async post (req, res) {
          try {
               const song = await Song.create(req.body)
               res.send(song)
          } catch (error) {
               return res.status(500).send({
                    error: 'An error has occured trying create the song'
               })
          }
     },
     
     async put (req, res) {
          try {
               await Song.update(req.body, {
                    where: {
                         id: req.params.songId
                    }
               })
               
               res.send(req.body)
          } catch (error) {
               return res.status(500).send({
                    error: 'An error has occured trying update the song'
               })
          }
     }
}