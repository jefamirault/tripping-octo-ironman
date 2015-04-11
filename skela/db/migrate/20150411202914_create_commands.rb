class CreateCommands < ActiveRecord::Migration
  def change
    create_table :commands do |t|
      t.string :command_text
      t.integer :user_id

      t.timestamps null: false
    end
  end
end
