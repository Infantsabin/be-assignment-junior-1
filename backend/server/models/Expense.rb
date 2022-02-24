# frozen_string_literal: true
require_relative '../helper/basic_helper'

class Expense < Sequel::Model
	many_to_one		:creator,
					:key	=> :created_by_id,
					:class  => :User

	many_to_one		:paid_by,
					:key	=> :paid_by_id,
					:class  => :User

	one_to_many		:user_expenses,
					:key	=> :expense_id,
					:class  => :UserExpense

	def self.create_expense data
		expense = self.new(
			name: data[:name],
			description: data[:description],
			date: data[:date],
			total: data[:total],
			created_by_id: data[:created_by_id],
			paid_by_id: data[:paid_by_id]
		)
		expense.save

		if data[:users] and !data[:users].empty?
			amount = data[:total] / (data[:users].count + 1)
			User.where(id: data[:users]).each do |user|
				expense.add_user_expense({
					amount: amount.to_f,
					user_id: user.id,
					paid: false,
					})
			end
		end

		payer_amount = data[:total].to_f - expense.user_expenses_dataset.sum(:amount).to_f
		expense.add_user_expense(amount: payer_amount,
					user_id: data[:created_by_id],
					paid: true)
	end

	def self.get_user_expenses cur_user
		Expense.where(:created_by_id => cur_user.id).collect do |expense|
			{
				name: expense[:name],
				description: expense[:description],
				date: expense[:date],
				total: expense[:total].to_f,
				created_by_id: expense[:created_by_id],
				paid_by_id: expense[:paid_by_id],
				created_by: expense.creator.name,
				paid_by: expense.paid_by.name
			}
		end		
	end
end