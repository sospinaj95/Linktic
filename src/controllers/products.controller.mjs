import {Products} from '../models/products.mjs';

/**
* @method
* @desc As a user I would like to register a product so that I can have access to the data of this product in the future (Title, description, price, category)
* @param {string} title Obligatorio
* @param {string} description Obligatorio
* @param {string} price Obligatorio
* @param {string} createBy Obligatorio
* @param {Array} category Obligatorio
* @throws {LocationNotValidError} El campo {campo} es Obligatorio
* @throws {Error} Error general
* @returns {Object} {status,code,message,data}
*/
export async function createProduct(req, res) {
    const {body} = req;
    let dat = new Products();
    let rsCreate = await dat.create(body);
    return res.status(rsCreate[3]).send({
        code: rsCreate[0],
        message: rsCreate[1],
        data: rsCreate[2]
    });
}
/**
* @method
* @desc I as a user would like to be able to update the product data;
* @param {string} title opcional
* @param {string} description opcional
* @param {string} price opcional
* @param {string} updateBy Obligatorio
* @throws {LocationNotValidError} El campo {campo} es Obligatorio
* @throws {Error} Error general
* @returns {Object} {status,code,message}
*/
export async function updateProduct(req, res) {
    const {id} = req.params;
    const {body} = req;
    let dat = new Products();
    let rsUpdate = await dat.update(id,body);
    return res.status(rsUpdate[2]).send({
        code: rsUpdate[0],
        message: rsUpdate[1]
    });
}
/**
* @method
* @desc I as a user would like to be able to associate and edit a product category;
* @param {string} id Obligatorio
* @param {Array} category Obligatorio
* @throws {LocationNotValidError} El campo {campo} es Obligatorio
* @throws {Error} Error general
* @returns {Object} {status,code,message}
*/
export async function updateCategoryProduct(req, res) {
    const {id} = req.params;
    const {category} = req.body;
    let dat = new Products();
    let rsUpdate = await dat.updateCategory(id,category);
    return res.status(rsUpdate[2]).send({
        code: rsUpdate[0],
        message: rsUpdate[1]
    });
}
/**
* @method
* @desc As a user I would like to be able to access the list of all products;
* @throws {Error} Error general
* @returns {Object} {status,code,message,data}
*/
export async function listProduct(req, res) {
    let dat = new Products();
    let rsList = await dat.list();
    return res.status(rsList[3]).send({
        code: rsList[0],
        message: rsList[1],
        data: rsList[2]
    });
}
/**
* @method
* @desc audit control on an edited or deleting product;
* @throws {Error} Error general
* @returns {Object} {status,code,message,data}
*/
export async function listAudit(req, res) {
    let dat = new Products();
    let rsList = await dat.listAudit();
    return res.status(rsList[3]).send({
        code: rsList[0],
        message: rsList[1],
        data: rsList[2]
    });
}
/**
* @method
* @desc As a user I would like to be able to filter products by name or category;
* @param {string} name opcional
* @param {string} category opcional
* @throws {Error} Error general
* @returns {Object} {status,code,message,data}
*/
export async function listProductFilter(req, res) {
    const {body} = req;
    let dat = new Products();
    let rsList = await dat.listProductFilter(body);
    if (rsList[0]==0){    
        return res.status(rsList[2]).send({
            code: rsList[0],
            message: rsList[1]
        });
    }
    return res.status(rsList[3]).send({
        code: rsList[0],
        message: rsList[1],
        data: rsList[2]
    });
}
/**
* @method
* @desc I as a user would like to be able to delete a product from my catalog;
* @param {string} id Obligatorio
* @param {string} deleteBy Obligatorio
* @throws {Error} Error general
* @returns {Object} {status,code,message}
*/
export async function deleteProduct(req, res) {
    const {id} = req.params;
    const {deleteBy} = req.body;
    let dat = new Products();
    let rsDelete = await dat.delete(id,deleteBy);
    return res.status(rsDelete[2]).send({
        code: rsDelete[0],
        message: rsDelete[1]
    });
}