App.route('api/expense') do |r|
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
    r.post do
        Expense.create_expense @data
        {
            success: true
        }
    end
    r.get do
        ret = Expense.get_all_expenses

        {
            values: ret,
            success: true
        }
    end
end