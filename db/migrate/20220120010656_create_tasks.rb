class CreateTasks < ActiveRecord::Migration[6.0]
  def change
    create_table :tasks do |t|
      t.string :title
      t.text :description
      t.references :user, null: false, foreign_key: true
      t.string :status, default: "not-started"
      t.string :priority, default: "low"
      t.string :tags, array: true, default: []

      t.timestamps
    end
  end
end
