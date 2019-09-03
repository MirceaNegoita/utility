import mongoose from 'mongoose';
import 'dotenv';

class Database{
    get mongoConnectionString() {
        const host = process.env.MONGO_HOST;
        const port = process.env.MONGO_PORT;
        const database = process.env.MONGO_DB;

        return `mongodb://${host}:${port}/${database}`;
    }
    get mongoConnectionOptions() {
        return { useNewUrlParser: true };
    }

    connect(){
        return mongoose.connect(this.mongoConnectionString, this.mongoConnectionOptions)
            .then(() => {
                console.log("Connected to MongoDB")
            })
            .catch(error => {
                console.log("Could not connect to MongoDB", error);
            });
    }
}

export default Database;
