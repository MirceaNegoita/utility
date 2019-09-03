import mongoose from 'mongoose';

const setSchema = mongoose.Schema({
    type: String,
    firstFile: {
        name: String,
        content: String
    },
    secondFile: {
        name: String,
        content: String,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Set = mongoose.model("Set", setSchema);

export default Set;