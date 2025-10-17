import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";

const ADMIN_EMAIL = "admin@domain.com";

const Admin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { signIn, signUp, user, isAdmin, loading } = useAuth();
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSetupMode, setIsSetupMode] = useState(false);

  // Redirect if already logged in as admin
  if (!loading && user && isAdmin) {
    navigate("/admin/dashboard");
  }

  const handleSetupAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password || password.length < 6) {
      toast({
        title: "Error",
        description: "Password must be at least 6 characters",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const { error } = await signUp(ADMIN_EMAIL, password);
      
      if (error) {
        toast({
          title: "Error",
          description: error.message || "Failed to create admin account",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Success!",
        description: "Admin account created. You can now sign in.",
      });
      
      setIsSetupMode(false);
      setPassword("");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to create admin account",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await signIn(ADMIN_EMAIL, password);
      
      if (error) {
        toast({
          title: "Error",
          description: "Invalid password. Click 'First Time Setup' if you haven't created an admin account yet.",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Checking credentials...",
        description: "Please wait while we verify your admin access.",
      });
      
      setTimeout(() => {
        navigate("/admin/dashboard");
      }, 1000);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Invalid password",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Admin Panel</h1>
          <p className="text-muted-foreground">
            {isSetupMode ? "Create your admin account" : "Enter password to access"}
          </p>
        </div>

        <form onSubmit={isSetupMode ? handleSetupAdmin : handleSignIn} className="space-y-6">
          <div>
            <Label htmlFor="password">
              {isSetupMode ? "Create Admin Password" : "Admin Password"}
            </Label>
            <Input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={isSetupMode ? "Create a password (min 6 characters)" : "Enter admin password"}
              className="text-center text-lg"
            />
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (isSetupMode ? "Creating..." : "Signing in...") : (isSetupMode ? "Create Admin Account" : "Sign In")}
          </Button>
        </form>

        <div className="space-y-2 mt-4">
          <Button
            variant="outline"
            onClick={() => {
              setIsSetupMode(!isSetupMode);
              setPassword("");
            }}
            className="w-full"
          >
            {isSetupMode ? "Back to Sign In" : "First Time Setup"}
          </Button>
          
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="w-full"
          >
            Back to Home
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Admin;
