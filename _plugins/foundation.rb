require "sprockets"

Gem::Specification.find_by_name("foundation").gem_dir.tap do |dir|
  Sprockets.append_path File.join(
    dir,
    "scss"
  )

  Sprockets.append_path File.join(
    dir,
    "js"
  )
end
