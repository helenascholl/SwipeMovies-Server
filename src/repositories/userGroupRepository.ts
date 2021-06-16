import User from '../user';
import Group from '../group';
import fs from 'fs';

export default class UserGroupRepository {
  private static instance: UserGroupRepository;
  private readonly userGroups: { user: User, group: Group }[];

  private constructor() {
    this.userGroups = this.parseJsonFile();
  }

  public static getInstance(): UserGroupRepository {
    if (!this.instance) {
      this.instance = new UserGroupRepository();
    }

    return this.instance;
  }

  public add(user: User, group: Group): void {
    let isAlreadyInGroup = false;

    for (const userGroup of this.userGroups) {
      if (userGroup.user.id === user.id && userGroup.group.id === group.id) {
        isAlreadyInGroup = true;
      }
    }

    if (!isAlreadyInGroup) {
      this.writeToFile();

      this.userGroups.push({
        user: user,
        group: group
      });
    }
  }

  public findGroupsByUserId(userId: number): Group[] {
    const groups: Group[] = [];

    for (const userGroup of this.userGroups) {
      if (userGroup.user.id === userId) {
        groups.push(userGroup.group);
      }
    }

    return groups;
  }

  public findUsersByGroupId(groupId: number): User[] {
    const users: User[] = [];

    for (const userGroup of this.userGroups) {
      if (userGroup.group.id === groupId) {
        users.push(userGroup.user);
      }
    }

    return users;
  }

  private parseJsonFile(): { user: User, group: Group }[] {
    const data = fs.readFileSync('src/data/userGroups.json', { encoding: 'utf-8' });
    return JSON.parse(data) as { user: User, group: Group }[];
  }

  private writeToFile(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      fs.writeFile('src/data/userGroups.json', JSON.stringify(this.userGroups, null, 2), err => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }
}
