import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import { spawn } from 'child_process';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors());
app.use(express.json());

// Game tracking
const runningGames = new Map();

// Store contact data in memory (optional, can add file storage later)
const contactDataArray = [];

app.post('/submit-contact', (req, res) => {
  const { name, email, contact, message } = req.body;

  // Validate the form data
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required.' });
  }

  // Insert the form data into memory
  const contactData = { id: contactDataArray.length + 1, name, email, contact, message, timestamp: new Date() };
  contactDataArray.push(contactData);

  console.log(`[CONTACT] New contact message from ${name} (${email})`);
  res.status(200).json({ message: 'Contact data saved successfully!', id: contactData.id });
});

// Game Management Endpoints
app.post('/api/games/launch', (req, res) => {
  const { game } = req.body;

  console.log(`\n========== LAUNCHING GAME ==========`);
  console.log(`Game requested: ${game}`);

  if (!game || !['financefrenzy', 'finquest'].includes(game.toLowerCase())) {
    console.error(`Invalid game: ${game}`);
    return res.status(400).json({ error: 'Invalid game specified' });
  }

  try {
    const gameConfig = {
      financefrenzy: {
        folder: 'FinanceFrenzy-master',
        mainFile: 'app.py',
        type: 'python',
        description: 'FinanceFrenzy'
      },
      finquest: {
        folder: 'FinQUEST-main',
        mainFile: 'index.html',
        type: 'web',
        description: 'FinQUEST'
      }
    };

    const gameLower = game.toLowerCase();
    const config = gameConfig[gameLower];

    console.log(`Config: ${JSON.stringify(config)}`);

    // Check if already running
    if (runningGames.has(gameLower)) {
      const proc = runningGames.get(gameLower);
      if (proc && !proc.killed) {
        console.log(`${config.description} already running`);
        return res.status(200).json({ 
          message: `${config.description} is already running!`,
          status: 'running'
        });
      }
      runningGames.delete(gameLower);
    }

    const gameDir = path.resolve(path.join(__dirname, '..', 'games', config.folder));
    const filePath = path.resolve(path.join(gameDir, config.mainFile));

    console.log(`Game dir: ${gameDir}`);
    console.log(`File path: ${filePath}`);
    console.log(`Dir exists: ${fs.existsSync(gameDir)}`);
    console.log(`File exists: ${fs.existsSync(filePath)}`);

    // Verify folder exists
    if (!fs.existsSync(gameDir)) {
      console.error(`Game directory not found: ${gameDir}`);
      return res.status(404).json({ 
        error: `Game folder not found: ${config.folder}`,
        path: gameDir
      });
    }

    // Verify file exists
    if (!fs.existsSync(filePath)) {
      console.error(`Main file not found: ${filePath}`);
      console.error(`Directory contents: ${fs.readdirSync(gameDir).join(', ')}`);
      return res.status(404).json({ 
        error: `Game file not found: ${config.mainFile}`,
        path: filePath
      });
    }

    // Launch based on type
    if (config.type === 'python') {
      console.log(`Launching Python game...`);
      const proc = spawn('python', [filePath], {
        cwd: gameDir,
        detached: true,
        stdio: 'ignore'
      });

      proc.on('error', (err) => console.error(`Process error: ${err.message}`));
      proc.unref();
      runningGames.set(gameLower, proc);

      console.log(`✅ Python game launched! PID: ${proc.pid}`);
      return res.status(200).json({
        message: `${config.description} launched!`,
        status: 'success',
        type: 'python',
        pid: proc.pid
      });

    } else if (config.type === 'web') {
      console.log(`Launching web game...`);
      
      let cmd;
      if (process.platform === 'win32') {
        cmd = `cmd.exe /c start "" "${filePath}"`;
      } else if (process.platform === 'darwin') {
        cmd = `open "${filePath}"`;
      } else {
        cmd = `xdg-open "${filePath}"`;
      }

      console.log(`Command: ${cmd}`);

      const proc = spawn('cmd.exe', ['/c', 'start', '', filePath], {
        detached: true,
        stdio: 'ignore',
        shell: process.platform !== 'win32'
      });

      proc.on('error', (err) => console.error(`Process error: ${err.message}`));
      proc.unref();
      runningGames.set(gameLower, proc);

      console.log(`✅ Web game launched! PID: ${proc.pid}`);
      return res.status(200).json({
        message: `${config.description} launched!`,
        status: 'success',
        type: 'web',
        pid: proc.pid
      });
    }

  } catch (err) {
    console.error(`ERROR: ${err.message}`);
    console.error(err.stack);
    return res.status(500).json({ 
      error: 'Failed to launch game',
      message: err.message
    });
  }
});


// Game status check
app.get('/api/games/status/:game', (req, res) => {
  const { game } = req.params;
  const gameLower = game.toLowerCase();

  if (!['financefrenzy', 'finquest'].includes(gameLower)) {
    return res.status(400).json({ error: 'Invalid game' });
  }

  const isRunning = runningGames.has(gameLower) && !runningGames.get(gameLower).killed;
  res.status(200).json({
    game: gameLower,
    running: isRunning
  });
});

// Health check
app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    status: 'ok',
    timestamp: new Date().toISOString()
  });
});

app.get('/', (req, res) => {
  res.send('✅ Server running on port 5000');
});

app.use(express.static(path.join(__dirname, 'public')));

app.listen(5000, () => {
  console.log('\n🚀 Server running on http://localhost:5000');
  console.log('💾 Games: FinanceFrenzy & FinQUEST ready to launch\n');
});
