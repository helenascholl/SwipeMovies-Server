export default class Group {
  public id: number;
  public name: string;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }

  public static parse(obj: any): Group {
    if (
      obj &&
      (typeof obj.id === 'number' || typeof obj.id === 'undefined') &&
      typeof obj.name === 'string'
    ) {
      return new Group(obj.id, obj.name);
    } else {
      throw Error('Cannot parse object to Group');
    }
  }
}
