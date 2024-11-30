import { ProblemTest } from "@/types";
import { useState } from "react";

type TesetCasesProps = {
  testCases: ProblemTest[];
};

const TestCases = ({ testCases }: TesetCasesProps) => {
  const filteredTestCases = testCases.filter((testCase) => {
    return testCase.visible;
  });
  const [selectedTestCase, setSelectedTestCase] = useState<ProblemTest | null>(
    filteredTestCases.length > 0 ? filteredTestCases[0] : null
  );
  return (
    <div className="w-full h-full p-1 overflow-hidden">
      <div className="w-full h-full px-5 py-3 border border-primary/40 rounded-lg bg-primary/10 flex flex-col gap-2 overflow-x-hidden relative">
        <div className="w-full h-fit bg-transparent">
          <div className="py-2 flex gap-3 items-center overflow-x-scroll">
            {filteredTestCases.map((testCase, idx) => (
              <div
                key={testCase._id}
                onClick={() =>
                  selectedTestCase !== testCase
                    ? setSelectedTestCase(testCase)
                    : null
                }
                className={`px-3 py-1 text-sm font-medium bg-primary/5 border ${selectedTestCase == testCase ? "border-primary" : "border-primary/20"} cursor-pointer hover:border-primary rounded-md whitespace-nowrap`}
              >
                Case {idx + 1}
              </div>
            ))}
          </div>
        </div>
        <div className="w-full h-full">
          {selectedTestCase !== null ? (
            <div className="space-y-3">
              {Object.entries(selectedTestCase.input).map(
                ([key, value]: any, idx) => (
                  <div key={idx} className="w-full h-full overflow-hidden">
                    <div className="space-y-0.5">
                      <p className="text-sm font-medium text-primary/50">
                        {key} =
                      </p>
                      <h4 className="p-3 font-medium bg-primary/5 border border-primary/20 rounded-md">
                        {Array.isArray(value) ? `[${value.join(", ")}]` : value}
                      </h4>
                    </div>
                  </div>
                )
              )}
            </div>
          ) : (
            <div className="w-full h-full flex items-center justify-center rounded-lg px-3 py-1 font-medium">
              Select a Test Case
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TestCases;
