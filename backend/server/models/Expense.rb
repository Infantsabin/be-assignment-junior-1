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
end