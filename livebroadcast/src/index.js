import express from 'express';
import redis from './redis.js';

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
})

app.post('/post/:postId/view', async (req, res) => {
    const postId = req.params.postId;
    await redis.publish('post_views', postId);
    res.send('Viewed');
})


app.post('/leaderboard/score', async (req, res) => {
    try {
        const { userId, score } = req.body;
        if (!userId || score === undefined) {
            return res.status(400).json({ error: 'userId and score are required in request body' });
        }
        await redis.zadd('global_leaderboard', score, userId);
        res.json({ message: 'Score updated successfully', userId, score });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/leaderboard', async (req, res) => {
    try {
        const leaderboard = await redis.zrevrange('global_leaderboard', 0, 9, 'WITHSCORES');
        const formattedLeaderboard = [];
        for (let i = 0; i < leaderboard.length; i += 2) {
            formattedLeaderboard.push({
                userId: leaderboard[i],
                score: parseFloat(leaderboard[i + 1])
            });
        }
        res.json(formattedLeaderboard);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/leaderboard/:userid/rank', async (req, res) => {
    try {
        const userId = req.params.userid;
        const rank = await redis.zrevrank('global_leaderboard', userId);
        const score = await redis.zscore('global_leaderboard', userId);
        
        if (rank === null) {
            return res.status(404).json({ error: 'User not found in leaderboard' });
        }
        
        res.json({
            userId,
            rank: rank + 1,
            score: parseFloat(score)
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});