require "rubygems"
require "bundler/setup"

Bundler.require

require "jekyll"

desc "Generate website"
task :generate do
  Jekyll::Site.new(
    Jekyll.configuration({
      "source" => ".",
      "destination" => "_site"
    })
  ).process
end

desc "Publish website"
task :publish => [:generate] do
  Dir.mktmpdir do |tmp|
    cp_r "_site/.", tmp
    Dir.chdir tmp
    
    message = "Site updated at #{Time.now.utc}"
    
    system "git init"
    system "git add ."
    
    system "git commit -m #{message.shellescape}"
    system "git remote add origin git@github.com:webhippie/webhippie.github.com.git"
    system "git push origin master --force"
  end
end
