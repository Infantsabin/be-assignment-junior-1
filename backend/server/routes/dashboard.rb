App.route('api/dashboard') do |r|
    @user = User.where(token: @token).first
    raise "Invalid Login Token.." unless @user

    # r.on Integer do |id|
    #     user = User[id]
    #     raise "Invalid User" unless user

    #     r.post 'create' do
    #         User.create_user @data

    #         {
    #             success: true
    #         }
    #     end
    # end
    r.get do
        ret = @user.dashboard_details

        {
            values: ret,
            success: true
        }
    end
end