import type { StatusKey } from "@/components/tasks/KanbanTab.vue";

export interface Status {
  key: StatusKey;
  title: string;
  icon: unknown;
  backgroundColor: string;
  textColor: string;
  borderColor: string;
}