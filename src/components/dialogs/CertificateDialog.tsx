import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { MobileCard, MobileCardContent } from "@/components/ui/mobile-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, Share, Award, Star } from "lucide-react";

interface CertificateDialogProps {
  isOpen: boolean;
  onClose: () => void;
  challenge: {
    id: number;
    title: string;
    reward: string;
    completedDate?: string;
  };
}

export function CertificateDialog({ isOpen, onClose, challenge }: CertificateDialogProps) {
  const getCertificateDetails = (title: string) => {
    switch (title) {
      case "Primera Semana Activa":
        return {
          certificateId: "FSA-2024-001247",
          duration: "7 días consecutivos",
          achievements: [
            "Completó 7 sesiones de entrenamiento",
            "Mantuvo consistencia diaria",
            "Quemó 1,240 calorías totales",
            "Estableció rutina de ejercicio"
          ],
          signature: "Dr. Elena Martínez",
          role: "Directora de Bienestar Físico",
          validUntil: "Certificado permanente"
        };
      default:
        return {
          certificateId: "CERT-2024-000001",
          duration: "Completado",
          achievements: [],
          signature: "Equipo FitApp",
          role: "Certificación Digital",
          validUntil: "Certificado permanente"
        };
    }
  };

  const details = getCertificateDetails(challenge.title);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-sm mx-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Award className="h-6 w-6 text-warning" />
            <span>Certificado</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Certificado principal */}
          <MobileCard variant="elevated" className="bg-gradient-to-br from-primary/5 to-accent/5 border-2 border-primary/20">
            <MobileCardContent className="space-y-4 p-6">
              {/* Header del certificado */}
              <div className="text-center border-b border-primary/20 pb-4">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-3">
                  <Award className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-bold text-lg text-primary">CERTIFICADO DE LOGRO</h3>
                <p className="text-xs text-muted-foreground">FitApp Community</p>
              </div>

              {/* Contenido del certificado */}
              <div className="space-y-3 text-center">
                <p className="text-sm text-muted-foreground">Se certifica que</p>
                <p className="text-lg font-bold">María González</p>
                <p className="text-sm text-muted-foreground">Ha completado exitosamente el desafío</p>
                <h4 className="text-base font-bold text-primary">{challenge.title}</h4>
                
                <div className="bg-muted/50 rounded-lg p-3 my-4">
                  <p className="text-sm font-medium">{challenge.reward}</p>
                  <p className="text-xs text-muted-foreground mt-1">{details.duration}</p>
                </div>
              </div>

              {/* Logros específicos */}
              <div className="space-y-2">
                <h5 className="font-semibold text-sm">Logros alcanzados:</h5>
                {details.achievements.map((achievement, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Star className="h-3 w-3 text-warning flex-shrink-0" />
                    <p className="text-xs">{achievement}</p>
                  </div>
                ))}
              </div>

              {/* Footer del certificado */}
              <div className="border-t border-primary/20 pt-4 space-y-2">
                <div className="text-center">
                  <p className="text-xs font-medium">{details.signature}</p>
                  <p className="text-xs text-muted-foreground">{details.role}</p>
                </div>
                
                <div className="flex justify-between items-center text-xs text-muted-foreground">
                  <span>ID: {details.certificateId}</span>
                  <span>{challenge.completedDate || "Fecha de completado"}</span>
                </div>
                
                <div className="text-center">
                  <Badge variant="outline" className="text-xs">
                    {details.validUntil}
                  </Badge>
                </div>
              </div>

              {/* Sello/Marca de agua */}
              <div className="absolute top-4 right-4 opacity-10">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                  <Award className="h-6 w-6 text-white" />
                </div>
              </div>
            </MobileCardContent>
          </MobileCard>

          {/* Información adicional */}
          <MobileCard variant="elevated">
            <MobileCardContent className="space-y-3">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-success rounded-full"></div>
                <p className="text-sm font-medium">Certificado verificado</p>
              </div>
              <p className="text-xs text-muted-foreground">
                Este certificado está respaldado por blockchain y puede ser verificado 
                en cualquier momento usando el ID único proporcionado.
              </p>
              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                <span>Verificación:</span>
                <code className="bg-muted px-2 py-1 rounded">{details.certificateId}</code>
              </div>
            </MobileCardContent>
          </MobileCard>

          {/* Botones de acción */}
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="flex-1">
              <Download className="h-4 w-4 mr-1" />
              Descargar
            </Button>
            <Button variant="outline" size="sm" className="flex-1">
              <Share className="h-4 w-4 mr-1" />
              Compartir
            </Button>
          </div>

          {/* Botón de cerrar */}
          <Button variant="default" className="w-full" onClick={onClose}>
            Cerrar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}