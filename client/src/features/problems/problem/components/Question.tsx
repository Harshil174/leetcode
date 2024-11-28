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
  const filteredTestCases = testCases.filter((testCase) => {
    return testCase.visible;
  });

  return (
    <div className="w-full h-full p-1 overflow-hidden">
      <div className="w-full h-full border border-primary/40 rounded-lg bg-primary/10 flex flex-col gap-2 p-2 overflow-hidden relative">
        <div className="p-5 rounded-lg w-full h-full overflow-y-scroll">
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
            {filteredTestCases.map((testCase, idx) => (
              <TestCase key={idx} testCase={testCase} idx={idx} />
            ))}
          </div>
        </div>
      </div>
    </div>
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
  return (
    <div className="py-5">
      <h4 className="font-semibold">Example {idx + 1}:</h4>
      {/* input */}
      <div className="mt-3 px-5 py-2 border-l-2 border-primary/50 bg-primary/5 w-fit">
        <div className="flex gap-2">
          <h4 className="font-semibold">Input:</h4>
          <h4 className="text-primary/60 font-medium">
            {Object.entries(testCase.input).map(([key, value], index) => (
              <span key={index}>
                {key} = {Array.isArray(value) ? `[${value.join(", ")}]` : value}
                {index < Object.entries(testCase.input).length - 1 && ", "}
              </span>
            ))}
          </h4>
        </div>
        {/* output */}
        <div className="flex gap-2">
          <h4 className="font-semibold">Output:</h4>
          <h4 className="text-primary/60 font-medium">{testCase.output}</h4>
        </div>
        {/* explantion */}
        {testCase.explanation && (
          <div className="flex gap-2">
            <h4 className="font-semibold">Explanation:</h4>
            <h4 className="text-primary/60 font-medium">
              {testCase.explanation}
            </h4>
          </div>
        )}
      </div>
    </div>
  );
};
