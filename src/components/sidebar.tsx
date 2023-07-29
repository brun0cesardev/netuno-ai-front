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
import React from "react"
import { Button } from "./ui/button";
import { BsLayoutTextWindowReverse } from 'react-icons/bs'

export const Sidebar = () => {
  return (
    <Card className="w-[250px] h-[700px] grid grid-rows-[min-content_1fr_min-content]">
      <CardHeader>
        <CardTitle className="flex align-items-center gap-1 justify-center">
            <Button type="button">Nova Conversa</Button>
            <Button type="button"><BsLayoutTextWindowReverse/></Button>
        </CardTitle>
      </CardHeader>
      <CardContent
        className="space-y-4 max-h-100 overflow-y-auto"
      ></CardContent>
      <CardFooter>
        {/* <div className="w-full flex gap-2 pt-5">
          <Input placeholder="Qual a boa chefe?" />
          <Button type="button">Enviar</Button>
        </div> */}
      </CardFooter>
    </Card>
  );
};
