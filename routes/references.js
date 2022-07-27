import { Router } from 'express'
import * as referencesCtrl from '../controllers/posts.js'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'
const router = Router()

/*---------- Public Routes ----------*/
router.get('/', referencesCtrl.index)
/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
router.post('/', checkAuth, referencesCtrl.create)
router.put('/:id', checkAuth, referencesCtrl.update)
router.put('/:id/add-photo', checkAuth, referencesCtrl.addPhoto)
router.delete('/:id', checkAuth, referencesCtrl.delete)


export {
  router
}