import { Customer } from "../../customer/model/customer"
import { Game } from "../../game/model/game";

export class Lending {
    id: number;
    loanDate: Date;
    returnDate: Date;
    customer: Customer;
    game: Game;
}