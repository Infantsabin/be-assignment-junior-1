App.route('api/expense') do |r|
    @user = User.where(token: @token).first
    raise "Invalid Login Token.." unless @user

    r.on Integer do |id|
        user = User[id]
        raise "Invalid User" unless user

        r.get do
            ret = Expense.get_user_expenses user

            {
                values: ret,
                success: true
            }
        end
    end
    r.post do
        Expense.create_expense @data
        {
            success: true
        }
    end
end