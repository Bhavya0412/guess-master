import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
});

function GameFrame() {
  return (
    <main className="game-page-shell">
      <iframe
        src="/guessing-game/index.html"
        title="Number Guessing Game"
        className="game-frame"
      />
    </main>
  );
}

function Index() {
  return <GameFrame />;
}
