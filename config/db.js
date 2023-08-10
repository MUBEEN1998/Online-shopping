// import mongoose  from "mongoose";

// const Connectdb =  async ()=>{
//     try{
//         const conn = await mongoose.connect(process.env.MONGO_URI);
//         console.log(`connect db ${conn}`);
//     } catch(error) {
//         console.log(`error$`);
//         console.log(process.env.MONGO_URI)
//     }
// };

// export default Connectdb;
import mongoose from "mongoose";

const Connectdb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`Connected to the database: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to the database: ${error}`);
    console.log(process.env.MONGO_URI);
  }
};

export default Connectdb;
