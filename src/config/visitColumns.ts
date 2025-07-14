import { h } from "vue";
import { UserIcon, PhoneIcon, CalendarIcon, BadgeIcon, FlagIcon } from "lucide-vue-next";
import type { ColumnDef } from "@tanstack/vue-table";
import type { IVisit } from "@/interfaces/IVisit";

export const visitorColumns: ColumnDef<IVisit>[] = [
  {
    accessorKey: "visitor_name",
    header: () =>
      h("div", { class: "flex items-center gap-2" }, [
        h(UserIcon),
        h("div", "Visitante"),
      ]),
    cell: ({ row }) => h("div", row.getValue("visitor_name")),
  },
  {
    accessorKey: "visitor_phone",
    header: () =>
      h("div", { class: "flex items-center gap-2" }, [
        h(PhoneIcon),
        h("div", "Telefone"),
      ]),
    cell: ({ row }) => h("div", row.getValue("visitor_phone")),
  },
  {
    accessorKey: "visit_date",
    header: () =>
      h("div", { class: "flex items-center gap-2" }, [
        h(CalendarIcon),
        h("div", "Data"),
      ]),
    cell: ({ row }) => h("div", row.getValue("visit_date")),
  },
  {
    accessorKey: "license_plate",
    header: () =>
      h("div", { class: "flex items-center gap-2" }, [
        h(BadgeIcon),
        h("div", "Placa"),
      ]),
    cell: ({ row }) => h("div", row.getValue("license_plate")),
  },
  {
    accessorKey: "status",
    header: () =>
      h("div", { class: "flex items-center gap-2" }, [
        h(FlagIcon, { class: "scale-90" }),
        h("div", h("strong", "Status")),
      ]),
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      const statusColor =
        status === "concluída"
          ? "text-green-500"
          : status === "agendada"
          ? "text-yellow-500"
          : "text-blue-500";
      return h("div", { class: `font-semibold ${statusColor}` }, status);
    },
  },
];