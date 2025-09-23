import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { BookmarkPlus, EyeOff, Flag, Share, Trash2, Edit } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PostMenuDialogProps {
  isOpen: boolean;
  onClose: () => void;
  post: {
    id: number;
    user: {
      name: string;
    };
  };
  isOwnPost?: boolean;
}

export function PostMenuDialog({ isOpen, onClose, post, isOwnPost = false }: PostMenuDialogProps) {
  const { toast } = useToast();

  const handleAction = (action: string) => {
    switch (action) {
      case "save":
        toast({
          title: "Guardado",
          description: "Post guardado en tus favoritos",
        });
        break;
      case "hide":
        toast({
          title: "Ocultado",
          description: "No verás más posts de este usuario",
        });
        break;
      case "report":
        toast({
          title: "Reportado",
          description: "Hemos recibido tu reporte, lo revisaremos",
        });
        break;
      case "share":
        // Simular compartir
        if (navigator.share) {
          navigator.share({
            title: "Post de " + post.user.name,
            text: "Mira esta publicación en FitApp",
            url: window.location.href
          });
        } else {
          toast({
            title: "Copiado",
            description: "Enlace copiado al portapapeles",
          });
        }
        break;
      case "edit":
        toast({
          title: "Editar",
          description: "Función de editar próximamente disponible",
        });
        break;
      case "delete":
        toast({
          title: "Eliminado",
          description: "Tu publicación ha sido eliminada",
          variant: "destructive"
        });
        break;
    }
    onClose();
  };

  const menuOptions = isOwnPost ? [
    {
      icon: Edit,
      label: "Editar publicación",
      action: "edit",
      variant: "ghost" as const
    },
    {
      icon: Share,
      label: "Compartir",
      action: "share", 
      variant: "ghost" as const
    },
    {
      icon: Trash2,
      label: "Eliminar",
      action: "delete",
      variant: "ghost" as const,
      destructive: true
    }
  ] : [
    {
      icon: BookmarkPlus,
      label: "Guardar en favoritos",
      action: "save",
      variant: "ghost" as const
    },
    {
      icon: Share,
      label: "Compartir",
      action: "share",
      variant: "ghost" as const
    },
    {
      icon: EyeOff,
      label: "No me interesa",
      action: "hide",
      variant: "ghost" as const
    },
    {
      icon: Flag,
      label: "Reportar publicación",
      action: "report",
      variant: "ghost" as const,
      destructive: true
    }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-sm mx-auto">
        <DialogHeader>
          <DialogTitle>Opciones de publicación</DialogTitle>
        </DialogHeader>

        <div className="space-y-2">
          {menuOptions.map((option, index) => (
            <Button
              key={index}
              variant={option.variant}
              className={`w-full justify-start h-auto p-3 ${
                option.destructive ? 'text-destructive hover:text-destructive' : ''
              }`}
              onClick={() => handleAction(option.action)}
            >
              <option.icon className="h-4 w-4 mr-3" />
              <span>{option.label}</span>
            </Button>
          ))}
        </div>

        <Button variant="outline" onClick={onClose} className="w-full mt-4">
          Cancelar
        </Button>
      </DialogContent>
    </Dialog>
  );
}