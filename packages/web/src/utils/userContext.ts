// userContext.ts
// Глобальный контекст для хранения и передачи userId и managerId

// Глобальные переменные для хранения идентификаторов
export let userId: string | null = null;
export let managerId: string | null = null;

// Функции для обновления значений
export const setUserId = (id: string | null) => {
  userId = id;
  console.log("userId обновлён:", id);
};

export const setManagerId = (id: string | null) => {
  managerId = id;
  console.log("managerId обновлён:", id);
};

// Функция для получения текущих значений (опционально)
export const getUserContext = () => ({
  userId,
  managerId
});

// Экспортируем как объект по умолчанию для удобства импорта
export default {
  userId,
  managerId,
  setUserId,
  setManagerId,
  getUserContext
};