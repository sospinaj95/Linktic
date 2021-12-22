import mongoose  from 'mongoose';
let Schema = mongoose.Schema;

const ProductsAuditSchema = Schema({
    title: {
        type: String, 
        max: 100
    },
    description: {
        type: String, 
        max: 100
    },
    price: {type: Number, required: [true, 'Campo price es Requerido (*)']},
    category: [{
        description: {type: String, max: 100},
    }],
    createBy: {type: String, max: 100},
    updateBy: {type: String, max: 100},
    deleteBy: {type: String, max: 100},
    state: {type: Number, default: 1},
},{ timestamps: true });

export default mongoose.model('productsAudit', ProductsAuditSchema);