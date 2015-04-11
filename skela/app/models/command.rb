class Command < ActiveRecord::Base
  belongs_to :user

  validates_presence_of :command_text

  def when
    self.created_at
  end
end
