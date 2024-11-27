import { useState, useRef } from "react";
import { Editor } from "@monaco-editor/react";
import parserBabel from "prettier/parser-babel";
import { ProblemBoilerPlate } from "@/types";
import { Loader2 } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface LanguageConfig {
  language: string;
  parser: string;
  parsers: any[];
}

const LANGUAGE_CONFIGS: Record<string, LanguageConfig> = {
  javascript: {
    language: "javascript",
    parser: "babel",
    parsers: [parserBabel],
  },
};

type CodeEditorProps = {
  boilerPlateCode: ProblemBoilerPlate;
};

const CodeEditor = ({ boilerPlateCode }: CodeEditorProps) => {
  const [language, setLanguage] = useState<keyof typeof LANGUAGE_CONFIGS>(
    boilerPlateCode.language || "javascript"
  );
  const [code, setCode] = useState<string>(boilerPlateCode.code || "");
  const editorRef = useRef<any>(null);

  const handleEditorMount = (editor: any) => {
    editorRef.current = editor;
  };

  const handleLanguageChange = (
    selectedLanguage: keyof typeof LANGUAGE_CONFIGS
  ) => {
    setLanguage(selectedLanguage);
  };

  return (
    <ScrollArea className="w-full h-full p-2">
      <div className="w-full min-h-[calc(100vh-16px)] border border-primary/40 rounded-lg bg-primary/10 relative">
        <Editor
          language={language}
          value={code}
          onChange={(value) => setCode(value || "")}
          onMount={handleEditorMount}
          loading={
            <Loader2 className="size-6 animate-spin text-muted-foreground" />
          }
          className="w-full h-[98.1vh] rounded-lg overflow-hidden"
          theme="vs-dark"
          options={{
            minimap: { enabled: false },
            contextmenu: false,
            formatOnType: true,
            fontSize: 14,
          }}
        />
      </div>
    </ScrollArea>
  );
};

export default CodeEditor;

//  <div className="flex flex-col h-screen p-4 bg-gray-100">
//        {/* <div className="flex space-x-4 mb-4">
//          <Select value={language} onValueChange={handleLanguageChange}>
//            <SelectTrigger className="w-48">
//              <SelectValue placeholder="Select Language" />
//            </SelectTrigger>
//            <SelectContent>
//              {Object.keys(LANGUAGE_CONFIGS).map((lang) => (
//                <SelectItem key={lang} value={lang}>
//                  {lang.charAt(0).toUpperCase() + lang.slice(1)}
//                </SelectItem>
//              ))}
//            </SelectContent>
//          </Select>
//        </div> */}
//        <div className="flex-grow">
//          <Editor
//             height="70vh"
//            language={language}
//            value={code}
//            onChange={(value) => setCode(value || "")}
//            onMount={handleEditorMount}
//            loading={<Loader2 className="size-6 animate-spin text-muted-foreground" />}
//            className="bg-red-500 rounded-lg"
//            options={{
//              minimap: { enabled: false },
//              contextmenu: false,
//              formatOnType: true,
//              fontSize: 14,
//            }}
//          />
//        </div>
//      </div>
