import {Router} from 'express';

import Set from '../models/Set';
import AuthMiddleware from '../middleware/auth';
import SetHelper from '../helpers/set-helper';

const router = Router();
const verifyToken = AuthMiddleware.prototype.verifyToken;

router.get("/", verifyToken ,async (req, res) => {
    try {
        const sets = await Set.find({ createdBy: req.user._id });
        return res.status(200).send(sets);
    } catch (error) {
        return res.status(400).send({ message: `Error retrieving sets ${error}` })
    }
});

router.get("/:id", verifyToken, async(req, res) => {
    try {
        const set = await Set.findById(req.params.id);
        return res.status(200).send({set});
    } catch (error) {
        return res.status(400).send({ message: `Error retrieving set with id ${req.params.id}` })
    }
});

router.post("/create", verifyToken, async(req, res) => {

    console.log("Req.body", req.body);

    let set = new Set({
        type: req.body.type,
        firstFile: {
            name: "",
            content: ""
        },
        secondFile: {
            name: "",
            content: ""
        },
        createdBy: req.user._id
    });

    let createdSet = await set.save();

    if (set.type === "files") {
        await SetHelper.prototype.setFileContent(createdSet._id, req.files.firstFile.name, req.files.firstFile.data, true);
        await SetHelper.prototype.setFileContent(createdSet._id, req.files.secondFile.name, req.files.secondFile.data, false);
    }

    if (set.type === "folders") {
        await SetHelper.prototype.setFolderContent(createdSet._id, req.body.firstFile, true);
        await SetHelper.prototype.setFolderContent(createdSet._id, req.body.secondFile, false);
    }

    return res.send({ id: createdSet._id });
});

router.delete("/:id", verifyToken, async(req, res) => {
    try {
        const deletedSet = await Set.findByIdAndRemove(req.params.id);
        
        return res.status(200).send({ message: `Deleted set with id ${req.params.id}` });
    } catch (error) {
        return res.status(400).send({message: `Error deleting set with id ${req.params.id}`});
    }
});

export default router;