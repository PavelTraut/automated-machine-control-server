import Role from '../types/Role';

function getUserLevelByRole(role: Role): number {
  switch (role) {
    case 'worker': {
      return 0;
    }
    case 'admin': {
      return 1;
    }
    case 'sudo': {
      return 2;
    }
    default: {
      return -1;
    }
  }
}

export default getUserLevelByRole;
