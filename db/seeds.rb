# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

2.times do |i|
  User.create(email: "user-#{i+1}@example.com", password: "password", password_confirmation: "password")
end

User.all.each do |u|
  15.times do |i|
    u.tasks.create(title: "To Do Item #{i+1} for #{u.email}", description: "Description #{i*i+1}", status: i % 3  == 0 ? "not-started" : (i % 3 == 1 ? "in-progress" : "complete"), priority: i % 3 == 0 ? "low" : (i % 3 == 1 ? "medium" : "high"), tags: ["one", "two", "three"] )
  end
end
