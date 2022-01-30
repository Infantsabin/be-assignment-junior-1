# frozen_string_literal: true
require_relative '../server/system/boot'

Faker::Config.random = nil

@password_digest = BCrypt::Password.create('password')

#User Seed
def users_seed
    users_arr =[{
        first_name: 'Test', 
        last_name: 'User 1', 
        email: 'test@email.com',
        password_digest: @password_digest, 
        token: Faker::Alphanumeric.alphanumeric(number: 10, min_alpha: 3)
        },
        {
            first_name: 'Test', 
            last_name: 'User 2', 
            email: 'admin@email.com',
            password_digest: @password_digest, 
            token: Faker::Alphanumeric.alphanumeric(number: 10, min_alpha: 3)
        }]

    DB[:users].multi_insert(users_arr)
end

#seeds call
users_seed