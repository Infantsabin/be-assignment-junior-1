Sequel.migration do
	change do
		create_table(:expense_users) do
			primary_key :id
            BigDecimal :amount,          null: false
            foreign_key :user_id,        :users, :key => :id, :on_delete	=> :cascade
            Boolean :paid,               default: false
            DateTime :created_at,        default: Sequel::CURRENT_TIMESTAMP
			DateTime :updated_at,        default: Sequel::CURRENT_TIMESTAMP
			DateTime :deleted_at,        default: nil
		end
	end
end