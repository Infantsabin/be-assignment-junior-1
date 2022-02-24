# frozen_string_literal: true
require_relative '../helper/basic_helper'

class UserExpense < Sequel::Model
	many_to_one		:user,
					:key	=> :user_id,
					:class  => :User

	many_to_one		:expense,
					:key	=> :expense_id,
					:class  => :Expense
end