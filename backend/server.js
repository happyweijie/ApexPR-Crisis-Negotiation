require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const OpenAI = require('openai');

const app = express();
app.use(cors());
app.use(express.json());

// Load the hidden system prompt at startup — never sent to client
const SYSTEM_PROMPT = fs.readFileSync(
  path.join(__dirname, 'prompts', 'system_prompt.txt'),
  'utf-8'
);

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// GET /api/health — for Railway health checks
app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

// POST /api/chat
// Body: { messages: [{ role, content }] }
// Returns: { reply: string, concluded: boolean }
app.post('/api/chat', async (req, res) => {
  try {
    const { messages } = req.body;
    if (!Array.isArray(messages)) {
      return res.status(400).json({ error: 'messages must be an array' });
    }

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        ...messages,
      ],
      temperature: 0.85,
      max_tokens: 1200,
    });

    const reply = completion.choices[0].message.content;
    const concluded = reply.includes('---NEGOTIATION_CONCLUDED---');

    res.json({ reply, concluded });
  } catch (err) {
    console.error('OpenAI error:', err);
    res.status(500).json({ error: 'Failed to get AI response', details: err.message });
  }
});

// Serve built React frontend in production
if (process.env.NODE_ENV === 'production') {
  const frontendPath = path.join(__dirname, '..', 'frontend', 'dist');
  app.use(express.static(frontendPath));
  app.get('*', (req, res) => {
    res.sendFile(path.join(frontendPath, 'index.html'));
  });
}

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Aria Lim server running on port ${PORT}`);
  console.log(`System prompt loaded: ${SYSTEM_PROMPT.length} chars`);
});
