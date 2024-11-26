import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full h-full flex items-center justify-center">
      <Button onClick={() => navigate("/dashboard")}>Get Started</Button>
    </div>
  );
};

export default LandingPage;
