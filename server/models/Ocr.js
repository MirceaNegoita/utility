import mongoose from 'mongoose';

const ocrSchema = mongoose.Schema({
    inputFile : {
        type: String,
    },
    outputFile: String,
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Ocr = mongoose.model("Ocr", ocrSchema);

export default Ocr;