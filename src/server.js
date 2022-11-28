import express from 'express'
import {read, write} from './utils/model.js'
const app = express()
import cors from 'cors'

import categoriesController from './controllers/categoriesController.js'
import subCategoriesController from './controllers/subCategoriesController.js'
import productsController from './controllers/productsController.js'


app.use(cors())
app.use(express.json())


let categories = read('categories')
let sub_categories = read('sub_categories') 
let products = read('products')






app.get('/categories', categoriesController.GET)
app.get('/categories/:id', categoriesController.GETBYID)
app.put('/categories/:id', categoriesController.PUT)
app.delete('/categories/:id', categoriesController.DELETE)
app.post('/categories', categoriesController.POST)






app.get('/sub_categories', subCategoriesController.GET)
app.get('/sub_categories/:id', subCategoriesController.GETBYID)
app.put('/sub_categories/:id', subCategoriesController.PUT)
app.delete('/sub_categories/:id', subCategoriesController.DELETE)
app.post('/sub_categories', subCategoriesController.POST)






app.get('/products', productsController.GET)
app.get('/products/:id', productsController.GETBYID)
app.put('/products/:id', productsController.PUT)
app.delete('/products/:id', productsController.DELETE)
app.post('/products', productsController.POST)


app.listen(5000, () => console.log('server url: http://localhost:5000'))