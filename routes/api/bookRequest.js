const express = require('express')
const Router = express.Router()
const BookRequest = require('../../models/BookRequest')

Router.get('/:pageNumber/:limit', async (req, res) => {
    const count = await BookRequest.countDocuments()
    BookRequest.find()
    .skip((+req.params.pageNumber-1) * +req.params.limit)
    .limit(+req.params.limit)
    .exec((err, data) => {
        if(!err && data !== null)
            res.status(200).send({total: count, authors: data})
        else
            res.status(203).send({message: 'No data exists'})
    })
})

Router.delete('/:slug', (req, res) => {
    BookRequest.deleteOne({slug: req.params.slug}, (err) => {
        if(!err)
            res.status(200).send({message: 'Deleted Successfully!'})
    })
})

module.exports = Router