"use client";

import React, { useState, useRef, useEffect } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { Button } from "./ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "./ui/card";
import { Input } from "./ui/input";
import { api } from "@/lib/axios";

interface questionsProps {
  Question: String;
  Answer: String;
  Rows: textAnswerProps;
}

interface languageProps {
  Word: String;
  Language: String;
}

interface textAnswerProps {
  qtRows: Number;
  rowsAnswer: [
    {
      isCode: Boolean;
      theRow: any;
    }
  ];
}

export const Chat = () => {
  const [theQuestion, setTheQuestion] = useState("");
  const [listQuestions, setListQuestions] = useState([] as questionsProps[]);
  const cardContentRef = useRef<HTMLDivElement | null>(null);

  const handleSubmit = async () => {
    await enviaPergunta(theQuestion);
  };

  const scrollToBottom = () => {
    if (cardContentRef.current) {
      cardContentRef.current.scrollTop = cardContentRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [listQuestions]);

  async function enviaPergunta(question: string) {
    try {
      setListQuestions([
        ...listQuestions,
        {
          Question: question,
          Answer: "",
          Rows: { qtRows: 0, rowsAnswer: [{ isCode: false, theRow: "" }] },
        },
      ]);
      const response = await api.post(`api/getanswer`, { question });
      if (!response) {
        console.log("Response undefined");
        return;
      }

      if (response.status >= 400) {
        console.log("Response nao encontrou a rota");
        return;
      }

      if (response.status === 200) {
        setListQuestions([
          ...listQuestions,
          {
            Question: question,
            Answer: response.data,
            Rows: { qtRows: 0, rowsAnswer: [{ isCode: false, theRow: "" }] },
          },
        ]);
      }
    } catch (error) {
      console.error(error);
      return;
    }
  }

  async function verificaLinguaguem(textQuestion: string, textAnswer: string) {
    try {
      let verificaQuestao = false;

      const listLanguage: languageProps[] = [
        { Word: "$react$", Language: "js" },
        { Word: "$reactjs$", Language: "js" },
        { Word: "$react.js$", Language: "js" },
        { Word: "$javascript$", Language: "js" },
        { Word: "$js$", Language: "js" },
        { Word: "$node$", Language: "js" },
        { Word: "$nodejs$", Language: "js" },
        { Word: "$tsx$", Language: "typescript" },
        { Word: "$typescript$", Language: "typescript" },
        { Word: "$ts$", Language: "typescript" },
        { Word: "$delphi$", Language: "delphi" },
        { Word: "$demonho$", Language: "delphi" },
        { Word: "$c-normal$", Language: "c" },
        { Word: "$c-plus$", Language: "c++" },
        { Word: "$csharp$", Language: "csharp" },
        { Word: "$c#$", Language: "csharp" },
        { Word: "$c-sharp$", Language: "csharp" },
        { Word: "$c++$", Language: "c++" },
        { Word: "$dart$", Language: "dart" },
        { Word: "$dockerfile$", Language: "dockerfile" },
        { Word: "$linguagem-go$", Language: "go" },
        { Word: "$html$", Language: "html" },
        { Word: "$kotlin$", Language: "kotlin" },
        { Word: "$php$", Language: "php" },
        { Word: "$py$", Language: "python" },
        { Word: "$python$", Language: "python" },
        { Word: "$ruby$", Language: "ruby" },
        { Word: "$scss$", Language: "scss" },
        { Word: "$shell$", Language: "shell" },
        { Word: "$sql$", Language: "sql" },
        { Word: "$swift$", Language: "swift" },
        { Word: "$essiqueeli$", Language: "sql" },
        { Word: "$xml$", Language: "xml" },
        { Word: "$yaml$", Language: "yaml" },
      ];

      let indexLanguage = -1;
      let whatLanguage = "";
      let existeProg = false;

      for (let i = 0; i < listLanguage.length; i++) {
        indexLanguage = textQuestion
          .toLowerCase()
          .indexOf(`${String(listLanguage[i].Word)}`);
        if (indexLanguage != -1) {
          whatLanguage = String(listLanguage[i].Language);
          existeProg = true;
          break;
        }
      }

      if (existeProg) {
        return (
          <code className="code-container no-decoration-radius">
            {textAnswer}
          </code>
        );
        existeProg = false;
      } else {
        return textAnswer;
      }
    } catch (error) {
      console.error(error);
      return;
    }
  }

  return (
    <Card className="w-[1000px] h-[700px] grid grid-rows-[min-content_1fr_min-content]">
      <CardHeader>
        <CardTitle>Netuno AI</CardTitle>
        <CardDescription>
          <p>Seu assistente virtual</p>
        </CardDescription>
      </CardHeader>
      <CardContent
        id="cardConversation"
        className="space-y-4 max-h-100 border-t-2 border-b-2 overflow-y-auto"
        ref={cardContentRef}
      >
        {listQuestions.map((message, i) => {
          return (
            <React.Fragment key={i}>
              <div className="flex gap-3 text-slate-600 text-sm mt-2">
                <Avatar>
                  <AvatarFallback>BS</AvatarFallback>
                  <AvatarImage src="avatar.png"></AvatarImage>
                </Avatar>
                <p className="leading-relaxed">
                  <span className="block font-bold text-slate-700">
                    Ciclope:
                  </span>
                  {message.Question}
                </p>
              </div>
              <div className="flex gap-3 text-slate-600 text-sm">
                <Avatar>
                  <AvatarFallback>BS</AvatarFallback>
                  <AvatarImage src="netuno-ai.png"></AvatarImage>
                </Avatar>
                <p className="leading-relaxed">
                  <span className="block font-bold text-slate-700">
                    Netuno:
                  </span>
                  {message.Div}
                </p>
              </div>
            </React.Fragment>
          );
        })}
      </CardContent>
      <CardFooter>
        <div className="w-full flex gap-2 pt-5">
          <Input
            placeholder="Qual a boa chefe?"
            className="bg-slate-200"
            onChange={(event) => {
              setTheQuestion(String(event.currentTarget.value));
            }}
          />
          <Button
            type="button"
            className="w-[110px]"
            onClick={() => {
              handleSubmit();
            }}
          >
            hein viado
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};
