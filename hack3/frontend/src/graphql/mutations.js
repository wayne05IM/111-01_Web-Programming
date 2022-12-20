import { gql } from "@apollo/client";

// TODO 3.1 Mutation - Update item
export const CREATE_ITEM_MUTATION = gql`
  mutation CreateItem(
    $id: String!
    $name: String!
    $amount: Number!
    $category: String!
    $date: Date!
    $description: String!
  ) {
    CreateItem(
      data: {
        id: $id
        name: $name
        amount: $amount
        category: $category
        date: $date
        description: $description
      }
    ) {
      id
      name
      amount
      category
      date
      description
    }
  }
`;
// TODO 3.1 End

export const UPDATE_ITEM_MUTATION = gql`
  mutation UpdateItem($input: UpdateItemInput!) {
    updateItem(input: $input) {
      id
    }
  }
`;

export const DELETE_ITEM_MUTATION = gql`
  mutation DeleteItem($id: ID!) {
    deleteItem(id: $id)
  }
`;
