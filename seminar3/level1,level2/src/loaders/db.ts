import mongoose from "mongoose";
import config from "../config"; 

const connectDB = async () => {
  try {
    // .env에 적어둔 connect URI로 연결시켜준다.
    // config에 mongoURI로 설정되어있다.
    await mongoose.connect(config.mongoURI);

    // mongoose option 를 선택 
    // autoCreate: 서버실행시 collection이 자동으로 생성되게 한다.
    mongoose.set('autoCreate', true);

    console.log("Mongoose Connected ...");
  } catch (err: any) {
    console.error(err.message);
    process.exit(1);
  }
};

export default connectDB;
