import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

import { ProblemTest } from "@/types";
import { CheckCircle } from "lucide-react";

type QuestionProps = {
  title: string;
  status: "pending" | "solved";
  difficulty: "easy" | "medium" | "hard";
  description: string[];
  testCases: ProblemTest[];
};

const Question = ({
  title,
  status,
  difficulty,
  description,
  testCases,
}: QuestionProps) => {
  return (
    <ScrollArea className="w-full h-full p-2">
      <div className="w-full min-h-[calc(100vh-16px)] border border-primary/40 rounded-lg bg-primary/10 relative">
        <div className="p-5">
          <div className="flex items-center gap-3 justify-between">
            <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">
              {title}
            </h2>
            {status === "solved" && <CheckCircle className="text-green-600" />}
          </div>
          {/* tags */}
          <Tag tag={difficulty} className="my-2" />

          {/* description */}
          {description.map((desc, idx) => (
            <p key={idx} className="leading-6 my-4">
              {desc}
            </p>
          ))}

          <div className="py-8">
            {testCases.map((testCase, idx) => (
              <TestCase key={idx} testCase={testCase} idx={idx} />
            ))}
          </div>
        </div>
      </div>
    </ScrollArea>
  );
};

export default Question;

type TagProps = {
  tag: string;
  className?: string;
};

const Tag = ({ tag, className, ...props }: TagProps) => {
  return (
    <p
      className={cn(
        "bg-primary/20 px-3 py-1 rounded-[500px] text-xs tracking-wide w-fit",
        className
      )}
      {...props}
    >
      {tag.slice(0, 1).toUpperCase() + tag.slice(1)}
    </p>
  );
};

type TestCaseProps = {
  testCase: ProblemTest;
  idx: number;
};

const TestCase = ({ testCase, idx }: TestCaseProps) => {
  if (!testCase.visible) {
    return;
  }

  return (
    <div className="py-5">
      <h4 className="font-semibold">Example {idx + 1}:</h4>
      {/* input */}
      <div className="mt-3 px-5 py-2 border-l-2 border-primary/50 bg-primary/5 w-fit">
        <div className="flex items-center gap-2">
          <h4 className="font-semibold">Input:</h4>
          <h4 className="text-primary/60 font-semibold text-sm">
            {Object.entries(testCase.input).map(([key, value], index) => (
              <span key={index}>
                {key} = {Array.isArray(value) ? `[${value.join(", ")}]` : value}
                {index < Object.entries(testCase.input).length - 1 && ", "}
              </span>
            ))}
          </h4>
        </div>
        {/* output */}
        <div className="flex items-center gap-2">
          <h4 className="font-semibold">Output:</h4>
          <h4 className="text-primary/60 font-semibold text-sm">
            {testCase.output}
          </h4>
        </div>
        {/* explantion */}
        {testCase.explanation && (
          <div className="flex items-center gap-2">
            <h4 className="font-semibold">Explanation:</h4>
            <h4 className="text-primary/60 font-semibold text-sm">
              {testCase.explanation}
            </h4>
          </div>
        )}
      </div>
    </div>
  );
};
