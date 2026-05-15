import { Customer } from "../../customer/model/customer"
import { Game } from "../../game/model/game";

export class Lending {
    id: number;
    loanDate: string;
    returnDate: string;
    customer: Customer;
    game: Game;
}