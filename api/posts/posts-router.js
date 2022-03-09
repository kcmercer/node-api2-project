// implement your posts router here
const Posts = require('./posts-model')
const router = require('express').Router()

router.get('/', (req, res) => {
  Posts.find()
    .then(posts => {
      res.status(200).json(posts)
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({
        message: 'The posts information could not be retrieved'
      })
    })
})

router.get('/:id', (req, res) => {
  Posts.findById(req.params.id)
    .then(posts => {
      if(posts) {
        res.status(200).json(posts)
      } else {
        res.status(404).json({
          message: 'The post with the specified ID does not exist'
        })
      }
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({
        message: 'Error retrieving the posts'
      })
    })
})

router.post('/', (req, res) => {
  let body = req.body
  
  if(!body.title) {
    res.status(400).json({
      message: 'Please provide a title for the posts'
    })
  } else if(!body.contents) {
    res.status(400).json({
      message: 'Please provide conents for the post'
    })
  } else {
    Posts.insert(body)
      .then(posts => {
        res.status(201).json({
          id: posts.id,
          ...body
        })
      })
      .catch(error => {
        console.log(error)
        res.status(500).json({
          message: 'There was an error while saving the post to the database'
        })
      })
  }
})

router.put('/:id', (req, res) => {
  const changes = req.body

  if(!changes.title || !changes.contents) {
    res.status(400).json({
      message: 'Please provide title and contents for the post'
      })
    } else {
      Posts.update(req.params.id, changes)
        .then(updatedPosts => {
          if(!updatedPosts) {
            res.status(404).json({
              message: 'The post with the sepcified ID does not exist'
            })
          } else {
            res.status(200).json({
              ...changes,
              id: Number(req.params.id)
            })
          }
        })
        .catch(error => {
          console.log(error)
          res.status(500).json({
            message: 'The post information could not be modified'
          })
        })
    }
})

router.delete('/:id', async (req, res) => {
  try {
    const post = await Posts.findById(req.params.id)

    if(!post) {
      res.status(404).json({
        message: 'The post with the specified ID does not exist'
      })
    } else {
      await Posts.remove(req.params.id)
      res.status(200).json(post)
    }
  } catch {
    res.status(500).json({
      message: 'The post could not be removed'
    })
  }
})

router.get('/:id/comments', (req, res) => {
  Posts.findPostComments(req.params.id)
    .then(comments => {
      if(comments.length > 0) {
        res.status(200).json(comments)
      } else {
        res.status(404).json({
          message: 'The post with the spcified ID does not exist'
        })
      }
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({
        message: 'The comments information could not be retrieved'
      })
    })
})

module.exports = router;