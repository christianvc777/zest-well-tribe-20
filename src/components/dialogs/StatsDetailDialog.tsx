import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { MobileCard, MobileCardContent } from "@/components/ui/mobile-card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

interface StatsDetailDialogProps {
  isOpen: boolean;
  onClose: () => void;
  stat: {
    label: string;
    value: string;
    target: string;
    icon: React.ComponentType<any>;
    color: string;
  };
}

export function StatsDetailDialog({ isOpen, onClose, stat }: StatsDetailDialogProps) {
  const getDetailedInfo = (label: string) => {
    switch (label) {
      case "Pasos":
        return {
          formula: "Pasos detectados por acelerómetro + GPS",
          breakdown: [
            { time: "06:00 - 09:00", steps: 2834, activity: "Caminata matutina" },
            { time: "09:00 - 12:00", steps: 1892, activity: "Actividades diarias" },
            { time: "12:00 - 15:00", steps: 2156, activity: "Paseo almuerzo" },
            { time: "15:00 - 18:00", steps: 1352, activity: "Trabajo" }
          ],
          tips: [
            "¡Faltan solo 1,766 pasos para tu meta!",
            "Promedio semanal: 9,245 pasos/día",
            "Tu mejor día: 12,456 pasos (Lunes)"
          ]
        };
      case "Calorías":
        return {
          formula: "Metabolismo basal + Actividad física + Efecto térmico",
          breakdown: [
            { time: "Metabolismo basal", steps: 180, activity: "Funciones corporales" },
            { time: "Caminata", steps: 85, activity: "45 min de caminata" },
            { time: "Ejercicio", steps: 45, activity: "20 min de ejercicio" },
            { time: "Actividades diarias", steps: 10, activity: "Tareas domésticas" }
          ],
          tips: [
            "Faltan 180 calorías para tu meta",
            "Quema promedio: 285 cal/día",
            "Pico de quema: 14:30 (ejercicio)"
          ]
        };
      case "Minutos Activos":
        return {
          formula: "Actividad moderada a vigorosa ≥ 3 METS",
          breakdown: [
            { time: "07:00 - 07:20", steps: 20, activity: "Caminata rápida" },
            { time: "14:15 - 14:35", steps: 20, activity: "Ejercicio cardio" },
            { time: "19:00 - 19:05", steps: 5, activity: "Subir escaleras" }
          ],
          tips: [
            "Necesitas 15 minutos más para completar tu meta",
            "Intensidad promedio hoy: Moderada",
            "Mejor momento: 14:15-14:35 (cardio)"
          ]
        };
      default:
        return {
          formula: "Datos calculados automáticamente",
          breakdown: [],
          tips: []
        };
    }
  };

  const details = getDetailedInfo(stat.label);
  const percentage = Math.round((parseInt(stat.value.replace(',', '')) / parseInt(stat.target.replace(',', ''))) * 100);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-sm mx-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <stat.icon className={`h-6 w-6 ${stat.color}`} />
            <span>{stat.label} - Detalle</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Progreso actual */}
          <MobileCard variant="elevated">
            <MobileCardContent>
              <div className="text-center space-y-3">
                <div>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">de {stat.target}</p>
                </div>
                <Progress value={percentage} className="h-3" />
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">0</span>
                  <Badge variant="secondary">{percentage}% Completado</Badge>
                  <span className="text-muted-foreground">{stat.target}</span>
                </div>
              </div>
            </MobileCardContent>
          </MobileCard>

          {/* Fórmula de cálculo */}
          <div>
            <h3 className="font-semibold mb-2">¿Cómo se calcula?</h3>
            <MobileCard>
              <MobileCardContent>
                <p className="text-sm text-muted-foreground">{details.formula}</p>
              </MobileCardContent>
            </MobileCard>
          </div>

          {/* Desglose por períodos */}
          <div>
            <h3 className="font-semibold mb-2">Desglose de Hoy</h3>
            <div className="space-y-2">
              {details.breakdown.map((item, index) => (
                <MobileCard key={index}>
                  <MobileCardContent className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="font-medium text-sm">{item.time}</p>
                      <p className="text-xs text-muted-foreground">{item.activity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-primary">{item.steps.toLocaleString()}</p>
                      <p className="text-xs text-muted-foreground">
                        {stat.label === "Pasos" ? "pasos" : stat.label === "Calorías" ? "cal" : "min"}
                      </p>
                    </div>
                  </MobileCardContent>
                </MobileCard>
              ))}
            </div>
          </div>

          {/* Consejos y datos adicionales */}
          <div>
            <h3 className="font-semibold mb-2">Información Adicional</h3>
            <div className="space-y-2">
              {details.tips.map((tip, index) => (
                <MobileCard key={index} variant="elevated">
                  <MobileCardContent>
                    <p className="text-sm">{tip}</p>
                  </MobileCardContent>
                </MobileCard>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}