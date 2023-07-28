"use client";

import React, { useState, useRef, use, useEffect } from "react";
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
          { Question: question, Answer: response.data },
        ]);
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
                  {message.Answer}
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
            onChange={(event) => {
              setTheQuestion(String(event.currentTarget.value));
            }}
          />
          <Button
            type="button"
            onClick={() => {
              handleSubmit();
            }}
          >
            Enviar
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};
