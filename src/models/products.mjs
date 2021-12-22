import ProductsSchema from './schemas/products.schema.mjs';
import ProductsAuditSchema from './schemas/productsAudit.schema.mjs';
export class Products {
    constructor() {
    }
    create(product) {
        return new Promise(resolve => {
            let productoRs = new ProductsSchema(product);
            productoRs.save((err, rs) => {
                let errorList = [];
                if (err) {
                    if (err.name === 'ValidationError') {
                        errorList = Object.values(err.errors).map(val => val.message);
                    } else if (err.keyValue.title != null && err.name === "MongoError" && err.code === 11000) {
                        errorList.push('Ya existe un Producto con ese titulo');
                    } else if (err.keyValue.description != null && err.name === "MongoError" && err.code === 11000) {
                        errorList.push('Ya existe un Producto con esa descripcion');
                    }              
                    return resolve([0,'Error',errorList,400]);
                }
                return resolve([1,'Ok',rs,200]);
            });
        });
    }
    update(id,product){
        return new Promise(resolve => {
            if (Object.keys(product).length === 0) {
                return resolve([0,"El body es Obligatorio",400]); 
            }
            if (typeof product.updateBy == 'undefined' || product.updateBy=='') {
                return resolve([0,"El Campo updateBy es Obligatorio",400]); 
            }
            ProductsSchema.findOneAndUpdate({_id:id},product,async function (err, rs) {
                if (err||rs==null) return resolve([0,"No se ha encontrado el producto con id:"+id,400]);
                let productoAuditRs = new ProductsAuditSchema({
                    title: rs.title,
                    description: rs.description,
                    price: rs.price,
                    category: rs.category,
                    createBy: rs.createBy,
                    updateBy: product.updateBy,
                    deleteBy: rs.deleteBy,
                    state: rs.state,
                });
                productoAuditRs.save((err, rs) => {
                    if (err) {
                        return resolve([0,'Error',400]);
                    }
                    return resolve([1,"Se ha modificado correctamente el producto con id: "+id,200]);
                });
            })
        });
    }
    updateCategory(id,category){
        return new Promise(resolve => {
            if (typeof category == 'undefined'||!category.length) {
                return resolve([0,"El Campo category es Obligatorio",400]); 
            }
            ProductsSchema.findOneAndUpdate({_id:id},{$set:{category:category}},async function (err, rs) {
                if (err||rs==null) return resolve([0,"No se ha encontrado el producto con id:"+id,400]);
                return resolve([1,"Se ha modificado correctamente el producto con id: "+id,200]);
            });
        });
    }
    list(){
        return new Promise(resolve => {
            ProductsSchema.find({}, function (err, rs) {
                if (err) return resolve([0,'Error',rs,400]);
                return resolve([1,'Ok',rs,200]);
            })
        });
    }
    listAudit(){
        return new Promise(resolve => {
            ProductsAuditSchema.find({}, function (err, rs) {
                if (err) return resolve([0,'Error',rs,400]);
                return resolve([1,'Ok',rs,200]);
            })
        });
    }
    listProductFilter(Filter){  
        return new Promise(resolve => {
            let condicion = {"$or":[]};
            if (Object.keys(Filter).length === 0) {
                return resolve([0,"El body es Obligatorio",400]); 
            }
            if(typeof Filter.name == "undefined" && typeof Filter.category == "undefined"){
                return resolve([0,"El campo name o category son Obligatorios",400]); 
            }
            if(typeof Filter.name != "undefined" && Filter.name == ""){
                return resolve([0,"El campo name es Obligatorio",400]); 
            }
            if(typeof Filter.category != "undefined" && Filter.category == ""){
                return resolve([0,"El campo category es Obligatorio",400]); 
            }
            if(Filter.name != ""){
                condicion["$or"].push({
                    title:{$regex:`${Filter.name}`}
                },
                {
                    description:{$regex:`${Filter.name}`}
                });
            }
            if(Filter.category != ""){
                condicion["$or"].push({
                    'category.description':{$regex:`${Filter.category}`}
                });
            }
            ProductsSchema.find(condicion, function (err, rs) {
                if (err) return resolve([0,'Error',rs,400]);
                return resolve([1,'Ok',rs,200]);
            })
        });
    }
    delete(id,deleteBy){
        return new Promise(resolve => {
            ProductsSchema.findOneAndDelete(id,function (err, rs) {
                if (err||rs==null) return resolve([0,"No se ha encontrado el producto con id:"+id,400]);
                let productoAuditRs = new ProductsAuditSchema({
                    title: rs.title,
                    description: rs.description,
                    price: rs.price,
                    category: rs.category,
                    createBy: rs.createBy,
                    updateBy: rs.updateBy,
                    deleteBy: deleteBy,
                    state: rs.state,
                });
                productoAuditRs.save((err, rs) => {
                    if (err) {
                        return resolve([0,'Error',400]);
                    }
                    return resolve([1,"Se ha eliminado correctamente el producto con id: "+id,200]);
                });
            })
        });
    }
}
