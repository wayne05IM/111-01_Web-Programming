import express from 'express'
import {getNumber, genNumber} from '../core/getNumber'
const router = express.Router()

router.post('/start', (_, res) => {
    genNumber() // 用亂數產生一個猜數字的 number，存在 memory DB 
    res.json({ msg: 'The game has started.' })
})

router.get('/guess', (req, res) => {
    // 去 (memory) DB 拿答案的數字
    let answer = getNumber()
    // 用 req.query.number 拿到前端輸入的數字
    let input = parseInt(req.query.number)
    // check if NOT a num or not in range [1,100]
    // 如果有問題 =>
    // res.status(406).send({ msg: 'Not a legal number.' })
    // 如果沒有問題，回傳 status
    if ((input >= 1) && (input <= 100))
    {
        if(input < answer)
            res.send({ msg: 'Bigger' })
        else if (input > answer)
            res.send({ msg: 'Smaller' })
        else
            res.send({ msg: 'Equal' })
    }
    else
        res.status(406).send({ msg: 'Not a legal number.' })
})

router.post('/restart', (_, res) => {
    genNumber() // 用亂數產生一個猜數字的 number，存在 memory DB
    res.json({ msg: 'The game has restarted.' })
})

export default router