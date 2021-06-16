import User from '../user';
import RepositoryBase from './repositoryBase';

export default class UserRepository extends RepositoryBase<User> {
  private static instance: UserRepository;
  private users: Map<number, User>;
  private currentId: number;

  private constructor() {
    super();
    this.users = this.parseJsonFile('src/data/users.json');
    this.currentId = this.users.size;
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

    this.writeToFile(Array.from(this.users.values()), 'src/data/users.json');

    return user;
  }

  public get(id: number): User | null {
    return this.users.get(id) ?? null;
  }
}
