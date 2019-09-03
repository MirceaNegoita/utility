import authRoutes from './auth';
import setRoutes from './set';
import ocrRoutes from './ocr';

class Routes{
    setRoutes(app){
        app.get('/', (req, res) => {
            res.status(200).send({
                message: "File diff server"
            });
        });
        app.use("/api/v1/auth", authRoutes);
        app.use("/api/v1/sets", setRoutes);
        app.use("/api/v1/ocr", ocrRoutes);
    }
}

export default Routes;