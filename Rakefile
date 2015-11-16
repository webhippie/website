require "bundler"
Bundler.setup(:default)

require "jekyll"
require "tmpdir"
require "fileutils"

task :default => :generate

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
    FileUtils.cp_r(
      Dir.glob(
        File.expand_path("../_site/*", __FILE__)
      ),
      tmp
    )

    Dir.chdir tmp

    system "ls -ali #{tmp}"

    system "git init"
    system "git add ."

    system "git commit -m 'Site updated at #{Time.now.utc}'"
    system "git remote add origin git@github.com:webhippie/webhippie.github.com.git"
    system "git push origin master --force"
  end
end
