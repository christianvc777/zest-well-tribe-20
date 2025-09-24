import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Share, Copy, ExternalLink } from "lucide-react";
import { toast } from "sonner";

interface ShareProfileDialogProps {
  isOpen: boolean;
  onClose: () => void;
  profile: {
    name: string;
    username: string;
  };
}

export default function ShareProfileDialog({ isOpen, onClose, profile }: ShareProfileDialogProps) {
  const profileUrl = `https://wellness-app.com/profile/${profile.username.replace('@', '')}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(profileUrl);
    toast.success("Enlace copiado al portapapeles");
  };

  const shareOptions = [
    {
      name: "WhatsApp",
      icon: "💬",
      url: `https://wa.me/?text=¡Mira mi perfil de Wellness! ${encodeURIComponent(profileUrl)}`,
      color: "bg-green-500 hover:bg-green-600"
    },
    {
      name: "Facebook",
      icon: "📘",
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(profileUrl)}`,
      color: "bg-blue-600 hover:bg-blue-700"
    },
    {
      name: "Twitter",
      icon: "🐦",
      url: `https://twitter.com/intent/tweet?text=¡Sígueme en Wellness!&url=${encodeURIComponent(profileUrl)}`,
      color: "bg-sky-500 hover:bg-sky-600"
    },
    {
      name: "Instagram",
      icon: "📷",
      url: "https://www.instagram.com/",
      color: "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
    },
    {
      name: "LinkedIn",
      icon: "💼",
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(profileUrl)}`,
      color: "bg-blue-700 hover:bg-blue-800"
    },
    {
      name: "Telegram",
      icon: "✈️",
      url: `https://t.me/share/url?url=${encodeURIComponent(profileUrl)}&text=¡Mira mi perfil de Wellness!`,
      color: "bg-sky-600 hover:bg-sky-700"
    }
  ];

  const handleShare = (url: string, platform: string) => {
    if (platform === "Instagram") {
      toast.info("Copia el enlace y compártelo en tu historia de Instagram");
      handleCopyLink();
    } else {
      window.open(url, '_blank', 'width=600,height=400');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[95vw] max-w-md max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Share className="h-5 w-5 text-primary" />
            <span>Compartir Perfil</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Profile Info */}
          <div className="text-center space-y-2">
            <h3 className="font-semibold">{profile.name}</h3>
            <p className="text-sm text-muted-foreground">{profile.username}</p>
          </div>

          {/* URL Copy */}
          <div className="bg-muted/30 p-3 rounded-lg">
            <div className="flex items-center justify-between space-x-2">
              <div className="flex-1 min-w-0">
                <p className="text-xs text-muted-foreground">Enlace del perfil</p>
                <p className="text-sm font-mono truncate">{profileUrl}</p>
              </div>
              <Button variant="ghost" size="sm" onClick={handleCopyLink}>
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Social Share Options */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium">Compartir en redes sociales</h4>
            <div className="grid grid-cols-2 gap-2">
              {shareOptions.map((option) => (
                <Button
                  key={option.name}
                  variant="outline"
                  size="sm"
                  onClick={() => handleShare(option.url, option.name)}
                  className="flex items-center space-x-2 justify-start text-white hover:text-white"
                  style={{
                    background: option.color.includes('gradient') 
                      ? 'linear-gradient(to right, rgb(168 85 247), rgb(236 72 153))'
                      : option.color.split(' ')[0].replace('bg-', '').replace('-500', '').replace('-600', '').replace('-700', '').replace('-800', '')
                  }}
                >
                  <span className="text-base">{option.icon}</span>
                  <span className="text-xs">{option.name}</span>
                  <ExternalLink className="h-3 w-3 ml-auto" />
                </Button>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex space-x-2 pt-4">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cerrar
            </Button>
            <Button onClick={handleCopyLink} className="flex-1">
              <Copy className="h-4 w-4 mr-2" />
              Copiar enlace
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}