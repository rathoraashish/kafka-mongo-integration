import { Router } from 'express';
import kafkaConfig from '../config/kafka.config';

const router = Router();

router.post('/create-post', async (req, res) => {
    try {
        const { title, content } = req.body;
        console.log("Title is", title);
        console.log("Content is", content)
        // Send any string message to the Kafka topic
        const message = JSON.stringify({ title, content });
        await kafkaConfig.sendMessage('post', message)
        res.json({ status: 'ok' });
    } catch (error) {
        console.error("Error occured", error)
        res.json({ status: 'fail' });
    }

});

export default router;