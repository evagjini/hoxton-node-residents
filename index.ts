import express from "express"
import cors from "cors"
import { housesData, resdientsData } from "./data"


let houses = housesData
let residents = resdientsData
const app = express()
app.use(cors())
app.use(express.json())

const port = 5666