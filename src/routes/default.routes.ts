import { Router } from 'express';

export const defaultRoute = Router();

defaultRoute.get('/health', (req, res) => {
  res.send(`Application up and running on port ${process.env.PORT}`);
});