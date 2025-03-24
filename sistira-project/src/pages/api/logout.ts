import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Set-Cookie', `authToken=; Path=/; Max-Age=0; HttpOnly; Secure; SameSite=Lax`);
  return res.status(200).json({ message: 'Logout realizado com sucesso' });
}
