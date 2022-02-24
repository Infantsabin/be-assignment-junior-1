# frozen_string_literal: true
require_relative '../helper/basic_helper'

class User < Sequel::Model
	plugin :secure_password

	one_to_many		:expenses,
					:key	=> :created_by_id,
					:class  => :Expense

	one_to_many		:paid_expenses,
					:key	=> :paid_by_id,
					:class  => :Expense

	def validate
		super
		validates_unique(:email,:mobile, :message=>'already exists'){ |ds| ds.where(:deleted_at => nil) }
	end

	def self.verify data
		user = User.where(email: data[:email]).or(mobile: data[:email]).first
		raise "Invalid User" unless user

		decrypted_password = Helper.decrypt_password(user.password_digest)
		raise "Incorrect Password" unless decrypted_password == data[:password_digest]

		login_token = Helper.secure_token
		user.update(token: login_token)

		return user.values
	end

	def self.create_user data
		data[:password_digest] = Helper.secure_password data[:password_digest]
		User.create(data)
	end

	def dashboard_details

		cur_user_id = self.id
		owe_amount = total_balance = due_amount = nil
		
		recent_sharings = self.expenses_dataset.collect do |expense|
			{
				name: expense[:name],
				description: expense[:description],
				date: expense[:date],
				total: expense[:total].to_f,
				created_by_id: expense[:created_by_id],
				paid_by_id: expense[:paid_by_id],
				created_by: expense.creator.name,
				paid_by: expense.paid_by.name,
			}
		end 

		owe_amount = UserExpense.where(:user_id => cur_user_id, :paid => false).sum(:amount).to_f
		due_amount = UserExpense.where{user_id !~ cur_user_id}.where(:paid => false).sum(:amount).to_f

		total_balance = self.paid_expenses_dataset.sum(:total).to_f + (owe_amount - due_amount)
		{
			name: self.name,
			email: self.email,
			recent_sharings: recent_sharings,
			owe_amount: owe_amount || 0.00,
			due_amount: due_amount || 0.00,
			total_balance: total_balance || 0.00,
		}
	end
end