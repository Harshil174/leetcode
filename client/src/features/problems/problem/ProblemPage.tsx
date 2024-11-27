import { useParams } from "react-router-dom";

import { getProblemById } from "@/services/api/problem.service";

import { useQuery } from "@tanstack/react-query";

import { Problem } from "@/types";

import Question from "./components/Question";
import CodeEditor from "./components/CodeEditor";

import LoadingSpinner from "@/components/LoadingSpinner";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

import { Loader2 } from "lucide-react";

const ProblemPage = () => {
  const { problemId } = useParams();

  const { data, isLoading, isFetching, isRefetching, isError, error, refetch } =
    useQuery({
      queryKey: ["problem", problemId],
      queryFn: async () => {
        try {
          return await getProblemById(problemId || "");
        } catch (err: any) {
          toast.error(err.message || "Failed to fetch the problem");
          throw err;
        }
      },
      enabled: !!problemId,
    });

  if (isLoading || isFetching) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-destructive bg-red-300">
        <p>{(error as Error).message || "Failed to fetch the problem"}</p>
        <Button onClick={() => refetch()} size={"sm"} disabled={isRefetching}>
          {isRefetching && <Loader2 className="size-4 animate-spin" />}
          Retry
        </Button>
      </div>
    );
  }

  const problem: Problem = data.problem;

  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="w-full h-full mx-auto overflow-hidden relative"
    >
      <ResizablePanel defaultSize={50} className="w-full h-full">
        <Question
          title={problem.title}
          status={problem.status}
          difficulty={problem.difficulty}
          description={problem.description}
          testCases={problem.testCases}
        />
      </ResizablePanel>

      <ResizableHandle withHandle className="w-2 h-full" />

      <ResizablePanel defaultSize={50} className=" w-full h-full">
        <CodeEditor boilerPlateCode={problem.boilerPlateCode} />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default ProblemPage;
