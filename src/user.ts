export default class User {
  public id: number;
  public username: string;

  constructor(id: number, username: string) {
    this.id = id;
    this.username = username;
  }

  public static parse(obj: any): User {
    if (
      obj &&
      (typeof obj.id === 'number' || typeof obj.id === 'undefined') &&
      typeof obj.username === 'string'
    ) {
      return new User(obj.id, obj.username);
    } else {
      throw Error('Cannot parse object to User');
    }
  }
}
