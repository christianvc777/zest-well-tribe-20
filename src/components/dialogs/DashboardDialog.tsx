import { X, TrendingUp, Target, Zap, Calendar, Trophy, Activity } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MobileCard, MobileCardContent, MobileCardHeader, MobileCardTitle } from "@/components/ui/mobile-card";
import { Badge } from "@/components/ui/badge";
import { SimpleChart } from "@/components/ui/simple-chart";

interface DashboardDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DashboardDialog({ isOpen, onClose }: DashboardDialogProps) {
  const weeklyActivityData = [
    { day: "Lun", value: 45 },
    { day: "Mar", value: 70 },
    { day: "Mié", value: 35 },
    { day: "Jue", value: 85 },
    { day: "Vie", value: 60 },
    { day: "Sáb", value: 90 },
    { day: "Dom", value: 25 }
  ];

  const weeklyCaloriesData = [
    { day: "Lun", value: 320 },
    { day: "Mar", value: 450 },
    { day: "Mié", value: 280 },
    { day: "Jue", value: 520 },
    { day: "Vie", value: 390 },
    { day: "Sáb", value: 610 },
    { day: "Dom", value: 180 }
  ];

  const monthlyTrainingsData = [
    { day: "Ene", value: 18 },
    { day: "Feb", value: 22 },
    { day: "Mar", value: 25 },
    { day: "Abr", value: 20 }
  ];

  const monthlyHoursData = [
    { day: "Ene", value: 24 },
    { day: "Feb", value: 31 },
    { day: "Mar", value: 38 },
    { day: "Abr", value: 29 }
  ];

  const goalProgress = [
    { goal: "Peso objetivo", current: 72, target: 70, unit: "kg", progress: 85 },
    { goal: "Entrenamientos semanales", current: 4, target: 5, unit: "sesiones", progress: 80 },
    { goal: "Calorías diarias", current: 1800, target: 2000, unit: "cal", progress: 90 }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-full max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Activity className="h-5 w-5 text-primary" />
            <span>Dashboard Completo</span>
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="max-h-[75vh]">
          <div className="space-y-6 p-1">
            {/* Métricas principales */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <MobileCard variant="elevated" className="bg-gradient-to-br from-primary/10 to-primary/5">
                <MobileCardContent className="p-4 text-center">
                  <Trophy className="h-8 w-8 text-primary mx-auto mb-2" />
                  <p className="text-2xl font-bold text-primary">12</p>
                  <p className="text-sm text-muted-foreground">Logros</p>
                </MobileCardContent>
              </MobileCard>

              <MobileCard variant="elevated" className="bg-gradient-to-br from-secondary/10 to-secondary/5">
                <MobileCardContent className="p-4 text-center">
                  <Zap className="h-8 w-8 text-secondary mx-auto mb-2" />
                  <p className="text-2xl font-bold text-secondary">156</p>
                  <p className="text-sm text-muted-foreground">Entrenamientos</p>
                </MobileCardContent>
              </MobileCard>

              <MobileCard variant="elevated" className="bg-gradient-to-br from-accent/10 to-accent/5">
                <MobileCardContent className="p-4 text-center">
                  <Target className="h-8 w-8 text-accent mx-auto mb-2" />
                  <p className="text-2xl font-bold text-accent">89%</p>
                  <p className="text-sm text-muted-foreground">Objetivos</p>
                </MobileCardContent>
              </MobileCard>

              <MobileCard variant="elevated" className="bg-gradient-to-br from-warning/10 to-warning/5">
                <MobileCardContent className="p-4 text-center">
                  <Calendar className="h-8 w-8 text-warning mx-auto mb-2" />
                  <p className="text-2xl font-bold text-warning">24</p>
                  <p className="text-sm text-muted-foreground">Días racha</p>
                </MobileCardContent>
              </MobileCard>
            </div>

            {/* Gráficos principales */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Actividad semanal */}
              <MobileCard variant="elevated">
                <MobileCardHeader>
                  <MobileCardTitle className="flex items-center space-x-2">
                    <TrendingUp className="h-4 w-4 text-primary" />
                    <span>Actividad Semanal</span>
                  </MobileCardTitle>
                </MobileCardHeader>
                <MobileCardContent>
                  <SimpleChart
                    data={weeklyActivityData}
                    height={200}
                    color="hsl(var(--primary))"
                  />
                  <div className="mt-4 flex justify-between text-sm text-muted-foreground">
                    <span>Promedio: 58 min/día</span>
                    <span>+12% vs semana anterior</span>
                  </div>
                </MobileCardContent>
              </MobileCard>

              {/* Calorías quemadas */}
              <MobileCard variant="elevated">
                <MobileCardHeader>
                  <MobileCardTitle className="flex items-center space-x-2">
                    <Zap className="h-4 w-4 text-secondary" />
                    <span>Calorías Quemadas</span>
                  </MobileCardTitle>
                </MobileCardHeader>
                <MobileCardContent>
                  <SimpleChart
                    data={weeklyCaloriesData}
                    height={200}
                    color="hsl(var(--secondary))"
                  />
                  <div className="mt-4 flex justify-between text-sm text-muted-foreground">
                    <span>Total semanal: 2,750 cal</span>
                    <span>Objetivo: 2,800 cal</span>
                  </div>
                </MobileCardContent>
              </MobileCard>

              {/* Progreso mensual */}
              <MobileCard variant="elevated">
                <MobileCardHeader>
                  <MobileCardTitle className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-accent" />
                    <span>Entrenamientos Mensuales</span>
                  </MobileCardTitle>
                </MobileCardHeader>
                <MobileCardContent>
                  <SimpleChart
                    data={monthlyTrainingsData}
                    height={200}
                    color="hsl(var(--accent))"
                  />
                  <div className="mt-4 flex justify-between text-sm text-muted-foreground">
                    <span>Mejor mes: Marzo (25)</span>
                    <span>Tendencia: +39% crecimiento</span>
                  </div>
                </MobileCardContent>
              </MobileCard>

              {/* Horas de entrenamiento */}
              <MobileCard variant="elevated">
                <MobileCardHeader>
                  <MobileCardTitle className="flex items-center space-x-2">
                    <Activity className="h-4 w-4 text-warning" />
                    <span>Horas de Entrenamiento</span>
                  </MobileCardTitle>
                </MobileCardHeader>
                <MobileCardContent>
                  <SimpleChart
                    data={monthlyHoursData}
                    height={200}
                    color="hsl(var(--warning))"
                  />
                  <div className="mt-4 flex justify-between text-sm text-muted-foreground">
                    <span>Total: 122 horas</span>
                    <span>Promedio: 30.5h/mes</span>
                  </div>
                </MobileCardContent>
              </MobileCard>
            </div>

            {/* Progreso de objetivos */}
            <MobileCard variant="elevated">
              <MobileCardHeader>
                <MobileCardTitle className="flex items-center space-x-2">
                  <Target className="h-4 w-4 text-primary" />
                  <span>Progreso de Objetivos</span>
                </MobileCardTitle>
              </MobileCardHeader>
              <MobileCardContent>
                <div className="space-y-4">
                  {goalProgress.map((goal, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-sm">{goal.goal}</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-muted-foreground">
                            {goal.current}/{goal.target} {goal.unit}
                          </span>
                          <Badge variant="secondary" className="text-xs">
                            {goal.progress}%
                          </Badge>
                        </div>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className="bg-gradient-primary h-2 rounded-full transition-all duration-500" 
                          style={{ width: `${goal.progress}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </MobileCardContent>
            </MobileCard>

            {/* Estadísticas detalladas */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <MobileCard variant="elevated">
                <MobileCardHeader>
                  <MobileCardTitle className="text-sm">Rendimiento</MobileCardTitle>
                </MobileCardHeader>
                <MobileCardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Fuerza</span>
                      <span className="text-sm font-medium">+15%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Resistencia</span>
                      <span className="text-sm font-medium">+22%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Flexibilidad</span>
                      <span className="text-sm font-medium">+8%</span>
                    </div>
                  </div>
                </MobileCardContent>
              </MobileCard>

              <MobileCard variant="elevated">
                <MobileCardHeader>
                  <MobileCardTitle className="text-sm">Frecuencia</MobileCardTitle>
                </MobileCardHeader>
                <MobileCardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Esta semana</span>
                      <span className="text-sm font-medium">4 sesiones</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Este mes</span>
                      <span className="text-sm font-medium">18 sesiones</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Racha actual</span>
                      <span className="text-sm font-medium">24 días</span>
                    </div>
                  </div>
                </MobileCardContent>
              </MobileCard>

              <MobileCard variant="elevated">
                <MobileCardHeader>
                  <MobileCardTitle className="text-sm">Preferencias</MobileCardTitle>
                </MobileCardHeader>
                <MobileCardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Cardio</span>
                      <span className="text-sm font-medium">35%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Fuerza</span>
                      <span className="text-sm font-medium">45%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Yoga</span>
                      <span className="text-sm font-medium">20%</span>
                    </div>
                  </div>
                </MobileCardContent>
              </MobileCard>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}