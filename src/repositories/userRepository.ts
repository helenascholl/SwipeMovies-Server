import User from '../user';

export default class UserRepository {
  private static instance: UserRepository;
  private users: Map<number, User>;
  private currentId: number;

  private constructor() {
    this.users = new Map<number, User>();
    this.currentId = 0;
  }

  public static getInstance(): UserRepository {
    if (!this.instance) {
      this.instance = new UserRepository();
    }

    return this.instance;
  }

  public getAll(): User[] {
    return Array.from(this.users.values());
  }

  public add(user: User): User {
    user.id = this.currentId;
    this.users.set(this.currentId++, user);

    return user;
  }
}
