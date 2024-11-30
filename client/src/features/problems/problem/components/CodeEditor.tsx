import { useState, useRef } from "react";

import { Editor } from "@monaco-editor/react";
import prettier from "prettier/standalone";

import { motion } from "framer-motion";

import { ProblemBoilerPlate } from "@/types";
import {
  AlignLeft,
  Check,
  CircleAlert,
  Loader2,
  RotateCcw,
} from "lucide-react";
import SelectLanguage, { LANGUAGE_CONFIGS } from "./SelectLanguage";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type CodeEditorProps = {
  boilerPlateCode: ProblemBoilerPlate;
};

const CodeEditor = ({ boilerPlateCode }: CodeEditorProps) => {
  const [language, setLanguage] = useState<keyof typeof LANGUAGE_CONFIGS>(
    boilerPlateCode.language || "javascript"
  );
  const [code, setCode] = useState<string>(boilerPlateCode.code || "");
  const [isFormatting, setIsFormatting] = useState(false);
  const [isFormatted, setIsFormatted] = useState(false);
  const editorRef = useRef<any>(null);

  const handleEditorMount = (editor: any) => {
    editor.layout();
    editorRef.current = editor;
  };

  const handleResetDefaultCode = () => {
    setCode(boilerPlateCode.code || "");
  };

  const formatCode = async () => {
    try {
      setIsFormatting(true);
      const config = LANGUAGE_CONFIGS[language];
      console.log(config);
      const formattedCode = await prettier.format(code, {
        parser: config.parser,
        plugins: config.parsers.map((p) => p()),
        semi: true,
        singleQuote: true,
        trailingComma: "es5",
      });
      console.log(formattedCode);

      setCode(formattedCode);
      setIsFormatted(true);
      console.log("format complete");
    } catch (err) {
      console.error("Formatting error:", err);
    } finally {
      setIsFormatting(false);
    }
  };

  return (
    <div className="w-full h-full p-1 overflow-hidden">
      <div className="w-full h-full p-2 border border-primary/40 rounded-lg bg-primary/10 flex flex-col gap-2 overflow-x-hidden relative">
        <div className="w-full h-fit">
          <div className="px-3 py-2 flex items-center gap-5 justify-between bg-primary/5 border border-primary/40 rounded-lg">
            <SelectLanguage language={language} setLanguage={setLanguage} />
            <div
              id="menu-bar"
              className="flex items-center justify-between gap-2"
            >
              {/* format */}
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    {isFormatting ? (
                      <Loader2 className="size-5 animate-spin text-muted-foreground" />
                    ) : isFormatted ? (
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{
                          duration: 0.5,
                          type: "spring",
                          stiffness: 200,
                        }}
                        className="text-green-600"
                      >
                        <Check />
                      </motion.div>
                    ) : (
                      <AlignLeft
                        onClick={formatCode}
                        className="size-5 cursor-pointer text-primary/60 hover:text-primary"
                      />
                    )}
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Format code</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              {/* reset */}
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <span>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <RotateCcw className="size-5 text-primary/60 hover:text-primary hover:-rotate-[360deg] transition duration-500 cursor-pointer" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Reset to default code</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </span>
                </AlertDialogTrigger>
                <AlertDialogContent className="w-[450px]">
                  <div className="flex gap-5">
                    <CircleAlert className="size-10 rotate-180" />
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Your current code will be discarded and reset to default
                        code!
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                  </div>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleResetDefaultCode}>
                      Confirm
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </div>

        <div className="rounded-lg flex-1 overflow-hidden">
          <Editor
            language={language}
            value={code}
            onChange={(value) => setCode(value || "")}
            onMount={handleEditorMount}
            loading={
              <Loader2 className="size-6 animate-spin text-muted-foreground" />
            }
            className="w-full rounded-lg overflow-hidden"
            theme="vs-dark"
            options={{
              minimap: { enabled: false },
              contextmenu: false,
              formatOnType: true,
              fontSize: 14,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;
