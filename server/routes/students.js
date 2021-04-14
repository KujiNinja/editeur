import express from 'express'
import { Student } from '../app.js'

const router = express.Router()

router.route('/')
  .get(async (req, res) => {
    const studentsList = await Student.find()

    res.status(200).json(studentsList)
  })
  .post(async (req, res) => {
    const { name, age } = req.body

    if (name && age) {
      const newStudent = await Student.create({ name, age, edit: false })

      res.status(201).json(newStudent)
    } else {
      res.status(400).json({ create: false })
    }
  })

router.route('/:id')
  .delete(async (req, res) => {
    const { id } = req.params

    await Student.findByIdAndDelete(id, (err, student) => {
      if (err) {
        console.log(err)
      } else if (!student) {
        res.status(404).json({ delete: false })
      } else {
        res.status(200).json(id)
      }
    })
  })
  .put(async (req, res) => {
    const { id } = req.params
    const { name, age } = req.body

    const student = await Student.findOne({_id: id})
    if (!student) {
      res.status(404).json({ update: false })
    } else {
      student.name = name
      student.age = age
      await student.save();
      res.status(200).json(student)
    }
  })

export default router
