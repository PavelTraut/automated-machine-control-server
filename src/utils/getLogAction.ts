import { isUUID } from 'class-validator';

const actionsMap = {
  'auth/me': {
    post: 'Повторная авторизация',
  },
  'auth/login': {
    post: 'Первичная авторизация',
  },
  'consumable-types': {
    get: 'Получение типов материалов',
    post: 'Добавление типа материалов',
    put: 'Обновление типа материала',
    delete: 'Удаление типа материала',
  },
  'defect-types': {
    get: 'Получение типов неисправностей',
    post: 'Добавление типа неисправности',
    put: 'Обновление типа неисправности',
    delete: 'Удаление типа неисправности',
  },
  defects: {
    get: 'Получение неисправностей',
    post: 'Добавление неисправности',
    put: 'Обновление неисправности',
    delete: 'Удаление неисправности',
  },
  departaments: {
    get: 'Получение цехов',
    post: 'Добавление цеха',
    put: 'Обновление цеха',
    delete: 'Удаление цеха',
  },
  machines: {
    get: 'Получение станков',
    post: 'Добавление станка',
    put: 'Обновление станка',
    delete: 'Удаление станка',
  },
  users: {
    get: 'Получение ответственных',
    post: 'Добавление ответственного',
    put: 'Обновление ответственного',
    delete: 'Удаление ответственного',
  },
  consumables: {
    get: 'Получение материалов',
    post: 'Добавление материала',
    put: 'Обновление материала',
    delete: 'Удаление материала',
  },
  specializations: {
    get: 'Получение специальностей',
    post: 'Добавление специальностей',
    put: 'Обновление специальности',
    delete: 'Удаление специальности',
  },
};

export default function getLogAction(url: string, method: string) {
  method = method.toLowerCase();
  console.log(method);
  let id = null;
  const splitted = url.split('/');
  console.log(splitted);
  if (url.startsWith('/')) {
    url = url.slice(1);
  }
  if (url[url.length - 1] === '/') {
    url = url.slice(0, -1);
  }
  console.log(url);

  if (isUUID(splitted[splitted.length - 1])) {
    url = url.replace('/' + splitted[splitted.length - 1], '');
    id = splitted[splitted.length - 1];
  }

  console.log(url);

  const action =
    actionsMap[url.split('/').find((path) => actionsMap[path]?.[method])]?.[
      method
    ] || actionsMap[url]?.[method];
  console.log(action, actionsMap[url]);
  if (id) {
    return action + ' ' + id;
  }

  return action;
}
