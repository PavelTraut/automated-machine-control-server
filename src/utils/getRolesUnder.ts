import Role from '../types/Role';
import getUserLevelByRole from './getUserLevelByRole';

function getRolesUnder(role: Role): Role[] {
  const types: Role[] = ['sudo', 'admin', 'worker'];
  const result: Role[] = [];

  const level = getUserLevelByRole(role);

  for (const type of types) {
    if (level > getUserLevelByRole(type)) {
      result.push(type);
    }
  }

  if (role === 'worker') {
    result.push('worker');
  }

  return result;
}

export default getRolesUnder;
