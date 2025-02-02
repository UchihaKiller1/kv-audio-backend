import Product from "../models/product.js";

export function addProduct(req,res){

    console.log(req.user)
    if(req.user==null){

        res.status(401).json({ messege : "Please login and try again"})

        return
    }

    if(req.user.type!="admin"){

        res.status(403).json({ 
            messege: "You are not authorized to perform this action"


        })

        return
    }
    const data =req.body;
    const newProduct = new Product(data)
    newProduct.save().then(()=>
    {
        res.json({ messege : "Product saved successfully!"})

    }).catch((error)=>{

        res.json({ messege : "error occured!"})

    })

}