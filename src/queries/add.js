import {gql} from "apollo-boost";

const addGameQuery = gql`
    mutation{
        addGame(winner: , player_one_sign: "", player_two_sign: "") {
            id
            winner
            player_one_sign
            player_two_sign
        }
    }
`;

export default addGameQuery;