"use client";

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
import Bard, { askAI } from "bard-ai";

export async function Chat() {

  const bard_key = 'ZQh5Q_XGxrdzDOivVT-HYrZDW-2Gw6n2MzTAsHLD1Ic1aspjSJC8ze1lNMj7pJpoXIYhaw.';

  await Bard.init(bard_key);

  const new_conversation = new Bard.Chat();

  return (
    <Card className="w-[550px] h-[700px] grid grid-rows-[min-content_1fr_min-content]">
      <CardHeader>
        <CardTitle>Netuno AI</CardTitle>
        <CardDescription>
          <p>Seu assistente virtual</p>
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-3 text-slate-600 text-sm">
          <Avatar>
            <AvatarFallback>BS</AvatarFallback>
            <AvatarImage src="avatar.png"></AvatarImage>
          </Avatar>
          <p className="leading-relaxed">
            <span className="block font-bold text-slate-700">
              Ciclope:
            </span>
            Eai mano
          </p>
        </div>
        <div className="flex gap-3 text-slate-600 text-sm">
          <Avatar>
            <AvatarFallback>NT</AvatarFallback>
            <AvatarImage src="netuno.png"></AvatarImage>
          </Avatar>
          <p className="leading-relaxed">
            <span className="block font-bold text-slate-700">
              Netuno:
            </span>
            Suave?
          </p>
        </div>
      </CardContent>
      <CardFooter>
        <form className="w-full flex gap-2">
          <Input
            placeholder="Qual a boa chefe?"
          />
          <Button type="submit">Enviar</Button>
        </form>
      </CardFooter>
    </Card>
  );
}
