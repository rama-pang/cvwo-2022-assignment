class Task < ApplicationRecord
  default_scope { order(created_at: :desc) }

  belongs_to :user
  validates :title, presence: true
  validates :status, inclusion: { in: ["not-started", "in-progress", "complete"] }
  validates :priority, inclusion: { in: ["low", "medium", "high"] }
  validate :validate_tags

  def validate_tags
    errors.add(:tags, :invalid) unless tags == tags.uniq
    tags.each do |tag|
      if tag.present?
        if tag.size == 0
          errors.add(:tags, :invalid)
        end
      else
        errors.add(:tags, :invalid)
      end
    end
  end 
end
