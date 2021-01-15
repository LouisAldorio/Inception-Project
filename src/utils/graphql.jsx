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

export const FETCH_USER_BY_ROLE = gql`
    query GetUserByRole(
        $role: String!
    ){
        users_by_role(role:$role){
            profile_image
            username
            email
            role
            whatsapp_number
            friend_list
            hashed_password
            looking_for
            products {
                id
                name
                image
                unit_price
                unit_type
                min_purchase
                description
            }
        }
    }
`

export const FETCH_USER_BY_USERNAME = gql`
    query GetUserByUsername(
        $username: String!
    ){
        user_by_username(username:$username){
            profile_image
            username
            email
            role
            whatsapp_number
            hashed_password
            friend_list
            looking_for
            products{
                id
                name
                image
                unit_price
                unit_type
                min_purchase
                description
            }
        }
    }
`

export const FETCH_FRIEND_LIST_DISTRIBUTOR = gql`
    query getFriendByDistributor{
        friend_list{
            username
            user{
                profile_image
                username
                email
                friend_list
                whatsapp_number
                products{
                    name
                    image
                    unit_price
                    min_purchase
                    description
                    unit_type
                }
            }
        }
    }
`

export const FETCH_SCHEDULE = gql`
    query GetSchedule {
        schedule_by_user{
            id
            schedule_name
            commodity_name
            dealed_unit
            start_date
            end_date
            day
            start_time
            end_time
            involved_users_username
            involved_users{
                profile_image
                username
                email
                whatsapp_number
            }
        }
    }
`