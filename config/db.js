import mongose from 'mongoose'
import color from 'colors'

const connectDB = async()=> {
    try {
        const conn = await mongose.connect(process.env.MONGO_URI, {useNewUrlParser: true})
        console.log(`Connected to Mongodb database ${conn.connection.host}`.bgMagenta.white);
    } catch (error) {
        console.log(`Error in Mongodb ${error}`.bgRed.white);
    }
}

export default connectDB;