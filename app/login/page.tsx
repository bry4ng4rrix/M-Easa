import {
  CardContent,
  CardHeader,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

const Page = () => {
  return (
    <div className="min-h-screen flex items-center justify-center  p-4 ">
         
      <div className="w-full max-w-md rounded-md space-y-2 border border-slate-200 shadow py-4 ">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-2xl font-bold">Bienvenue</CardTitle>
          <p className="text-sm text-muted-foreground">
            Connectez-vous à votre compte
          </p>
        </CardHeader>

        <CardContent>
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="email@example.com" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Mot de passe</Label>
              <Input id="password" type="password" placeholder="********" />
            </div>

            <Button className="w-full bg-primary hover:bg-violet-900 translation-all duration-300">
              Se connecter
            </Button>

            <div className="flex justify-between text-sm">
              <Link href="#" className="text-muted-foreground hover:underline">
                Mot de passe oublié ?
              </Link>

              <Link href="/register" className="hover:underline">
                Créer un compte ?
              </Link>
            </div>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-slate-200"></span>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                ou
              </span>
            </div>
          </div>

          <Button variant="outline" className="w-full">
            Continuer avec Google
          </Button>
        </CardContent>

        <CardFooter className="text-center text-xs text-muted-foreground border-slate-200">
          M-Easa © 2026
        </CardFooter>
      </div>
    </div>
  );
};

export default Page;
