const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name: { type: String, required: true, default: "Rau" },
    info: { type: String, default: "Hàm lượng dinh dưỡng cao, chứa nhiều vitamin, chất khoáng đặc biệt là sắt. Do được thu hoạch sớm nên tránh tình trạng sử dụng thuốc kích thích tăng trưởng, thuốc trừ sâu, đảm bảo an toàn cho người dùng." },
    price: { type: Number, default: "20000" },
    quantity: { type: Number, default: "30" },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "category" },
    imageType: { type: String },
    imageData: { type: Buffer }
}, { timestamps: true });


module.exports = mongoose.model('product', productSchema)