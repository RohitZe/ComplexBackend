// import express from "express";
// import cookieParser from "cookie-parser";
// import cors from "cors"

// const app=express();
// app.use(cors({
//     origin:process.env.CROSS_ORIGIN,
//     Credential:true
// }))


// app.use(express.json({limit:"16kb"}))
// app.use(express.urlencoded({extended: true,limit:"16kb"}))
// app.use(express.static("public"))
// app.use(express.cookieParser())
// console.log("step-1");
// //routes import
// import userRouter from "./routes/user.route.js"

// //routes decleration
// //app.use('/api/v1/users',userRouter)

// app.get("/", (req, res, next) => {
//     return res.json({
//       code: 200,
//       message: "Server is Up"
//     })
//   })
// console.log("step-2");
import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()
app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))

app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true,limit:"16kb"}))
app.use(express.static("public"))
app.use(cookieParser())


app.get("/", (req, res, next) => {
    return res.json({
      code: 200,
      message: "Server is Up"
    })
  })

export {app}