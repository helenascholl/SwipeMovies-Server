import Group from '../group';

export default class GroupRepository {
  private static instance: GroupRepository;
  private groups: Map<number, Group>;
  private currentId: number;

  private constructor() {
    this.groups = new Map<number, Group>();
    this.currentId = 0;
  }

  public static getInstance(): GroupRepository {
    if (!this.instance) {
      this.instance = new GroupRepository();
    }

    return this.instance;
  }

  public getAll(): Group[] {
    return Array.from(this.groups.values());
  }

  public add(group: Group): Group {
    group.id = this.currentId;
    this.groups.set(this.currentId++, group);

    return group;
  }

  public get(id: number): Group | null {
    return this.groups.get(id) ?? null;
  }
}
