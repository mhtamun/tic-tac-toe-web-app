import {gql} from "apollo-boost";

export const getGamesQuery = gql`
    {
    games{
            id, winner, player_one_name, player_one_sign, player_two_name, player_two_sign
        }
    }
`;
