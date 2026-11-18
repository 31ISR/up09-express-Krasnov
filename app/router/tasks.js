const express = require('express')

const router = express.Router()

let tasks = [
    {
        id: 1, title: "Purr", done: true,
    },
    {
        id: 2, title: "^w^", done: true,
    },
]

router.get("/", (req, res)  => {
    res.json(tasks)
})

router.post("/", (req, res) => {
    const {title} = req.body

    const task = {
        id: Date.now(),
        title: title.trim(),
        done: false,
    }

    tasks.push(task)

    res.status(201).json(task)
})

router.delete("/:id", (req, res) => {
    const task = tasks.find(el => el.id==req.params.id)
    
    if (!task)
        return res
            .status(404)
            .json({ message: `Задача с id: ${req.params.id} не была найдена`})
    
            tasks = tasks.filter(el => el.id != req.params.id)

    res.status(204).end()
})

router.get("/:id", (req, res) => {
    const task = tasks.find(el => el.id==req.params.id)

    if (!task)
        return res
            .status(404)
            .json({ message: `Задача с id: ${req.params.id} не была найдена`})
    res.json(task)
})

router.patch("/:id", (req, res) => {
    const task = tasks.findIndex(el => el.id == req.params.id)

    if (!task)
        return res
            .status(404)
            .json({ message: `Задача с id: ${req.params.id} не была найдена`})

    tasks[task] = {...tasks[task], ...req.body}

    res.json(task)
})

module.exports = router