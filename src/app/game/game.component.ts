import { Component, OnInit } from '@angular/core';

import { Gamelogic } from '../gamelogic';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
  providers: [Gamelogic]
})

export class GameComponent implements OnInit {

  constructor(public game: Gamelogic) { }

  ngOnInit(): void {
  }

  startGame(): void {
    this.game.gameStart();
    const currentPlayer = 'Current turn: Player: ' + this.game.currentTurn;
    const information = document.querySelector('.current-status');
    information.innerHTML = currentPlayer;
  }

  async clickSubfield(subfield: any): Promise<void> {
    if (this.game.gameStatus === 1) {
      const position = subfield.currentTarget.getAttribute('position');
      const information = document.querySelector('.current-status');

      this.game.setField(position, this.game.currentTurn);
      const color = this.game.getplayerColorClass();
      subfield.currentTarget.classList.add(color);

      await this.game.checkGameEndWinner().then((end: boolean) => {
        if (this.game.gameStatus === 0 && end) {
          information.innerHTML = 'The winner is player no. ' + this.game.currentTurn;
        }
      });

      await this.game.checkGameEndFull().then((end: boolean) => {
        if (this.game.gameStatus === 0 && end) {
          information.innerHTML = 'No winner, draw';
        }
      });

      this.game.changePlayer();

      if (this.game.gameStatus === 1) {
        const currentPlayer = 'Current turn: Player: ' + this.game.currentTurn;
        information.innerHTML = currentPlayer;
      }
    }
  }
}