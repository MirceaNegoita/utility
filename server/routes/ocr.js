import { Router } from 'express';

import Ocr from '../models/Ocr';
import AuthMiddleware from '../middleware/auth';

const router = Router();
const verifyToken = AuthMiddleware.prototype.verifyToken;

router.get("/", verifyToken, async (req, res) => {
    try {
        const ocrs = await Ocr.find({ createdBy: req.user._id });
        return res.status(200).send(ocrs);
    } catch (error) {
        return res.status(400).send({ message: `Error retrieving ocr ${error}` })
    }
});

router.get("/:id", verifyToken, async(req, res) => {
    try {
        const ocr = await Ocr.findById(req.params.id);
        return res.status(200).send(ocr);
    } catch (error) {
        return res.status(400).send({ message: `Error retrieving ocr with id ${req.params.id}` });
    }
});

router.post("/create", verifyToken, async(req, res) => {

});

router.delete("/:id", verifyToken, async(req, res) => {
    try {
        const deletedOcr = await Ocr.findByIdAndRemove(req.params.id);
        return res.status(200).send({ message: `Deleted ocr with id ${req.params.id}` });
    } catch (error) {
        return res.status(400).send({ message: `Error deleting ocr with id ${req.params.id}` });
    }
});

export default router;