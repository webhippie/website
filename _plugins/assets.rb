require "jekyll-assets"

Gem::Specification.find_by_name("zurb-foundation").gem_dir.tap do |dir|
  Sprockets.append_path File.join(
    dir,
    "scss"
  )

  Sprockets.append_path File.join(
    dir,
    "js"
  )
end

Gem::Specification.find_by_name("bourbon").gem_dir.tap do |dir|
  Sprockets.append_path File.join(
    dir,
    "app",
    "assets",
    "stylesheets"
  )
end
