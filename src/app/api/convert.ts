// src/pages/api/convert.ts
import { NextApiRequest, NextApiResponse } from 'next';
import multer from 'multer';
import { createWorker } from 'tesseract.js';

const upload = multer({ storage: multer.memoryStorage() });

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await upload.single('image')(req, res, async (err: any) => {
      if (err instanceof multer.MulterError) {
        return res.status(400).json({ error: 'Erro ao fazer upload da imagem.' });
      } else if (err) {
        return res.status(500).json({ error: 'Erro na conversão de imagem em texto.' });
      }

      if (!req.file) {
        return res.status(400).json({ error: 'Nenhuma imagem selecionada.' });
      }

      const worker = createWorker();
      await worker.load();
      await worker.loadLanguage('eng');
      await worker.initialize('eng');

      const { data: { text } } = await worker.recognize(req.file.buffer);
      await worker.terminate();

      res.json({ text });
    });
  } catch (error) {
    console.error('Erro na conversão de imagem em texto:', error);
    res.status(500).json({ error: 'Erro na conversão de imagem em texto.' });
  }
};

export default handler;
