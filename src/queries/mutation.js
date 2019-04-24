import {gql} from "apollo-boost";

export const addGameMutation = gql`
mutation AddGame(
    $winner: Int!, 
    $player_one_name: String!, 
    $player_one_sign: String!, 
    $player_two_name: String!, 
    $player_two_sign: String!)
    {
        addGame(
        winner: $winner, 
        player_one_name: $player_one_name, 
        player_one_sign: $player_one_sign, 
        player_two_name: $player_two_name, 
        player_two_sign: $player_two_sign
        ) {
            winner, player_one_name, player_one_sign, player_two_name, player_two_sign
    }
  }
`;
