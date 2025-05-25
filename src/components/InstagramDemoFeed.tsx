import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal } from 'lucide-react';
import { feedPosts } from '../constants/feed';
export default function InstagramDemoFeed() {
    return (
        <div className="max-w-md mx-auto bg-white">
            <div className="divide-y">
                {feedPosts.map((post) => (
                    <div key={post.id} className="bg-white">
                        <div className="flex items-center justify-between p-3">
                            <div className="flex items-center gap-3">
                                <img
                                    src={post.userAvatar}
                                    alt={post.username}
                                    className="w-8 h-8 rounded-full object-cover"
                                />
                                <div>
                                    <p className="font-semibold text-sm">{post.username}</p>
                                    {post.location && (
                                        <p className="text-xs text-gray-500">{post.location}</p>
                                    )}
                                </div>
                            </div>
                            <MoreHorizontal className="w-5 h-5" />
                        </div>

                        {/* Post Image */}
                        <div className="w-full">
                            <img
                                src={post.image}
                                alt="Post"
                                className="w-full h-80 object-cover"
                            />
                        </div>

                        {/* Post Actions */}
                        <div className="p-3">
                            <div className="flex items-center justify-between mb-3">
                                <div className="flex gap-4">
                                    <Heart className="w-6 h-6 cursor-pointer hover:text-red-500 fill-red-500 transition-colors" />
                                    <MessageCircle className="w-6 h-6 cursor-pointer hover:text-gray-600 transition-colors" />
                                    <Send className="w-6 h-6 cursor-pointer hover:text-gray-600 transition-colors" />
                                </div>
                                <Bookmark className="w-6 h-6 cursor-pointer hover:text-gray-600 transition-colors" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}