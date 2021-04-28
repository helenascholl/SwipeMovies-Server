export default class UserGroupRepository {
  private static instance: UserGroupRepository;

  private constructor() {}

  public static getInstance(): UserGroupRepository {
    if (!this.instance) {
      this.instance = new UserGroupRepository();
    }

    return this.instance;
  }
}
