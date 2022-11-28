import { write, read } from '../utils/model.js'

let categories = read('categories')
let sub_categories = read('sub_categories') 
let products = read('products')


let productsController = {
    GET: (req, res)=> {
        let { model } = req.query
        let { sub_category_id } = req.query
        let { category_id } = req.query
        

        if (category_id) {
            let findedProducts = []
            sub_categories.filter((subcategory) => {
                if (subcategory.category_id == category_id) {
                    products.filter((product) => {
                        if (product.sub_category_id == subcategory.sub_category_id) {
                            findedProducts.push(product)
                        }
                    })
                }
            })
            if (!(findedProducts.length <= 1)) {
                res.status(200).send(findedProducts)
            } else {
                res.status(404).send("In your request have problem")
            }
        }
        let productSearch = products.filter((product) => {
            let sub_category = sub_category_id ? product.sub_category_id == sub_category_id : true
            let productModel = model ? product.model == model : true
            return sub_category && productModel
        })

        if (productSearch.length) {
            res.status(200).send(productSearch)
        } else { res.status(404).send("In your request have problem") }
    
    },


    GETBYID: (req, res) => {
        let  { id } = req.params
    
        let products = products.find(product => product.product_id == id)
    
        res.send( products )
    },


    PUT: (req,res) => {
        let { id } = req.params
        let { sub_category_id, product_name, price, color, model } = req.body
        let product = products.find(product => product.product_id == id && product_name.length && price , color.length , model.length)
        if(!product){
            return res.status(404).json({status: 404, message: 'product not found'});
        }else {
            product.sub_category_id = sub_category_id || product.sub_category_id
            product.product_name = product_name || product.product_name
            product.model = model || product.model
            product.color = color || product.color
            product.price = price || product.price
            write('products', products)
            return res.status(200).json({status: 200, message: 'product updated', data: product})
        }
    },


    DELETE: (req, res) => {
        let { id } = req.params
        let products = read('products')
        
        let productIndex = products.findIndex(product => product.product_id == id)
        
        if(productIndex != -1){
            let product = products.splice( productIndex, 1)
            write('products', products)
            return res.status(200).json({status: 200, message: 'product deleted', data: product})
        }else {
            return res.status(404).json({status: 404, message: 'product not found'})
        }     
    },


    POST: (req, res) => {
        let { sub_category_id, product_name, price, color, model } = req.body

        let newProduct = {
            "product_id": products.at(-1).product_id + 1 || 1,
            "sub_category_id": sub_category_id,
            "product_name": product_name,
            "price": price,
            "color": color,
            "model": model
        }
        products.push(newProduct)
        write('products', products)
        return res.status(201).json({status: 201, message: 'category added', data: newProduct })
    }
}

export default productsController