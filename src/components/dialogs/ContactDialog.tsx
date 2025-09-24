import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Phone, Copy, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

interface ContactDialogProps {
  isOpen: boolean;
  onClose: () => void;
  location: {
    name: string;
    type: string;
    phone: string;
    address: string;
  };
}

export default function ContactDialog({ isOpen, onClose, location }: ContactDialogProps) {
  const handleCall = () => {
    window.open(`tel:${location.phone}`, '_self');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(location.phone);
    toast.success("Número copiado al portapapeles");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[95vw] max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Phone className="h-5 w-5 text-primary" />
            <span>Contacto</span>
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
                <span className="text-muted-foreground">📍</span>
                <span>{location.address}</span>
              </div>
            </div>
          </div>

          {/* Phone Number Card */}
          <div className="bg-muted/30 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">{location.phone}</p>
                  <p className="text-xs text-muted-foreground">Número principal</p>
                </div>
              </div>
              <Button variant="ghost" size="sm" onClick={handleCopy}>
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col space-y-2">
            <Button onClick={handleCall} className="w-full">
              <Phone className="h-4 w-4 mr-2" />
              Llamar ahora
            </Button>
            
            <Button variant="outline" onClick={onClose} className="w-full">
              Cerrar
            </Button>
          </div>

          {/* Additional Info */}
          <div className="text-xs text-muted-foreground bg-muted/30 p-3 rounded-lg">
            <p className="flex items-center space-x-1">
              <ExternalLink className="h-3 w-3" />
              <span>Se abrirá la aplicación de llamadas de tu dispositivo</span>
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}