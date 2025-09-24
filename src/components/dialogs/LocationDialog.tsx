import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { MapPin, Navigation, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface LocationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  location: {
    id: number;
    name: string;
    type: string;
    address: string;
    hours: string;
    phone: string;
    rating: number;
    price: string;
  };
}

export default function LocationDialog({ isOpen, onClose, location }: LocationDialogProps) {
  const handleDirections = () => {
    const query = encodeURIComponent(`${location.name} ${location.address} Bogotá`);
    window.open(`https://www.google.com/maps/search/${query}`, '_blank');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[95vw] max-w-md max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <MapPin className="h-5 w-5 text-primary" />
            <span>Ubicación</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Location Info */}
          <div className="space-y-3">
            <div>
              <h3 className="font-semibold text-lg">{location.name}</h3>
              <Badge variant="outline" className="mt-1">
                {location.type}
              </Badge>
            </div>
            
            <div className="space-y-2 text-sm">
              <div className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                <span>{location.address}, Bogotá, Colombia</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <span className="text-muted-foreground">⏰</span>
                <span>{location.hours}</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <span className="text-muted-foreground">💰</span>
                <span className="font-medium text-primary">{location.price}</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <span className="text-muted-foreground">⭐</span>
                <span>{location.rating} estrellas</span>
              </div>
            </div>
          </div>

          {/* Map Placeholder */}
          <div className="h-48 bg-gradient-card rounded-lg flex items-center justify-center border">
            <div className="text-center">
              <MapPin className="h-12 w-12 text-primary mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Vista previa del mapa</p>
              <p className="text-xs text-muted-foreground mt-1">
                {location.address}
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col space-y-2">
            <Button onClick={handleDirections} className="w-full">
              <Navigation className="h-4 w-4 mr-2" />
              Abrir en Google Maps
            </Button>
            
            <Button variant="outline" onClick={onClose} className="w-full">
              Cerrar
            </Button>
          </div>

          {/* Additional Info */}
          <div className="text-xs text-muted-foreground bg-muted/30 p-3 rounded-lg">
            <p className="flex items-center space-x-1">
              <ExternalLink className="h-3 w-3" />
              <span>Se abrirá Google Maps en una nueva pestaña</span>
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}