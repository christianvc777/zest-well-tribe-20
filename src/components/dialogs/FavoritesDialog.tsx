import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, MapPin, Trophy, Target, User, ExternalLink } from "lucide-react";
import { MobileCard, MobileCardContent } from "@/components/ui/mobile-card";

interface FavoritesDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function FavoritesDialog({ isOpen, onClose }: FavoritesDialogProps) {
  const favoriteItems = [
    {
      id: 1,
      type: "location",
      title: "Parque Simón Bolívar",
      subtitle: "Parque • 1.2 km",
      description: "Tu lugar favorito para correr",
      icon: MapPin,
      color: "text-success"
    },
    {
      id: 2,
      type: "achievement",
      title: "Maratonista",
      subtitle: "Logro épico",
      description: "Tu logro más reciente",
      icon: Trophy,
      color: "text-warning"
    },
    {
      id: 3,
      type: "challenge",
      title: "30 Días de Cardio",
      subtitle: "Reto activo",
      description: "En progreso - 78%",
      icon: Target,
      color: "text-primary"
    },
    {
      id: 4,
      type: "location",
      title: "Ciclovía de la 7ma",
      subtitle: "Ciclovía • 0.5 km",
      description: "Perfecto para los domingos",
      icon: MapPin,
      color: "text-success"
    },
    {
      id: 5,
      type: "workout",
      title: "Rutina HIIT Avanzado",
      subtitle: "Entrenamiento",
      description: "45 min • Completado 12 veces",
      icon: Target,
      color: "text-accent"
    },
    {
      id: 6,
      type: "user",
      title: "Carlos Fitness",
      subtitle: "@carlos_trainer",
      description: "Entrenador personal certificado",
      icon: User,
      color: "text-secondary"
    }
  ];

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "location": return "Lugar";
      case "achievement": return "Logro";
      case "challenge": return "Reto";
      case "workout": return "Rutina";
      case "user": return "Usuario";
      default: return "Favorito";
    }
  };

  const handleItemClick = (item: any) => {
    switch (item.type) {
      case "location":
        // Redirect to map with location
        break;
      case "achievement":
        // Show achievement details
        break;
      case "challenge":
        // Go to challenges page
        break;
      case "workout":
        // Show workout details
        break;
      case "user":
        // Go to user profile
        break;
      default:
        break;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[95vw] max-w-md max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Heart className="h-5 w-5 text-red-500 fill-current" />
            <span>Favoritos</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-lg font-bold text-primary">{favoriteItems.length}</p>
              <p className="text-xs text-muted-foreground">Total</p>
            </div>
            <div>
              <p className="text-lg font-bold text-success">
                {favoriteItems.filter(item => item.type === "location").length}
              </p>
              <p className="text-xs text-muted-foreground">Lugares</p>
            </div>
            <div>
              <p className="text-lg font-bold text-warning">
                {favoriteItems.filter(item => item.type === "achievement").length}
              </p>
              <p className="text-xs text-muted-foreground">Logros</p>
            </div>
          </div>

          {/* Favorites List */}
          <div className="space-y-3">
            <h3 className="font-medium">Tus favoritos</h3>
            {favoriteItems.map((item) => (
              <MobileCard key={item.id} variant="elevated">
                <MobileCardContent>
                  <div className="flex items-center space-x-3">
                    <div className={`h-10 w-10 rounded-full bg-muted/30 flex items-center justify-center`}>
                      <item.icon className={`h-5 w-5 ${item.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium truncate">{item.title}</h4>
                        <Badge variant="secondary" className="text-xs">
                          {getTypeLabel(item.type)}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{item.subtitle}</p>
                      <p className="text-xs text-muted-foreground mt-1">{item.description}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleItemClick(item)}
                      className="h-8 w-8 p-0"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                </MobileCardContent>
              </MobileCard>
            ))}
          </div>

          {/* Empty State (if no favorites) */}
          {favoriteItems.length === 0 && (
            <div className="text-center py-8">
              <Heart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No tienes favoritos aún</p>
              <p className="text-sm text-muted-foreground mt-1">
                Guarda lugares, logros y más para verlos aquí
              </p>
            </div>
          )}

          {/* Actions */}
          <div className="flex space-x-2 pt-4">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cerrar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}