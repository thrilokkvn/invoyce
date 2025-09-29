import Features from "@/components/features";
import  GetStarted  from "@/components/get-started";
import Header from "@/components/header";
import  Hero  from "@/components/hero";

export default function Home() {
  return (
    <div>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <Hero />
        <Features />
        <GetStarted />
      </div>
    </div>
  );
}
