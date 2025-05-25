export interface Story {
  id: number;
  image: string;
}
export interface StoryViewerProps {
    story: Story;
    onNext: () => void;
    onPrev: () => void;
    onClose: () => void;
    autoAdvance?: boolean;
    isFirstStory?: boolean;
    isLastStory?: boolean;
}
export interface StoryListProps {
    stories: Story[];
    onOpen: (index: number) => void;
}