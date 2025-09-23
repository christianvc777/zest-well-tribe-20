import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { MobileCard, MobileCardContent } from "@/components/ui/mobile-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Heart, Send } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Comment {
  id: number;
  user: {
    name: string;
    handle: string;
    avatar: string;
  };
  content: string;
  timestamp: string;
  likes: number;
  isLiked: boolean;
}

interface CommentDialogProps {
  isOpen: boolean;
  onClose: () => void;
  post: {
    id: number;
    user: {
      name: string;
      handle: string;
      avatar: string;
    };
    content: string;
  };
}

export function CommentDialog({ isOpen, onClose, post }: CommentDialogProps) {
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState<Comment[]>([
    {
      id: 1,
      user: {
        name: "Ana Rodríguez",
        handle: "@ana_wellness",
        avatar: ""
      },
      content: "¡Increíble logro! Me inspiras a seguir entrenando 💪",
      timestamp: "Hace 1 hora",
      likes: 5,
      isLiked: false
    },
    {
      id: 2,
      user: {
        name: "Luis Torres",
        handle: "@luis_strong", 
        avatar: ""
      },
      content: "¿Cuánto tiempo llevas entrenando? Excelente tiempo para una maratón",
      timestamp: "Hace 45 min",
      likes: 2,
      isLiked: true
    },
    {
      id: 3,
      user: {
        name: "Sandra Díaz",
        handle: "@sandra_run",
        avatar: ""
      },
      content: "¡Felicitaciones! 🏃‍♀️ ¿Algún consejo para principiantes?",
      timestamp: "Hace 30 min", 
      likes: 8,
      isLiked: false
    }
  ]);

  const handleLikeComment = (commentId: number) => {
    setComments(prev => prev.map(comment => 
      comment.id === commentId 
        ? { 
            ...comment, 
            isLiked: !comment.isLiked,
            likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1
          }
        : comment
    ));
  };

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    
    const comment: Comment = {
      id: Date.now(),
      user: {
        name: "María González",
        handle: "@maria_fitness",
        avatar: ""
      },
      content: newComment,
      timestamp: "Ahora",
      likes: 0,
      isLiked: false
    };

    setComments(prev => [...prev, comment]);
    setNewComment("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-sm mx-auto max-h-[80vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle>Comentarios</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col h-full max-h-[60vh]">
          {/* Post original */}
          <MobileCard variant="elevated" className="mb-4">
            <MobileCardContent>
              <div className="flex items-start space-x-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={post.user.avatar} alt={post.user.name} />
                  <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                    {post.user.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-1">
                    <h3 className="font-semibold text-sm">{post.user.name}</h3>
                    <Badge variant="secondary" className="text-xs px-1 py-0">✓</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{post.user.handle}</p>
                  <p className="text-sm mt-1 line-clamp-2">{post.content}</p>
                </div>
              </div>
            </MobileCardContent>
          </MobileCard>

          {/* Lista de comentarios */}
          <div className="flex-1 overflow-y-auto space-y-3 min-h-0">
            {comments.map((comment) => (
              <div key={comment.id} className="flex items-start space-x-3">
                <Avatar className="h-8 w-8 flex-shrink-0">
                  <AvatarImage src={comment.user.avatar} alt={comment.user.name} />
                  <AvatarFallback className="bg-secondary text-secondary-foreground text-xs">
                    {comment.user.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <MobileCard>
                    <MobileCardContent className="py-2">
                      <div className="flex items-center space-x-1 mb-1">
                        <h4 className="font-medium text-sm">{comment.user.name}</h4>
                        <p className="text-xs text-muted-foreground">{comment.user.handle}</p>
                        <span className="text-xs text-muted-foreground">•</span>
                        <p className="text-xs text-muted-foreground">{comment.timestamp}</p>
                      </div>
                      <p className="text-sm">{comment.content}</p>
                      <div className="flex items-center justify-between mt-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className={`h-6 px-2 ${
                            comment.isLiked ? 'text-red-500' : 'text-muted-foreground'
                          }`}
                          onClick={() => handleLikeComment(comment.id)}
                        >
                          <Heart className={`h-3 w-3 mr-1 ${comment.isLiked ? 'fill-current' : ''}`} />
                          <span className="text-xs">{comment.likes}</span>
                        </Button>
                      </div>
                    </MobileCardContent>
                  </MobileCard>
                </div>
              </div>
            ))}
          </div>

          {/* Agregar comentario */}
          <div className="mt-4 pt-3 border-t border-border">
            <div className="flex items-start space-x-3">
              <Avatar className="h-8 w-8 flex-shrink-0">
                <AvatarImage src="" alt="María" />
                <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                  M
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-2">
                <Textarea
                  placeholder="Escribe un comentario..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  rows={2}
                  className="resize-none text-sm"
                />
                <Button
                  size="sm"
                  onClick={handleAddComment}
                  disabled={!newComment.trim()}
                  className="ml-auto flex"
                >
                  <Send className="h-4 w-4 mr-1" />
                  Comentar
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}