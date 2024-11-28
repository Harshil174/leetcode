import { useQuery } from "@tanstack/react-query";

import { Problem } from "@/types";

import { getAllProblems } from "@/services/api/problem.service";

import LoadingSpinner from "@/components/LoadingSpinner";

import { Button } from "@/components/ui/button";

import DataTable from "./components/DataTable";
import { columns } from "./components/Columns";

import { Loader2 } from "lucide-react";
import { toast } from "sonner";

const DashboardPage = () => {
  const { data, isLoading, isFetching, isRefetching, isError, error, refetch } =
    useQuery<Problem[]>({
      queryKey: ["problems"],
      queryFn: async () => {
        try {
          const { problems } = await getAllProblems();
          return problems;
        } catch (err: any) {
          toast.error(err.message || "Failed to fetch problems");
          throw err;
        }
      },
    });

  if (isLoading || isFetching) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-destructive">
        <p>{(error as Error).message || "Failed to fetch problems"}</p>
        <Button
          onClick={() => refetch()}
          size={"sm"}
          disabled={isRefetching}
          className="mt-2"
        >
          {isRefetching && <Loader2 className="size-4 animate-spin" />}
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <div className="container">
        <DataTable columns={columns} data={data || []} />
      </div>
    </div>
  );
};

export default DashboardPage;
