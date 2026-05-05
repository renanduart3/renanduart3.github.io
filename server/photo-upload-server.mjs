import express from 'express';
import multer from 'multer';
import sharp from 'sharp';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const outputDir = path.join(projectRoot, 'public', 'cv-imported');
const outputFile = path.join(outputDir, 'profile-photo.jpg');

const app = express();
const port = process.env.PHOTO_UPLOAD_PORT || 3001;
const isLocalDev = process.env.NODE_ENV !== 'production';

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true);
      return;
    }
    cb(new Error('Only JPEG and PNG files are allowed.'));
  }
});

app.get('/api/health', (_req, res) => {
  res.json({ ok: true });
});

app.post('/api/profile-photo', upload.single('photo'), async (req, res) => {
  if (!isLocalDev) {
    res.status(403).json({ error: 'Profile photo upload is only allowed in local development.' });
    return;
  }

  try {
    if (!req.file) {
      res.status(400).json({ error: 'No photo file uploaded.' });
      return;
    }

    await fs.mkdir(outputDir, { recursive: true });

    await sharp(req.file.buffer)
      .rotate()
      .resize(512, 512, {
        fit: 'cover',
        position: 'centre'
      })
      .jpeg({ quality: 90 })
      .toFile(outputFile);

    res.json({
      ok: true,
      filePath: 'public/cv-imported/profile-photo.jpg'
    });
  } catch (error) {
    console.error('Failed to process profile photo:', error);
    res.status(500).json({ error: 'Failed to process profile photo.' });
  }
});

app.listen(port, () => {
  console.log(`Photo upload server running at http://localhost:${port}`);
});
