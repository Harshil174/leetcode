import { useNavigate, useParams } from "react-router-dom";

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
import TestCases from "./components/TestCases";

const ProblemPage = () => {
  const { problemId } = useParams();
  const navigate = useNavigate();

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

  if (!problemId) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p>Problem ID is missing.</p>
        <Button onClick={() => navigate(-1)} className="mt-2">
          Go Back
        </Button>
      </div>
    );
  }
  if (isError) {
    const errorMessage =
      (error as Error).message || "Failed to fetch the problem";
    return (
      <div className="flex flex-col items-center justify-center h-screen text-destructive">
        <p>{errorMessage}</p>
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

  const problem: Problem = data.problem;

  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="w-full h-full mx-auto overflow-hidden relative"
    >
      <ResizablePanel
        defaultSize={50}
        className="w-full h-full overflow-hidden relative"
      >
        <Question
          title={problem.title}
          status={problem.status}
          difficulty={problem.difficulty}
          description={problem.description}
          testCases={problem.testCases}
        />
      </ResizablePanel>

      <ResizableHandle withHandle className="w-2 h-full" />

      <ResizablePanel
        defaultSize={50}
        className=" w-full h-full overflow-hidden relative"
      >
        <ResizablePanelGroup
          direction="vertical"
          className="w-full h-full m-auto overflow-hidden relative"
        >
          <ResizablePanel defaultSize={70} className="w-full h-full relative">
            <CodeEditor boilerPlateCode={problem.boilerPlateCode} />
          </ResizablePanel>

          <ResizableHandle withHandle className="w-full h-2" />

          <ResizablePanel defaultSize={30} className="w-full h-full relative">
            <TestCases testCases={problem.testCases} />
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default ProblemPage;
