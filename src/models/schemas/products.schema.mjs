import mongoose  from 'mongoose';
let Schema = mongoose.Schema;

const ProductsSchema = Schema({
    title: {
        type: String, 
        max: 100,
        unique: true, 
        required: [true, 'Campo title es Requerido (*)']
    },
    description: {
        type: String, 
        max: 100, 
        unique: true, 
        required: [true, 'Campo description es Requerido (*)']
    },
    price: {type: Number, required: [true, 'Campo price es Requerido (*)']},
    category : {
        type: [{
            description: {
                type: String, 
                max: 100, 
                required: [true, 'Campo description Categoria es Requerido (*)']
            },
        }], 
        validate: [v => Array.isArray(v) && v.length > 0,'Campo category es Requerido (*)']
    },
    createBy: {type: String, max: 100, required: [true, 'Campo createBy es Requerido (*)']},
    updateBy: {type: String, max: 100},
    state: {type: Number, default: 1}
},{timestamps: true });

export default mongoose.model('products', ProductsSchema);