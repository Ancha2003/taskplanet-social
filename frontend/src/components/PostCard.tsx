import React, { useState } from 'react';
import { 
  Card, 
  CardHeader, 
  CardContent, 
  CardActions, 
  Avatar, 
  Typography, 
  IconButton, 
  Box, 
  Divider,
  TextField,
  Button
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { formatDistanceToNow } from 'date-fns';
import api from '../api';
import { useAuth } from '../App';

export default function PostCard({ post: initialPost }: { post: any }) {
  const [post, setPost] = useState(initialPost);
  const [commentText, setCommentText] = useState('');
  const [showComments, setShowComments] = useState(false);
  const { user, showToast } = useAuth();

  const isLiked = post.likes.includes(user?.username);

  const handleLike = async () => {
    try {
      const response = await api.put(`/api/posts/${post._id}/like`);
      setPost(response.data);
    } catch (err) {
      showToast('Failed to update like', 'error');
    }
  };

  const handleComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    try {
      const response = await api.post(`/api/posts/${post._id}/comment`, { text: commentText });
      setPost(response.data);
      setCommentText('');
      showToast('Comment added!', 'success');
    } catch (err) {
      showToast('Failed to add comment', 'error');
    }
  };

  return (
    <Card sx={{ mb: 2 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: 'primary.main' }}>
            {post.username[0].toUpperCase()}
          </Avatar>
        }
        title={post.username}
        subheader={formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
      />
      <CardContent sx={{ pt: 0 }}>
        {post.text && (
          <Typography variant="body1" color="text.primary" sx={{ mb: post.image ? 2 : 0 }}>
            {post.text}
          </Typography>
        )}
        {post.image && (
          <Box borderRadius={1} overflow="hidden" border="1px solid #eee">
            <img 
              src={post.image} 
              alt="Post content" 
              style={{ width: '100%', display: 'block' }} 
              referrerPolicy="no-referrer"
            />
          </Box>
        )}
      </CardContent>
      <Divider />
      <CardActions disableSpacing sx={{ px: 2 }}>
        <Box display="flex" alignItems="center" mr={3}>
          <IconButton onClick={handleLike} color={isLiked ? "error" : "default"}>
            {isLiked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </IconButton>
          <Typography variant="body2" fontWeight={600}>{post.likes.length}</Typography>
        </Box>
        <Box display="flex" alignItems="center">
          <IconButton onClick={() => setShowComments(!showComments)}>
            <ChatBubbleOutlineIcon />
          </IconButton>
          <Typography variant="body2" fontWeight={600}>{post.comments.length}</Typography>
        </Box>
      </CardActions>

      {showComments && (
        <Box px={2} pb={2}>
          <Divider sx={{ mb: 2 }} />
          <Box display="flex" flexDirection="column" gap={1.5} mb={2}>
            {post.comments.map((comment: any, i: number) => (
              <Box key={i} display="flex" gap={1.5}>
                <Avatar sx={{ width: 24, height: 24, fontSize: 12 }}>{comment.username[0]}</Avatar>
                <Box bgcolor="#f0f2f5" p={1} borderRadius={2} flex={1}>
                  <Typography variant="subtitle2" fontSize={12} fontWeight={700}>
                    {comment.username}
                  </Typography>
                  <Typography variant="body2" fontSize={13}>
                    {comment.text}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
          <form onSubmit={handleComment}>
            <Box display="flex" gap={1}>
              <TextField
                fullWidth
                size="small"
                placeholder="Write a comment..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 4 } }}
              />
              <Button type="submit" variant="contained" size="small" sx={{ borderRadius: 4 }}>
                Post
              </Button>
            </Box>
          </form>
        </Box>
      )}
    </Card>
  );
}
