import { Pool } from 'pg';

// Создаем экземпляр пула подключения
const pool = new Pool({ 
  connectionString: process.env.DATABASE_URL,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000
});

// Экспортируем экземпляр пула по умолчанию
export default pool;