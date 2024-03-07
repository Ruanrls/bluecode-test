import express from "express"
import router from "./routes"


const app = express()

app.use(express.json({ limit: "10kb" }))
app.use(router)

app.use(function (err: any, req: any, res: any, next: any){
  console.log("Something went wrong")
  next()
})

app.listen(3000, () => {
  console.log("its running at 3000")
})