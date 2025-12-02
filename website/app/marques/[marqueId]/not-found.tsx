import { Button } from "@/components/ui/button";
import { AlertCircle, Home } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex items-center justify-center h-full overflow-clip">
      <div className="flex flex-col items-center gap-12">
        <div className="inline-flex items-center justify-center w-24 h-24 bg-linear-to-br from-foreground/10 to-foreground/60 rounded-full shadow-2xl">
          <AlertCircle size={48} />
        </div>
        <div className="flex flex-col gap-3 items-center justify-center">
          <h1 className="text-8xl">404</h1>
          <h2 className="text-2xl">Marque non trouvée</h2>
        </div>
        <div>
          <Button>
            <Home />
            Retour aux marques
          </Button>
        </div>
      </div>
    </main>
  );
}
