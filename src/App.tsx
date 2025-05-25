import { useEffect, useState } from "react";
import "./App.css";
import type { Story } from "./types";
import StoryList from "./components/StoryList";
import StoryViewer from "./components/StoryViewer";
import InstagramDemoFeed from "./components/InstagramDemoFeed";
import { Heart, MessageCircle } from "lucide-react";

function App() {
  const [stories, setStories] = useState<Story[]>([]);
  const [currentStoryIndex, setCurrentStoryIndex] = useState<number | null>(null);

  useEffect(() => {
    fetch("/stories.json")
      .then((res) => res.json())
      .then((data: Story[]) => setStories(data));
  }, []);

  const openStory = (index: number) => setCurrentStoryIndex(index);
  const closeStory = () => setCurrentStoryIndex(null);

  const goNext = () => {
    if (currentStoryIndex !== null && currentStoryIndex < stories.length - 1) {
      setCurrentStoryIndex(currentStoryIndex + 1);
    } else {
      closeStory();
    }
  };

  const goBack = () => {
    if (currentStoryIndex !== null && currentStoryIndex > 0) {
      setCurrentStoryIndex(currentStoryIndex - 1);
    }
  };

  return (
    <div className="App min-h-screen">
      <div className="flex items-center justify-between p-4 border-b">
        <h1 className="text-2xl font-bold">Instagram</h1>
        <div className="flex gap-4">
          <Heart className="w-6 h-6" />
          <MessageCircle className="w-6 h-6" />
        </div>
      </div>
      <StoryList stories={stories} onOpen={openStory} />
      {currentStoryIndex !== null && (
        <StoryViewer
          story={stories[currentStoryIndex]}
          onNext={goNext}
          onPrev={goBack}
          onClose={closeStory}
          autoAdvance
          isFirstStory={currentStoryIndex === 0}
          isLastStory={currentStoryIndex === stories.length - 1}
        />
      )}
      {/* This is a demo feed */}
      <div className="mt-8 p-4">
        <h2 className="text-xl font-semibold mb-4">Demo Feed</h2>
      </div>
      <InstagramDemoFeed />
    </div>
  );
}

export default App;