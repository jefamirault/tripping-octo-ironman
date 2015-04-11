namespace :startup do
  desc 'Stuff only needed for startup'
  task create_superuser: :environment do
    admin = User.find_by_username 'Admin'

    if admin.nil?
      admin = User.new username: 'Admin', password: 'ChangeMe!'
      if admin.save
        puts 'User Admin created.'
      end
    end

    unless admin.is_superuser?
      admin.privilege_level = 1
      puts 'Admin now has superuser privileges.' if admin.save
    else
      'Admin already exists with superuser privileges.'
    end
  end

end
