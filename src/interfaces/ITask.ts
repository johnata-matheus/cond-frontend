export interface ITask {
  id: number;
  title: string;
  description: string;
  status: string;
  order: number;
  created_at: string;
}

export interface ITaskUpdate extends Partial<ITask> {
  id: number;
}

