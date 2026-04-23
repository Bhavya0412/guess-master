import { createFileRoute } from "@tanstack/react-router";
import gameHtml from "../game/number-guessing/index.html?raw";
import gameCss from "../game/number-guessing/style.css?raw";
import gameJs from "../game/number-guessing/script.js?raw";

export const Route = createFileRoute("/")({
  component: Index,
});

const gameDocument = gameHtml
  .replace("__GAME_CSS__", gameCss)
  .replace("__GAME_JS__", gameJs.replace(/<\/script>/g, "<\\/script>"));

function GameFrame() {
  return (
    <main className="game-page-shell">
      <iframe
        srcDoc={gameDocument}
        title="Number Guessing Game"
        className="game-frame"
      />
    </main>
  );
}

function Index() {
  return <GameFrame />;
}
