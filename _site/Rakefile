require "rubygems"
require "bundler/setup"

Bundler.require

require "jekyll"

desc "Generate website"
task :generate do
  Dir.mkdir("_site") unless File.directory? "_site"
  
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

namespace :post do
  desc "Create blog post"
  task :create, :postname do |task, args|
    if args.none? and not ENV.key? "POSTNAME"
      puts "Postname must be provided."
      puts "Example:"
      puts "[bundle exec] rake #{task}[mein-cooler-post]"
      puts "     or:"
      puts "[bundle exec] rake #{task} POSTNAME=mein-cooler-post"
      exit 1
    end
    name = %x(git config --get user.name).chomp
    name ||= %x{whoami}.chomp.capitalize unless $?.exitstatus == 0
    content = <<EOF
---
layout: post
title: Dein Titel
author: #{name}
categories: []
tags: []
excerpt: Hier gehoert deine Post-Beschreibung hin.
---

EOF
    prefix = Time.now.strftime("%Y-%m-%d-")
    postname = args[:postname] || ENV["POSTNAME"]
    filename = File.join("_posts", prefix + postname + ".md")
    if File.exists? filename
      $stderr.puts "Remove existing file first: #{filename}"
    else
      File.write(filename, content)
      $stderr.puts "Successfully created file #{filename}"
    end
  end
end
