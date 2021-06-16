import Group from '../group';
import RepositoryBase from './repositoryBase';

export default class GroupRepository extends RepositoryBase<Group> {
  private static instance: GroupRepository;
  private groups: Map<number, Group>;
  private currentId: number;

  private constructor() {
    super();
    this.groups = this.parseJsonFile('src/data/groups.json');
    this.currentId = this.groups.size;
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

    this.writeToFile(Array.from(this.groups.values()), 'src/data/groups.json');

    return group;
  }

  public get(id: number): Group | null {
    return this.groups.get(id) ?? null;
  }
}
