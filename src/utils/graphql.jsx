import {gql} from '@apollo/client'

export const FETCH_COMMODITY_QUERY = gql`
query GetCommodityList(
    $page:  Int
    $limit: Int
){
    comodities(limit: $limit,page: $page){
        total_item
		nodes{
            id
            name
            image
            unit_price
            unit_type
            min_purchase
            description
            user{
                username
                email
                role
                whatsapp_number
                hashed_password
                friend_list
                profile_image
            }
        }
    }
}

`