import User from '../user';

class UserRepository {
  private static instance: UserRepository;
  private users: User[];

  private constructor() {
    this.users = [];
  }

  public static getInstance(): UserRepository {
    if (!this.instance) {
      this.instance = new UserRepository();
    }

    return this.instance;
  }
}
