import type { StoryListProps } from "../types";
export default function StoryList({ stories, onOpen }: StoryListProps) {
    return (
        <div className="flex overflow-x-auto gap-3 p-3 bg-gray-100">
            {stories.map((story, index) => (
                <div
                    key={story.id}
                    onClick={() => onOpen(index)}
                    className="w-16 h-16 flex-shrink-0 rounded-full overflow-hidden cursor-pointer border-2 border-gray-300"
                >
                    <img src={story.image} alt={`Story ${story.id}`} className="w-full h-full object-cover" />
                </div>
            ))}
        </div>
    );
}