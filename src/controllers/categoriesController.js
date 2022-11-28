import { write, read } from '../utils/model.js'

let categories = read('categories')
let sub_categories = read('sub_categories') 
let products = read('products')


let categoriesController = {
    GET: (req, res)=> {
        categories.map(categotry => {
            categotry.sub_category = sub_categories.filter(sub_category => sub_category.category_id == categotry.category_id)
        })
        
        res.send( categories )
    },



    GETBYID: (req, res) => {
    
        categories.map(categotry => {
            categotry.sub_category = sub_categories.filter(sub_category => sub_category.category_id == categotry.category_id)
        })
        
        sub_categories.map(sub_category => {
            sub_category.product = products.filter(product => product.sub_category_id == sub_category.sub_category_id)
        })
        
        let  { id } = req.params
        
        let category = categories.find(category => category.category_id == id)
        
        res.send( category )
    },



    PUT: (req, res) => {
        let { id } = req.params
        let categories = read('categories')
        let { category_name } = req.body
        let category = categories.find(category => category.category_id == id)
    
        if(!category){
            return res.status(404).json({status: 404, message: 'category not found'});
        }else {
            category.category_name = category_name || category.category_name
            write('categories', categories)
            return res.status(200).json({status: 200, message: 'category updated', data: category})
        }
    },



    DELETE: (req, res) => {
        let { id } = req.params
        let categories = read('categories')
    
        let categoryIndex = categories.findIndex(category => category.category_id == id)
    
        if(categoryIndex != -1){
            let category = categories.splice( categoryIndex, 1)
            write('categories', categories)
            return res.status(200).json({status: 200, message: 'category deleted', data: category})
        }else {
            return res.status(404).json({status: 404, message: 'category not found'})
        }       
    },
    
    
    
    POST:   (req, res) => {
        let { category_name } = req.body
        let newCategory = { "category_name": category_name, "category_id": categories.at(-1).category_id + 1 || 1 }
        categories.push(newCategory)
        console.log(newCategory);
        write('categories', categories)
        return res.status(201).json({status: 201, message: 'category added', data: newCategory })
    }
}




export default categoriesController