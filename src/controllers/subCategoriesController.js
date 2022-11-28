import { write, read } from '../utils/model.js'

let categories = read('categories')
let sub_categories = read('sub_categories') 
let products = read('products')


let subCategoriesController = {
    GET: (req, res)=> {
    
        sub_categories.map(sub_category => {
            sub_category.product = products.filter(product => product.sub_category_id == sub_category.sub_category_id)
        })
        
        res.send( sub_categories )
    },


    GETBYID: (req, res)=> {
    
        sub_categories.map(sub_category => {
            sub_category.product = products.filter(product => product.sub_category_id == sub_category.sub_category_id)
        })
        
        
        let  { id } = req.params
        
        let sub_category = sub_categories.find(sub_category => sub_category.sub_category_id == id)
        
        res.send( sub_category )
    },


    PUT: (req,res) => {
        let { id } = req.params
        let { sub_category_name } = req.body
        let { category_id } = req.body
        console.log(id);
        let sub_categories = read('sub_categories')
        let sub_category = sub_categories.find(sub_category => sub_category.sub_category_id == id)
        if(!sub_category){
            return res.status(404).json({status: 404, message: 'sub_category not found'});
        }else {
            sub_category.sub_category_name = sub_category_name || sub_category.sub_category_name
            sub_category.category_id = category_id || sub_category.category_id
            write('sub_categories', sub_categories)
            return res.status(200).json({status: 200, message: 'category updated', data: sub_category})
        }
    },


    DELETE: (req, res) => {
        let { id } = req.params
        let sub_categories = read('sub_categories')
        
        let sub_categoryIndex = sub_categories.findIndex(sub_category => sub_category.sub_category_id == id)
        
        if(sub_categoryIndex != -1){
            let sub_category = sub_categories.splice( sub_categoryIndex, 1)
            write('sub_categories', sub_categories)
            return res.status(200).json({status: 200, message: 'sub_category deleted', data: sub_category})
        }else {
            return res.status(404).json({status: 404, message: 'sub_category not found'})
        }       
    },


    POST: (req, res) => {
        let { sub_category_name } = req.body
        let newSubCategory = { sub_category_id: sub_categories.at(-1)?.sub_category_id + 1 || 1, sub_category_name }
        sub_categories.push(newSubCategory)
        write('sub_categories', sub_categories)
        return res.status(201).json({status: 201, message: 'category added', data: newSubCategory })
    }
}

export default subCategoriesController