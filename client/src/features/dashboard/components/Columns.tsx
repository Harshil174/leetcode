import { ColumnDef } from "@tanstack/react-table";

import { Problem } from "@/types";
import { ArrowUpDown, CheckCircleIcon, XCircleIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export const columns: ColumnDef<Problem>[] = [
  {
    accessorKey: "title",
    header: () => <div className="w-36">Title</div>,
    cell: ({ row }) => {
      const title = row.original.title;
      return (
        <div className="w-36 whitespace-nowrap text-ellipsis overflow-hidden">
          {row.index + 1}. {title}
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <div className="w-20">
        <Button
          variant={"ghost"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      </div>
    ),
    cell: ({ row }) => {
      const status = row.original.status;
      return <div className="w-20">{status}</div>;
    },
  },
  {
    accessorKey: "difficulty",
    header: "Difficulty",
    cell: ({ row }) => {
      const difficulty = row.original.difficulty;

      const getDiffColor = (difficulty: string): string => {
        switch (difficulty) {
          case "easy":
            return "#22c55e";
          case "medium":
            return "#eab308";
          case "hard":
            return "#b91c1c";
          default:
            return "#000";
        }
      };

      return (
        <div
          className="font-semibold"
          style={{ color: getDiffColor(difficulty) }}
        >
          {difficulty.slice(0, 1).toUpperCase() + difficulty.slice(1)}
        </div>
      );
    },
  },
  {
    accessorKey: "submissions",
    header: () => <div className="text-center w-24">Submitted</div>,
    cell: ({ row }) => {
      const submissions = row.original.submissions;
      const isSubmitted = submissions.length > 0;

      return (
        <div className="text-center flex justify-center w-24">
          {isSubmitted ? (
            <CheckCircleIcon className="w-5 h-5 text-green-500" />
          ) : (
            <XCircleIcon className="w-5 h-5 text-red-500" />
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: () => <div className="text-right">Date</div>,
    cell: ({ row }) => {
      const createdAt = Date.parse(row.original.createdAt);
      const date = new Date(createdAt);

      if (isNaN(date.getTime())) {
        return <div className="text-right whitespace-nowrap">Invalid Date</div>;
      }

      const today = new Date();
      const formattedDate = date.toUTCString();

      const datePart = formattedDate.substring(5, 16);
      const timePart = formattedDate.substring(17, 25);

      const dateYear = date.getUTCFullYear();
      const dateMonth = date.getUTCMonth();
      const dateDay = date.getUTCDate();

      const todayYear = today.getUTCFullYear();
      const todayMonth = today.getUTCMonth();
      const todayDay = today.getUTCDate();

      const isToday =
        dateYear === todayYear &&
        dateMonth === todayMonth &&
        dateDay === todayDay;

      return (
        <div className="text-right whitespace-nowrap">
          {isToday ? timePart : datePart}
        </div>
      );
    },
  },
];
