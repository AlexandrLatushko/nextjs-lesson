import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Проверяем секретный ключ для безопасности
  if (req.query.secret !== process.env.NEXT_PUBLIC_SECRET_TOKEN) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  // Получаем путь страницы, которую нужно ревалидировать
  const path = '/test';

  try {
    // Вызываем ревалидацию для указанного пути
    await res.revalidate(path);
    return res.json({ revalidated: true });
  } catch (err) {
    // Если произошла ошибка, возвращаем сообщение об ошибке
    return res.status(500).json({ message: 'Error revalidating' });
  }
} 