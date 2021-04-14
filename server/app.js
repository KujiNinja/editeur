import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import path from 'path';
import studentsRouter from './routes/students.js'
import multer from 'multer';
import fs from 'fs'

import Blob from 'cross-blob'

import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express()

mongoose.connect('mongodb://localhost:27017/StudentsDB', { useNewUrlParser: true, useUnifiedTopology: true })

const Student = mongoose.model('Student', {
  name: { type: String, trim: true },
  age: Number,
  edit: Boolean,
})

const upload = multer({
  dest: 'public/uploads/',
});

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())
app.use('/students', studentsRouter)

app.post('/testupl', upload.any(), (req, res, next) => {
  const file = req.files;
  console.log(file);
  res.json(file[0].filename);
});

app.post('/read', (req, res, next) => {
  const { id } = req.body;
  const data = fs.readFileSync(`./public/uploads/${id}`);
  // var stats = fs.statSync('./public/uploads/caec5cb6d778dd15a45c8bf9b89c1006')
  // console.log(stats);

  res.contentType('application/pdf').send(data);
});

export { app, Student }
