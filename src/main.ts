import { Scene } from "./scenes/Scene";
import "normalize.css";
import "./style.css";
import { gameLoop } from "./business-logic/GameLoop";

gameLoop.init();
new Scene().init();
