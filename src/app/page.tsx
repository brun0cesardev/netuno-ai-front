import { Chat } from "@/components/chat";
import { Sidebar } from "@/components/sidebar";

export default function Home() {
  return (
    <div className="flex min-h-screen bg-slate-200 items-center justify-center">
      <Sidebar/>
      <Chat/>
    </div>
  )
}
